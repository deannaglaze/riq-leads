# Application Context

## Overview

RetainIQ's Morning Leads Checkpoint is a web application designed to help sales teams review and manage newly imported leads before automated email sequences are sent. The application provides a streamlined interface for excluding leads that shouldn't receive automated communications, with the ability to review and re-include excluded leads later.

## Purpose

The application serves as a quality control checkpoint in the lead management workflow, allowing users to:
- Review newly imported leads with key information at a glance
- Make informed decisions about which leads to exclude from automated sends
- Maintain a reversible exclusion process for lead management
- Track the countdown to the next automated send

## User Flow

1. **Morning Checkpoint** - User reviews newly imported leads
2. **Selection** - User selects leads to exclude (via checkboxes or card clicks)
3. **Confirmation** - User confirms exclusion in a modal dialog
4. **Post-Exclusion** - Success feedback is shown
5. **Excluded Leads Tab** - User can review and re-include excluded leads

## Key Features

### Lead Information Display
- **Intent Percentage**: Color-coded badges (green ≥80%, yellow ≥60%, orange <60%)
- **Vehicle**: Target vehicle of interest
- **Trade-in**: Trade-in vehicle (if applicable)
- **Received Time**: Relative time display (e.g., "2 hours ago")
- **Next Send Time**: Scheduled time for next automated message
- **Sequence Stage**: Current stage in the email sequence

### Interactions
- **Tab Toggle**: Switch between "Morning Checkpoint" and "Excluded Leads" tabs
- **Checkbox Selection**: Individual lead selection
- **Select All**: Bulk selection/deselection
- **Exclusion Confirmation**: Modal dialog before excluding
- **Re-inclusion**: Restore excluded leads back to active list
- **Dynamic Counts**: Real-time updates of selected items and list counts

### State Management
- **Morning Checkpoint State**: Default view showing active leads
- **Excluding State**: Confirmation dialog overlay
- **Post-Exclusion State**: Success message after exclusion
- **Excluded Leads State**: Separate tab view for excluded leads

## Technical Architecture

### State Management
- Custom hooks (`useLeadsState`, `useAppState`) manage application state
- React hooks (useState, useEffect, useCallback) for reactive updates
- Separation of concerns: leads state vs. UI state

### Component Structure
- **Pages**: Top-level state views (MorningCheckpoint, Excluding, PostExclusion, ExcludedLeads)
- **Components**: Reusable UI components (Header, Tabs, LeadCard, LeadList, etc.)
- **Hooks**: Custom hooks for state management and business logic
- **State**: Centralized state management modules
- **Types**: Type definitions and constants
- **Fixtures**: Sample data for development

### Data Flow
1. Initial data loaded from fixtures
2. User interactions trigger state updates via hooks
3. State changes propagate to components
4. Components re-render with updated data
5. UI reflects current application state

## Design Principles

- **Clarity**: Clean, scannable interface with clear visual hierarchy
- **Reversibility**: All exclusion actions can be undone
- **Feedback**: Clear confirmation states and success messages
- **Responsiveness**: Adapts to all screen sizes
- **Performance**: Optimized rendering with React best practices

## Future Considerations

- Integration with backend API for real lead data
- Real-time updates for new leads
- Bulk operations for large lead lists
- Advanced filtering and sorting
- Lead notes and tags
- Export functionality
- Analytics and reporting
