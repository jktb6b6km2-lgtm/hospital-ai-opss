// Comprehensive timezone list
const timezones = [
    { name: 'UTC', zone: 'UTC' },
    { name: 'London (GMT/BST)', zone: 'Europe/London' },
    { name: 'New York (EST/EDT)', zone: 'America/New_York' },
    { name: 'Los Angeles (PST/PDT)', zone: 'America/Los_Angeles' },
    { name: 'Tokyo (JST)', zone: 'Asia/Tokyo' },
    { name: 'Sydney (AEDT/AEST)', zone: 'Australia/Sydney' },
    { name: 'Hong Kong (HKT)', zone: 'Asia/Hong_Kong' },
    { name: 'Singapore (SGT)', zone: 'Asia/Singapore' },
    { name: 'Dubai (GST)', zone: 'Asia/Dubai' },
    { name: 'India (IST)', zone: 'Asia/Kolkata' },
    { name: 'Bangkok (ICT)', zone: 'Asia/Bangkok' },
    { name: 'Bangkok (ICT)', zone: 'Asia/Bangkok' },
    { name: 'Moscow (MSK)', zone: 'Europe/Moscow' },
    { name: 'Paris (CET/CEST)', zone: 'Europe/Paris' },
    { name: 'Berlin (CET/CEST)', zone: 'Europe/Berlin' },
    { name: 'Toronto (EST/EDT)', zone: 'America/Toronto' },
    { name: 'Mexico City (CST/CDT)', zone: 'America/Mexico_City' },
    { name: 'São Paulo (BRT)', zone: 'America/Sao_Paulo' },
    { name: 'Buenos Aires (ART)', zone: 'America/Argentina/Buenos_Aires' },
    { name: 'Cairo (EET)', zone: 'Africa/Cairo' },
    { name: 'Johannesburg (SAST)', zone: 'Africa/Johannesburg' },
    { name: 'Lagos (WAT)', zone: 'Africa/Lagos' },
    { name: 'Istanbul (EET)', zone: 'Europe/Istanbul' },
    { name: 'Bangkok (ICT)', zone: 'Asia/Bangkok' },
    { name: 'Manila (PST)', zone: 'Asia/Manila' },
    { name: 'Seoul (KST)', zone: 'Asia/Seoul' },
    { name: 'Bangkok (ICT)', zone: 'Asia/Bangkok' },
    { name: 'Santiago (CLT)', zone: 'America/Santiago' },
    { name: 'Auckland (NZDT/NZST)', zone: 'Pacific/Auckland' },
    { name: 'Fiji (FJT)', zone: 'Pacific/Fiji' },
    { name: 'Honolulu (HST)', zone: 'Pacific/Honolulu' },
    { name: 'Anchorage (AKDT/AKST)', zone: 'America/Anchorage' },
    { name: 'Denver (MDT/MST)', zone: 'America/Denver' },
    { name: 'Chicago (CDT/CST)', zone: 'America/Chicago' },
    { name: 'Bangkok (ICT)', zone: 'Asia/Bangkok' },
    { name: 'Kuala Lumpur (MYT)', zone: 'Asia/Kuala_Lumpur' },
    { name: 'Jakarta (WIB)', zone: 'Asia/Jakarta' },
    { name: 'Bangkok (ICT)', zone: 'Asia/Bangkok' },
    { name: 'Vietnam (ICT)', zone: 'Asia/Ho_Chi_Minh' },
    { name: 'Bangkok (ICT)', zone: 'Asia/Bangkok' },
    { name: 'Istanbul (EET)', zone: 'Europe/Istanbul' },
    { name: 'Athens (EET)', zone: 'Europe/Athens' },
    { name: 'Bangkok (ICT)', zone: 'Asia/Bangkok' },
    { name: 'Bangkok (ICT)', zone: 'Asia/Bangkok' },
].reduce((unique, tz) => {
    if (!unique.find(item => item.zone === tz.zone)) {
        unique.push(tz);
    }
    return unique;
}, []);

// Sort timezones alphabetically
timezones.sort((a, b) => a.name.localeCompare(b.name));

// Default timezones to display
const defaultTimezones = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];

// State management
let displayedTimezones = JSON.parse(localStorage.getItem('displayedTimezones')) || defaultTimezones;
const accentColors = ['accent-1', 'accent-2', 'accent-3', 'accent-4'];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    populateTimezoneSelect();
    renderClocks();
    updateAllClocks();
    setInterval(updateAllClocks, 1000);
});

// Populate timezone select dropdown
function populateTimezoneSelect() {
    const select = document.getElementById('timezoneSelect');
    timezones.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz.zone;
        option.textContent = tz.name;
        select.appendChild(option);
    });
}

