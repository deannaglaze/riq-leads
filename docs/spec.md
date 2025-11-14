# Technical Specification

## Project Structure

```
/src
  /components       # Reusable UI components
    - Header.jsx
    - Tabs.jsx
    - LeadCard.tsx
    - LeadList.jsx
    - ConfirmationDialog.jsx
    - SuccessMessage.jsx
  
  /pages            # State view components
    - Checkpoint.tsx
    - Excluding.jsx
    - PostExclusion.jsx
    - ExcludedLeads.jsx
  
  /hooks            # Custom React hooks
    - useCheckpoint.ts
    - useAppState.js
  
  /types            # Type definitions
    - types.ts
  
  /fixtures         # Sample data
    - leads.json
  
  /state            # State management
    - reducer.ts
  
  App.jsx           # Main application component
  main.tsx          # Application entry point
  index.css         # Global styles

/docs
  Context.md        # Application context and overview
  spec.md           # This file
```

## Application States

### State Machine

The application follows a state machine pattern with the following states:

1. **MORNING** (Default)
   - Initial state showing the checkpoint view
   - User can view and select leads
   - Transitions to: EXCLUDING

2. **EXCLUDING**
   - Confirmation dialog overlay
   - User confirms or cancels exclusion
   - Transitions to: POST_EXCLUSION (on confirm) or MORNING (on cancel)

3. **POST_EXCLUSION**
   - Success message displayed
   - User can continue reviewing or view excluded leads
   - Transitions to: MORNING

4. **EXCLUDED_LEADS** (Tab View)
   - Separate tab showing excluded leads
   - User can re-include leads
   - Always accessible via tab navigation

### State Transitions

```
MORNING
  ├─ [Select leads + Click "Exclude"] → EXCLUDING
  └─ [Tab click] → EXCLUDED_LEADS (tab)

EXCLUDING
  ├─ [Confirm] → POST_EXCLUSION
  └─ [Cancel] → MORNING

POST_EXCLUSION
  ├─ [Continue Reviewing] → MORNING
  └─ [View Excluded Leads] → MORNING + EXCLUDED_LEADS (tab)

EXCLUDED_LEADS (tab)
  └─ [Tab click] → MORNING (tab)
```

## Acceptance Criteria

### Morning Checkpoint View
- ✅ Display all newly imported leads with complete information
- ✅ Show countdown timer to next automated send
- ✅ Allow individual lead selection via checkbox or card click
- ✅ Provide "Select All" / "Deselect All" functionality
- ✅ Display dynamic count of selected leads
- ✅ Enable "Exclude Selected" button only when leads are selected
- ✅ Show empty state when no leads are available

### Exclusion Flow
- ✅ Show confirmation dialog when "Exclude Selected" is clicked
- ✅ Display count of leads to be excluded in confirmation
- ✅ Allow cancellation of exclusion operation
- ✅ Move selected leads to excluded list on confirmation
- ✅ Show success message after exclusion
- ✅ Update countdown timer based on remaining leads

### Post-Exclusion State
- ✅ Display success message with count of excluded leads
- ✅ Provide "Continue Reviewing" action to return to checkpoint
- ✅ Provide "View Excluded Leads" action to navigate to excluded tab
- ✅ Automatically clear selection after exclusion

### Excluded Leads Tab
- ✅ Display all excluded leads with same information as active leads
- ✅ Allow selection of excluded leads for re-inclusion
- ✅ Provide "Re-include Selected" functionality
- ✅ Show empty state when no leads are excluded
- ✅ Update active leads list when leads are re-included
- ✅ Update countdown timer when leads are re-included

### Tab Navigation
- ✅ Switch between "Morning Checkpoint" and "Excluded Leads" tabs
- ✅ Display dynamic badge counts on each tab
- ✅ Maintain state when switching tabs
- ✅ Highlight active tab visually

### Lead Information Display
- ✅ Show lead name prominently
- ✅ Display intent percentage with color-coded badge
- ✅ Show vehicle information
- ✅ Display trade-in information (or "No trade-in" if null)
- ✅ Show relative received time (e.g., "2 hours ago")
- ✅ Display sequence stage with color coding
- ✅ Show next send time

### Responsive Design
- ✅ Adapt layout for mobile devices (< 768px)
- ✅ Adapt layout for tablets (768px - 1024px)
- ✅ Maintain usability on desktop (> 1024px)
- ✅ Ensure touch-friendly interactions on mobile

## Accessibility (a11y) Notes

### Keyboard Navigation
- ✅ All interactive elements are keyboard accessible
- ✅ Tab order follows visual flow
- ✅ Focus indicators are visible (focus:ring-2)
- ✅ Lead cards can be activated with Enter or Space key
- ✅ Modal dialogs trap focus
- ✅ Escape key closes modals

### Screen Reader Support
- ✅ Semantic HTML elements used (header, main, nav, button)
- ✅ ARIA labels on interactive elements
- ✅ ARIA live regions for dynamic content updates
- ✅ ARIA checked states for checkboxes
- ✅ Descriptive button labels
- ✅ Form labels associated with inputs

### Visual Accessibility
- ✅ Sufficient color contrast ratios (WCAG AA minimum)
- ✅ Color is not the only means of conveying information
- ✅ Focus indicators are clearly visible
- ✅ Text is resizable up to 200% without loss of functionality
- ✅ Interactive elements have adequate touch targets (44x44px minimum)

### ARIA Attributes
- ✅ `aria-label` on buttons for context
- ✅ `aria-live="polite"` for selection count updates
- ✅ `aria-atomic="true"` for atomic updates
- ✅ `aria-checked` on lead cards (role="checkbox")
- ✅ `aria-disabled` on disabled buttons
- ✅ `aria-hidden="true"` on decorative emoji icons

