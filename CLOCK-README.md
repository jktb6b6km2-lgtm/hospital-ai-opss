# Multi-Timezone Digital Clock

A beautiful, responsive digital clock application that displays the current time across multiple time zones around the world.

## Features

### ⏰ Core Functionality

1. **Real-time Clock Display**
   - Digital time display in HH:MM:SS format
   - Updates every second
   - Displays current date

2. **Multiple Timezone Support**
   - View time in 40+ major world timezones
   - Easy add/remove timezone functionality
   - Persistent timezone selection (saved to browser)

3. **Timezone Information**
   - UTC offset display
   - Time period indicators (Morning/Afternoon/Evening/Night)
   - Formatted date display
   - Timezone name and abbreviation

4. **UTC Reference**
   - Dedicated UTC time display
   - Current UTC date and timestamp
   - Always visible for reference

5. **Visual Enhancements**
   - Color-coded timezone cards (4 accent colors rotate)
   - Smooth animations and transitions
   - Glowing digital display effect
   - Responsive grid layout
   - Dark theme optimized for viewing

## Supported Timezones

- UTC (Coordinated Universal Time)
- Europe: London, Paris, Berlin, Moscow, Athens, Istanbul
- Americas: New York, Los Angeles, Toronto, Mexico City, Denver, Chicago, Santiago, Buenos Aires
- Asia: Tokyo, Hong Kong, Singapore, Dubai, India, Bangkok, Seoul, Manila, Kuala Lumpur, Jakarta, Ho Chi Minh
- Africa: Cairo, Lagos, Johannesburg
- Pacific: Sydney, Auckland, Fiji, Honolulu
- And many more!

## How to Use

### Adding a Timezone
1. Open `clock.html` in your browser
2. Select a timezone from the dropdown menu
3. Click the "Add" button
4. The timezone clock will appear in the grid

### Removing a Timezone
1. Click the "Remove Timezone" button on any clock card
2. The timezone will be removed from the display

### Resetting to Default
1. Click the "Reset to Default" button
2. The display will revert to the default timezones:
   - UTC
   - America/New_York (New York)
   - Europe/London (London)
   - Asia/Tokyo (Tokyo)

### Understanding the Display

Each clock card shows:
- **Timezone Name**: The name of the timezone (e.g., "London (GMT/BST)")
- **Digital Time**: Current time in HH:MM:SS format
- **Date**: Current date in the timezone (e.g., "Thu May 22 2026")
- **UTC Offset**: The offset from UTC (e.g., "UTC +1")
- **Time Period**: Visual indicator of time of day with emoji
  - 🌅 Morning (5:00 - 11:59)
  - ☀️ Afternoon (12:00 - 16:59)
  - 🌆 Evening (17:00 - 20:59)
  - 🌙 Night (21:00 - 4:59)

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Real-time clock logic and timezone handling
- **Intl API**: Native browser timezone support
- **LocalStorage**: Persistent user preferences

### Key Features
- Uses native JavaScript `Intl.DateTimeFormat` for accurate timezone conversion
- No external libraries required
- Client-side only (no server dependencies)
- Automatic DST (Daylight Saving Time) adjustment
- Data persists across browser sessions

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Any modern browser with:
  - ES6 support
  - Intl API support
  - LocalStorage support

## Installation

1. Download or clone the files:
   - `clock.html`
   - `clock-styles.css`
   - `clock-app.js`

2. Open `clock.html` in your web browser

No server or installation required - it's a pure frontend application!

## File Structure

```
clock/
├── clock.html          # Main HTML template
├── clock-styles.css    # Styling and animations
├── clock-app.js        # Application logic
└── CLOCK-README.md     # This documentation
```

## Data Storage

- Selected timezones are saved in browser LocalStorage
- Survives page refresh and browser restart
- Clear browser data to reset to defaults

## Performance

- Lightweight and fast
- Minimal CPU usage
- Updates only visible elements
- No unnecessary re-renders

## Customization

### Add More Timezones
Edit the `timezones` array in `clock-app.js`:
```javascript
const timezones = [
    { name: 'Your City Name', zone: 'Continent/City' },
    // ...
];
```

### Change Colors
Modify CSS variables in `clock-styles.css`:
```css
:root {
    --accent-1: #06b6d4;  /* Cyan */
    --accent-2: #ec4899;  /* Pink */
    --accent-3: #8b5cf6;  /* Purple */
    --accent-4: #f59e0b;  /* Amber */
}
```

### Adjust Update Frequency
Change the interval in `clock-app.js`:
```javascript
setInterval(updateAllClocks, 1000);  // 1000ms = 1 second
```

## Use Cases

- **Global Teams**: Track time across office locations
- **Trading**: Monitor market hours in different zones
- **Travel Planning**: Check times before scheduling calls
- **World Events**: Follow live events across timezones
- **Educational**: Learn about world timezones
- **Scheduling**: Coordinate meetings across regions

## Future Enhancements

- [ ] 12-hour time format option
- [ ] Timezone search functionality
- [ ] Custom timezone aliases
- [ ] Sound notifications for specific times
- [ ] Scheduled meeting planner
- [ ] Dark/Light theme toggle
- [ ] Export timezone schedule
- [ ] Alarm functionality

## License

Open source and available for personal and commercial use.

## Support

For issues or suggestions, please create an issue in the repository.

---

**Built with ⏰ for global coordination**