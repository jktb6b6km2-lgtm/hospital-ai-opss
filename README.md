# Hospital AI Operations Dashboard

An AI-powered hospital operations dashboard for comprehensive hospital management and coordination.

## Features

### 🏥 Core Functionality

1. **Discharge Coordination**
   - Schedule and manage patient discharges
   - Track discharge status (pending/completed)
   - Monitor discharge dates

2. **Admitted Patient Tracking**
   - Register and manage admitted patients
   - Track patient wards and admission dates
   - Maintain patient records

3. **Insurance Document Management**
   - Upload and organize insurance documents
   - Track policy information and providers
   - Monitor approval status

4. **Referrals Management**
   - Create and track patient referrals
   - Record referral reasons and destinations
   - Manage referral status

5. **Case Sheet Digitization**
   - Digitize and store case sheets
   - Record comprehensive case notes
   - Easy access to patient history

6. **Bed Availability**
   - Real-time bed occupancy tracking
   - Ward-wise bed availability
   - Occupancy percentage monitoring

7. **Dashboard Overview**
   - Real-time statistics
   - Quick metrics for:
     - Total admitted patients
     - Available beds
     - Pending discharges
     - Insurance claims status

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser LocalStorage
- **Architecture**: Client-side single-page application (SPA)

## Getting Started

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/jktb6b6km2-lgtm/hospital-ai-opss.git
   cd hospital-ai-opss
   ```

2. No installation required - this is a pure frontend application

### Running the Application

1. Open `index.html` in a modern web browser
2. Or use a local development server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   http-server
   ```

3. Navigate to `http://localhost:8000` in your browser

## Usage

### Dashboard Tab
- View overview statistics of the hospital operations
- Monitor key metrics at a glance

### Admitted Patients
- Add new patient records
- Input patient name, ID, and ward
- Automatic tracking of admission dates

### Discharge Coordination
- Schedule discharge for admitted patients
- Set discharge dates
- Track discharge completion status

### Insurance Documents
- Add insurance policy information
- Track document approval status
- Associate with patient records

### Referrals
- Create referrals for specialist consultations
- Record referral reasons
- Track referral information

### Case Sheets
- Record detailed case notes
- Store digitized patient information
- Easy access to medical history

### Bed Availability
- Update ward bed information
- Track total beds per ward
- Monitor current occupancy
- View availability percentages

## Data Management

- All data is stored locally in the browser using LocalStorage
- Data persists between sessions
- No external database or backend required
- Data can be exported by browser DevTools console access

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Any modern browser with ES6 support and LocalStorage API

## Features Roadmap

- [ ] Real-time synchronization with backend
- [ ] AI-powered predictions for bed availability
- [ ] Mobile app version
- [ ] Data export/import functionality
- [ ] User authentication and role-based access
- [ ] Advanced analytics and reporting
- [ ] Integration with hospital management systems
- [ ] Automated notifications

## Project Structure

```
hospital-ai-opss/
├── index.html          # Main HTML template
├── styles.css          # Styling and responsive design
├── app.js              # Application logic and state management
└── README.md           # Project documentation
```

## How It Works

1. **Tab Navigation**: Users navigate between different operational sections
2. **Data Entry**: Forms allow users to add and update hospital data
3. **Real-time Updates**: Dashboard reflects changes immediately
4. **Local Storage**: Data persists in browser storage
5. **Display Lists**: Each section displays relevant data in an organized list format

## Customization

### Styling
- Modify CSS variables in `styles.css` to change colors and themes
- Responsive design that works on all screen sizes

### Adding New Features
- Follow the existing pattern in `app.js`
- Add new data categories to the `hospitalsData` object
- Create corresponding display and management functions

## Contributing

Contributions are welcome! Please feel free to submit pull requests or create issues for bugs and feature requests.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue in the GitHub repository.

## Disclaimer

This dashboard is designed for demonstration purposes. For production use in healthcare settings, ensure compliance with HIPAA, GDPR, and other relevant healthcare data regulations.

---

**Built with ❤️ for better hospital operations**