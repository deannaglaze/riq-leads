/**
 * Type definitions for the application
 */

export interface Lead {
  id: number;
  name: string;
  intentPercent: number;
  vehicle: string;
  tradeIn: string | null;
  receivedTime: string;
  nextSendTime: string;
  sequenceStage: string;
}

/**
 * Application state types
 */
export const APP_STATES = {
  MORNING: 'morning',
  EXCLUDING: 'excluding',
  POST_EXCLUSION: 'post_exclusion'
} as const;

export type AppState = typeof APP_STATES[keyof typeof APP_STATES];

export const TABS = {
  CHECKPOINT: 'checkpoint',
  EXCLUDED: 'excluded'
} as const;

export type Tab = typeof TABS[keyof typeof TABS];

/**
 * State management types
 */
export interface LeadsState {
  leads: Lead[];
  excludedLeads: Lead[];
  selectedLeads: Set<number>;
  selectedExcludedLeads: Set<number>;
  nextSendTime: string;
}

export type LeadsAction =
  | { type: 'TOGGLE_LEAD'; payload: number }
  | { type: 'TOGGLE_EXCLUDED_LEAD'; payload: number }
  | { type: 'SELECT_ALL_LEADS' }
  | { type: 'SELECT_ALL_EXCLUDED' }
  | { type: 'EXCLUDE_SELECTED' }
  | { type: 'REINCLUDE_SELECTED' }
  | { type: 'SET_LEADS'; payload: Lead[] }
  | { type: 'SET_EXCLUDED_LEADS'; payload: Lead[] }
  | { type: 'UPDATE_NEXT_SEND_TIME'; payload: string };

export interface AppStateContext {
  currentState: AppState;
  activeTab: Tab;
  exclusionCount: number;
}