// Add timezone
function addTimezone() {
    const select = document.getElementById('timezoneSelect');
    const zone = select.value;

    if (!zone) {
        alert('Please select a timezone');
        return;
    }

    if (displayedTimezones.includes(zone)) {
        alert('This timezone is already displayed');
        return;
    }

    displayedTimezones.push(zone);
    saveTimezones();
    renderClocks();
    updateAllClocks();
    select.value = '';
}

// Remove timezone
function removeTimezone(zone) {
    displayedTimezones = displayedTimezones.filter(z => z !== zone);
    saveTimezones();
    renderClocks();
}

// Save to localStorage
function saveTimezones() {
    localStorage.setItem('displayedTimezones', JSON.stringify(displayedTimezones));
}

// Reset to default
function resetToDefault() {
    displayedTimezones = [...defaultTimezones];
    saveTimezones();
    renderClocks();
    updateAllClocks();
}

// Render clock cards
function renderClocks() {
    const grid = document.getElementById('clocksGrid');
    grid.innerHTML = '';

    displayedTimezones.forEach((zone, index) => {
        const tzData = timezones.find(tz => tz.zone === zone);
        const accentClass = accentColors[index % accentColors.length];
        
        const card = document.createElement('div');
        card.className = `clock-card ${accentClass}`;
        card.innerHTML = `
            <div class="timezone-name">${tzData ? tzData.name : zone}</div>
            <div class="digital-display" data-zone="${zone}">--:--:--</div>
            <div class="date-display" data-date="${zone}">-- --- ----</div>
            <div class="timezone-offset" data-offset="${zone}">UTC ±--</div>
            <div class="day-period" data-period="${zone}">--</div>
            <button class="remove-btn" onclick="removeTimezone('${zone}')">Remove Timezone</button>
        `;
        grid.appendChild(card);
    });
}

// Update all clocks
function updateAllClocks() {
    const now = new Date();
    
    // Update UTC time
    updateUTCDisplay(now);
    
    // Update each timezone
    displayedTimezones.forEach(zone => {
        updateClock(zone, now);
    });
}

// Update UTC display
function updateUTCDisplay(now) {
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    
    document.getElementById('utcTime').textContent = `${hours}:${minutes}:${seconds} UTC`;
    
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'UTC'
    };
    const dateStr = now.toLocaleDateString('en-US', options);
    document.getElementById('timestamp').textContent = `${dateStr}`;
}

// Update individual clock
function updateClock(zone, baseTime) {
    try {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: zone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
        
        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: zone,
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).formatToParts(baseTime);
        
        // Get time components
        let hours = '', minutes = '', seconds = '', period = '';
        parts.forEach(part => {
            if (part.type === 'hour') hours = part.value;
            if (part.type === 'minute') minutes = part.value;
            if (part.type === 'second') seconds = part.value;
            if (part.type === 'dayPeriod') period = part.value;
        });
        
        // Convert to 24-hour format if needed
        const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        // Get date
        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: zone,
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
        const dateString = dateFormatter.format(baseTime);
        
        // Update display
        const timeElement = document.querySelector(`[data-zone="${zone}"]`);
        if (timeElement) {
            timeElement.textContent = timeString;
            timeElement.parentElement.classList.add('updating');
            setTimeout(() => {
                timeElement.parentElement.classList.remove('updating');
            }, 100);
        }
        
        const dateElement = document.querySelector(`[data-date="${zone}"]`);
        if (dateElement) {
            dateElement.textContent = dateString;
        }
        
        // Calculate offset
        const utcDate = new Date(baseTime.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzDate = new Date(baseTime.toLocaleString('en-US', { timeZone: zone }));
        const offsetMs = tzDate - utcDate;
        const offsetHours = Math.floor(offsetMs / (1000 * 60 * 60));
        const offsetMinutes = Math.abs((offsetMs / (1000 * 60)) % 60);
        const offsetSign = offsetHours >= 0 ? '+' : '-';
        const offsetString = offsetMinutes === 0 
            ? `UTC ${offsetSign}${Math.abs(offsetHours)}`
            : `UTC ${offsetSign}${Math.abs(offsetHours)}:${String(offsetMinutes).padStart(2, '0')}`;
        
        const offsetElement = document.querySelector(`[data-offset="${zone}"]`);
        if (offsetElement) {
            offsetElement.textContent = offsetString;
        }
        
        // Update period
        const periodElement = document.querySelector(`[data-period="${zone}"]`);
        if (periodElement) {
            const hour24 = parseInt(hours);
            let timeOfDay = '';
            if (hour24 >= 5 && hour24 < 12) timeOfDay = '🌅 Morning';
            else if (hour24 >= 12 && hour24 < 17) timeOfDay = '☀️ Afternoon';
            else if (hour24 >= 17 && hour24 < 21) timeOfDay = '🌆 Evening';
            else timeOfDay = '🌙 Night';
            periodElement.textContent = timeOfDay;
        }
    } catch (e) {
        console.error(`Error updating timezone ${zone}:`, e);
    }
}