### Semantic HTML
- ✅ Use of `<header>` for page header
- ✅ Use of `<main>` for main content
- ✅ Use of `<nav>` for tab navigation
- ✅ Use of `<button>` for all interactive actions
- ✅ Use of proper heading hierarchy (h1, h2, h3)
- ✅ Use of `<ul>`/`<li>` for lists where appropriate

### Error Handling
- ✅ Disabled states are clearly communicated
- ✅ Empty states provide helpful messaging
- ✅ Confirmation dialogs prevent accidental actions
- ✅ Success messages confirm completed actions

## Component Specifications

### Pages

#### Checkpoint
**Purpose**: Display newly imported leads with selection and exclusion capabilities

**Props**:
- `leads`: Lead[]
- `selectedLeads`: Set<number>
- `onToggleLead`: (leadId: number) => void
- `onSelectAll`: () => void
- `onExcludeClick`: () => void

**State**: None (presentational component)

#### Excluding
**Purpose**: Confirmation dialog for excluding leads

**Props**:
- `exclusionCount`: number
- `onConfirm`: () => void
- `onCancel`: () => void

**State**: None (presentational component)

#### PostExclusion
**Purpose**: Success message after excluding leads

**Props**:
- `exclusionCount`: number
- `onContinue`: () => void
- `onViewExcluded`: () => void

**State**: None (presentational component)

#### ExcludedLeads
**Purpose**: Display excluded leads with re-include capabilities

**Props**:
- `excludedLeads`: Lead[]
- `selectedExcludedLeads`: Set<number>
- `onToggleExcludedLead`: (leadId: number) => void
- `onSelectAllExcluded`: () => void
- `onReinclude`: () => void

**State**: None (presentational component)

### State Management

#### useCheckpoint Hook
**Purpose**: Manage leads data and selections using reducer pattern

**Returns**:
- `leads`: Lead[]
- `excludedLeads`: Lead[]
- `selectedLeads`: Set<number>
- `selectedExcludedLeads`: Set<number>
- `nextSendTime`: string
- `toggleLead(leadId)`: void
- `toggleExcludedLead(leadId)`: void
- `selectAllLeads()`: void
- `selectAllExcluded()`: void
- `excludeSelectedLeads()`: number
- `reincludeSelectedLeads()`: void

#### leadsReducer
**Purpose**: Pure reducer function for leads state management

**Actions**:
- `TOGGLE_LEAD`: Toggle selection of a lead
- `TOGGLE_EXCLUDED_LEAD`: Toggle selection of an excluded lead
- `SELECT_ALL_LEADS`: Select/deselect all active leads
- `SELECT_ALL_EXCLUDED`: Select/deselect all excluded leads
- `EXCLUDE_SELECTED`: Move selected leads to excluded list
- `REINCLUDE_SELECTED`: Move selected excluded leads back to active list
- `SET_LEADS`: Set the active leads array
- `SET_EXCLUDED_LEADS`: Set the excluded leads array
- `UPDATE_NEXT_SEND_TIME`: Update the next send time

### Data Models

#### Lead Interface
```typescript
interface Lead {
  id: number;
  name: string;
  intentPercent: number;
  vehicle: string;
  tradeIn: string | null;
  receivedTime: string;
  nextSendTime: string;
  sequenceStage: string;
}
```

### Constants

#### APP_STATES
- `MORNING`: 'morning'
- `EXCLUDING`: 'excluding'
- `POST_EXCLUSION`: 'post_exclusion'

#### TABS
- `CHECKPOINT`: 'checkpoint'
- `EXCLUDED`: 'excluded'

## Interactions

### Tab Toggle
- Clicking a tab updates `activeTab` state
- Tab badges show dynamic counts
- Active tab is visually highlighted
- Keyboard accessible (Tab + Enter/Space)

### Checkbox Selection
- Individual checkboxes toggle lead selection
- Clicking lead card also toggles selection
- Selection count updates dynamically
- "Exclude Selected" button enabled/disabled based on selection
- Keyboard accessible (Enter/Space on card)

### Exclusion Flow
1. User selects leads
2. Clicks "Exclude Selected"
3. `Excluding` page shown with confirmation dialog
4. User confirms or cancels
5. On confirm: leads moved to excluded list, `PostExclusion` page shown
6. User can continue reviewing or view excluded leads

### Re-inclusion Flow
1. User navigates to "Excluded Leads" tab
2. Selects leads to re-include
3. Clicks "Re-include Selected"
4. Leads moved back to active list
5. Selection cleared

## Styling

- **Framework**: Tailwind CSS
- **Responsive**: Mobile-first approach
- **Color Scheme**: 
  - Primary: Blue (#2563eb)
  - Danger: Red (#dc2626)
  - Success: Green (#16a34a)
  - Intent colors: Green (≥80%), Yellow (≥60%), Orange (<60%)

## Performance Considerations

- React hooks with `useCallback` for memoized functions
- Efficient state updates with Set data structures
- Reducer pattern for predictable state updates
- Component-level state management to minimize re-renders
- Conditional rendering based on state

## Testing Considerations

- Unit tests for reducer (state management logic)
- Unit tests for hooks
- Component tests for pages and components
- Integration tests for user flows
- Accessibility tests (keyboard navigation, screen readers)
- Snapshot tests for UI consistency

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Build & Deployment

- **Build Tool**: Vite
- **Development**: `npm run dev`
- **Production Build**: `npm run build`
- **Preview**: `npm run preview`
