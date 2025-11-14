# RetainIQ - Morning Leads Checkpoint

A responsive React web application for RetainIQ's Morning Leads Checkpoint feature. Built with Vite, React, and Tailwind CSS.

## Features

- **Morning Checkpoint View**: Display newly imported leads with comprehensive lead information
- **Real-time Countdown Timer**: Dynamic countdown to the next automated send
- **Lead Exclusion**: Select and exclude leads with confirmation dialog
- **Excluded Leads Management**: View and re-include previously excluded leads
- **Rich Lead Data**: Display intent percentage, vehicle, trade-in status, sequence stage, and timing
- **Responsive Design**: Fully responsive layout for desktop, tablet, and mobile
- **State Management**: React hooks for managing leads, selections, and UI states

## Lead Data Fields

Each lead includes:
- **Name**: Lead contact name
- **Intent %**: Purchase intent percentage (color-coded: green ≥80%, yellow ≥60%, orange <60%)
- **Vehicle**: Target vehicle of interest
- **Trade-in**: Trade-in vehicle (if applicable)
- **Received Time**: When the lead was received
- **Next Send Time**: Scheduled time for next automated message
- **Sequence Stage**: Current stage in the sequence (Initial Contact, Follow-up 1/2/3)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
RIQ/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Header with countdown timer
│   │   ├── Tabs.jsx            # Tab navigation component
│   │   ├── LeadCard.jsx        # Individual lead card component
│   │   ├── LeadList.jsx        # List of leads with selection
│   │   ├── ConfirmationDialog.jsx  # Exclusion confirmation modal
│   │   └── SuccessMessage.jsx  # Post-exclusion success state
│   ├── data/
│   │   └── sampleLeads.js      # Sample lead data
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles with Tailwind
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── postcss.config.js           # PostCSS configuration
```

## Screen States

1. **Morning Checkpoint** (Default): Shows newly imported leads with selection and exclusion options
2. **Excluding Leads**: Confirmation dialog before excluding selected leads
3. **Post-Exclusion**: Success message after excluding leads
4. **Excluded Leads**: Tab view to review and re-include excluded leads

## Usage

1. **Review Leads**: View all newly imported leads in the Morning Checkpoint tab
2. **Select Leads**: Click on lead cards or use checkboxes to select leads for exclusion
3. **Exclude Leads**: Click "Exclude Selected" to confirm and exclude leads
4. **View Excluded**: Switch to the "Excluded Leads" tab to review excluded leads
5. **Re-include Leads**: Select excluded leads and click "Re-include Selected" to restore them

## Technologies

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript (ES6+)**: Modern JavaScript features

## Design Principles

- **Clarity**: Clean, scannable interface with clear visual hierarchy
- **Reversibility**: All actions can be undone (excluded leads can be re-included)
- **Feedback**: Clear confirmation states and success messages
- **Accessibility**: Keyboard navigation and semantic HTML
- **Responsive**: Adapts seamlessly to all screen sizes
- **Performance**: Optimized rendering with React

## Browser Support

Works in all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Adding More Leads

Edit `src/data/sampleLeads.js` to add or modify lead data. Each lead should follow this structure:

```javascript
{
  id: number,
  name: string,
  intentPercent: number,  // 0-100
  vehicle: string,
  tradeIn: string | null,
  receivedTime: string,   // ISO 8601 date string
  nextSendTime: string,   // ISO 8601 date string
  sequenceStage: string
}
```

### Styling

The app uses Tailwind CSS. Customize colors, spacing, and other design tokens in `tailwind.config.js`.

## License

MIT
