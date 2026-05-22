// Data storage
let hospitalsData = {
    patients: [],
    discharges: [],
    insurance: [],
    referrals: [],
    caseSheets: [],
    beds: []
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    setupTabNavigation();
    loadDataFromStorage();
    updateDashboard();
});

// Tab Navigation
function setupTabNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to current
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

// Dashboard Update
function updateDashboard() {
    document.getElementById('totalPatients').textContent = hospitalsData.patients.length;
    
    const totalBeds = hospitalsData.beds.reduce((sum, ward) => sum + ward.total, 0);
    const occupiedBeds = hospitalsData.beds.reduce((sum, ward) => sum + ward.occupied, 0);
    const available = totalBeds - occupiedBeds;
    document.getElementById('bedsAvailable').textContent = available >= 0 ? available : 0;
    
    document.getElementById('pendingDischarges').textContent = hospitalsData.discharges.filter(d => d.status !== 'completed').length;
    document.getElementById('insuranceClaims').textContent = hospitalsData.insurance.filter(i => i.status !== 'approved').length;
}

// Patient Management
function addPatient() {
    const name = document.getElementById('patientName').value.trim();
    const id = document.getElementById('patientId').value.trim();
    const ward = document.getElementById('patientWard').value.trim();

    if (!name || !id || !ward) {
        alert('Please fill all patient fields');
        return;
    }

    const patient = {
        id: generateId(),
        name,
        patientId: id,
        ward,
        admittedDate: new Date().toLocaleDateString()
    };

    hospitalsData.patients.push(patient);
    saveDataToStorage();
    displayPatients();
    updateDashboard();
    clearPatientForm();
}

function displayPatients() {
    const container = document.getElementById('patientsList');
    
    if (hospitalsData.patients.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No admitted patients</p></div>';
        return;
    }

    container.innerHTML = hospitalsData.patients.map(patient => `
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${patient.name}</div>
                <div class="list-item-details">ID: ${patient.patientId} | Ward: ${patient.ward} | Admitted: ${patient.admittedDate}</div>
            </div>
            <div class="list-item-actions">
                <button class="btn-small btn-delete" onclick="deletePatient('${patient.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function deletePatient(id) {
    hospitalsData.patients = hospitalsData.patients.filter(p => p.id !== id);
    saveDataToStorage();
    displayPatients();
    updateDashboard();
}

function clearPatientForm() {
    document.getElementById('patientName').value = '';
    document.getElementById('patientId').value = '';
    document.getElementById('patientWard').value = '';
}

// Discharge Coordination
function addDischarge() {
    const patientId = document.getElementById('dischargePatientId').value.trim();
    const date = document.getElementById('dischargeDate').value;

    if (!patientId || !date) {
        alert('Please fill all discharge fields');
        return;
    }

    const patient = hospitalsData.patients.find(p => p.patientId === patientId);
    if (!patient) {
        alert('Patient not found');
        return;
    }

    const discharge = {
        id: generateId(),
        patientId,
        patientName: patient.name,
        scheduledDate: date,
        status: 'pending',
        createdDate: new Date().toLocaleDateString()
    };

    hospitalsData.discharges.push(discharge);
    saveDataToStorage();
    displayDischarges();
    updateDashboard();
    document.getElementById('dischargePatientId').value = '';
    document.getElementById('dischargeDate').value = '';
}

function displayDischarges() {
    const container = document.getElementById('dischargeList');
    
    if (hospitalsData.discharges.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No discharge records</p></div>';
        return;
    }

    container.innerHTML = hospitalsData.discharges.map(discharge => `
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${discharge.patientName}</div>
                <div class="list-item-details">Patient ID: ${discharge.patientId} | Scheduled: ${discharge.scheduledDate} | Status: ${discharge.status}</div>
            </div>
            <div class="list-item-actions">
                <button class="btn-small btn-edit" onclick="updateDischargeStatus('${discharge.id}')">Mark Complete</button>
                <button class="btn-small btn-delete" onclick="deleteDischarge('${discharge.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function updateDischargeStatus(id) {
    const discharge = hospitalsData.discharges.find(d => d.id === id);
    if (discharge) {
        discharge.status = discharge.status === 'pending' ? 'completed' : 'pending';
        saveDataToStorage();
        displayDischarges();
        updateDashboard();
    }
}

function deleteDischarge(id) {
    hospitalsData.discharges = hospitalsData.discharges.filter(d => d.id !== id);
    saveDataToStorage();
    displayDischarges();
    updateDashboard();
}

// Insurance Document Management
function addInsuranceDoc() {
    const patientId = document.getElementById('insurancePatientId').value.trim();
    const policyNumber = document.getElementById('policyNumber').value.trim();
    const provider = document.getElementById('insuranceProvider').value.trim();

    if (!patientId || !policyNumber || !provider) {
        alert('Please fill all insurance fields');
        return;
    }

    const insuranceDoc = {
        id: generateId(),
        patientId,
        policyNumber,
        provider,
        status: 'pending',
        uploadDate: new Date().toLocaleDateString()
    };

    hospitalsData.insurance.push(insuranceDoc);
    saveDataToStorage();
    displayInsuranceDocs();
    updateDashboard();
    document.getElementById('insurancePatientId').value = '';
    document.getElementById('policyNumber').value = '';
    document.getElementById('insuranceProvider').value = '';
}

function displayInsuranceDocs() {
    const container = document.getElementById('insuranceList');
    
    if (hospitalsData.insurance.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No insurance documents</p></div>';
        return;
    }

    container.innerHTML = hospitalsData.insurance.map(doc => `
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${doc.provider}</div>
                <div class="list-item-details">Patient ID: ${doc.patientId} | Policy: ${doc.policyNumber} | Status: ${doc.status}</div>
            </div>
            <div class="list-item-actions">
                <button class="btn-small btn-edit" onclick="approveInsurance('${doc.id}')">Approve</button>
                <button class="btn-small btn-delete" onclick="deleteInsurance('${doc.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function approveInsurance(id) {
    const doc = hospitalsData.insurance.find(i => i.id === id);
    if (doc) {
        doc.status = 'approved';
        saveDataToStorage();
        displayInsuranceDocs();
        updateDashboard();
    }
}

function deleteInsurance(id) {
    hospitalsData.insurance = hospitalsData.insurance.filter(i => i.id !== id);
    saveDataToStorage();
    displayInsuranceDocs();
    updateDashboard();
}

// Referrals Management
function addReferral() {
    const patientId = document.getElementById('referralPatientId').value.trim();
    const referredTo = document.getElementById('referredTo').value.trim();
    const reason = document.getElementById('referralReason').value.trim();

    if (!patientId || !referredTo || !reason) {
        alert('Please fill all referral fields');
        return;
    }

    const referral = {
        id: generateId(),
        patientId,
        referredTo,
        reason,
        status: 'pending',
        createdDate: new Date().toLocaleDateString()
    };

    hospitalsData.referrals.push(referral);
    saveDataToStorage();
    displayReferrals();
    document.getElementById('referralPatientId').value = '';
    document.getElementById('referredTo').value = '';
    document.getElementById('referralReason').value = '';
}

function displayReferrals() {
    const container = document.getElementById('referralsList');
    
    if (hospitalsData.referrals.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No referrals</p></div>';
        return;
    }

    container.innerHTML = hospitalsData.referrals.map(referral => `
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">Referred to: ${referral.referredTo}</div>
                <div class="list-item-details">Patient ID: ${referral.patientId} | Reason: ${referral.reason} | Status: ${referral.status}</div>
            </div>
            <div class="list-item-actions">
                <button class="btn-small btn-delete" onclick="deleteReferral('${referral.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteReferral(id) {
    hospitalsData.referrals = hospitalsData.referrals.filter(r => r.id !== id);
    saveDataToStorage();
    displayReferrals();
}

// Case Sheet Management
function addCaseSheet() {
    const patientId = document.getElementById('casePatientId').value.trim();
    const notes = document.getElementById('caseNotes').value.trim();

    if (!patientId || !notes) {
        alert('Please fill all case sheet fields');
        return;
    }

    const caseSheet = {
        id: generateId(),
        patientId,
        notes,
        createdDate: new Date().toLocaleDateString()
    };

    hospitalsData.caseSheets.push(caseSheet);
    saveDataToStorage();
    displayCaseSheets();
    document.getElementById('casePatientId').value = '';
    document.getElementById('caseNotes').value = '';
}

function displayCaseSheets() {
    const container = document.getElementById('casesheetsList');
    
    if (hospitalsData.caseSheets.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No case sheets</p></div>';
        return;
    }

    container.innerHTML = hospitalsData.caseSheets.map(sheet => `
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">Patient ID: ${sheet.patientId}</div>
                <div class="list-item-details">Notes: ${sheet.notes.substring(0, 100)}... | Created: ${sheet.createdDate}</div>
            </div>
            <div class="list-item-actions">
                <button class="btn-small btn-delete" onclick="deleteCaseSheet('${sheet.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteCaseSheet(id) {
    hospitalsData.caseSheets = hospitalsData.caseSheets.filter(c => c.id !== id);
    saveDataToStorage();
    displayCaseSheets();
}

// Bed Availability Management
function addBedInfo() {
    const wardName = document.getElementById('wardName').value.trim();
    const totalBeds = parseInt(document.getElementById('totalBeds').value);
    const occupiedBeds = parseInt(document.getElementById('occupiedBeds').value);

    if (!wardName || !totalBeds || occupiedBeds === undefined) {
        alert('Please fill all bed information fields');
        return;
    }

    if (occupiedBeds > totalBeds) {
        alert('Occupied beds cannot exceed total beds');
        return;
    }

    const existingWard = hospitalsData.beds.find(b => b.wardName === wardName);
    if (existingWard) {
        existingWard.total = totalBeds;
        existingWard.occupied = occupiedBeds;
    } else {
        const bedInfo = {
            id: generateId(),
            wardName,
            total: totalBeds,
            occupied: occupiedBeds,
            updatedDate: new Date().toLocaleDateString()
        };
        hospitalsData.beds.push(bedInfo);
    }

    saveDataToStorage();
    displayBeds();
    updateDashboard();
    document.getElementById('wardName').value = '';
    document.getElementById('totalBeds').value = '';
    document.getElementById('occupiedBeds').value = '';
}

function displayBeds() {
    const container = document.getElementById('bedsList');
    
    if (hospitalsData.beds.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No bed information</p></div>';
        return;
    }

    container.innerHTML = hospitalsData.beds.map(bed => {
        const available = bed.total - bed.occupied;
        const occupancyPercent = Math.round((bed.occupied / bed.total) * 100);
        return `
            <div class="list-item">
                <div class="list-item-content">
                    <div class="list-item-title">${bed.wardName}</div>
                    <div class="list-item-details">Total: ${bed.total} | Occupied: ${bed.occupied} | Available: ${available} | Occupancy: ${occupancyPercent}%</div>
                </div>
                <div class="list-item-actions">
                    <button class="btn-small btn-delete" onclick="deleteBed('${bed.id}')">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

function deleteBed(id) {
    hospitalsData.beds = hospitalsData.beds.filter(b => b.id !== id);
    saveDataToStorage();
    displayBeds();
    updateDashboard();
}

// Data Persistence
function saveDataToStorage() {
    localStorage.setItem('hospitalAIOpsData', JSON.stringify(hospitalsData));
}

function loadDataFromStorage() {
    const stored = localStorage.getItem('hospitalAIOpsData');
    if (stored) {
        hospitalsData = JSON.parse(stored);
        displayPatients();
        displayDischarges();
        displayInsuranceDocs();
        displayReferrals();
        displayCaseSheets();
        displayBeds();
    }
}

// Utility function
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}