import { useState, useCallback } from 'react';
import { APP_STATES, TABS } from '../types';

/**
 * Custom hook for managing application UI state
 * Handles current view state and active tab
 */
export function useAppState() {
  const [currentState, setCurrentState] = useState(APP_STATES.MORNING);
  const [activeTab, setActiveTab] = useState(TABS.CHECKPOINT);
  const [exclusionCount, setExclusionCount] = useState(0);

  const showExcludingState = useCallback((count) => {
    setExclusionCount(count);
    setCurrentState(APP_STATES.EXCLUDING);
  }, []);

  const showPostExclusionState = useCallback((count) => {
    setExclusionCount(count);
    setCurrentState(APP_STATES.POST_EXCLUSION);
  }, []);

  const showMorningState = useCallback(() => {
    setCurrentState(APP_STATES.MORNING);
  }, []);

  const switchToExcludedTab = useCallback(() => {
    setActiveTab(TABS.EXCLUDED);
    setCurrentState(APP_STATES.MORNING);
  }, []);

  const switchToCheckpointTab = useCallback(() => {
    setActiveTab(TABS.CHECKPOINT);
    if (currentState === APP_STATES.POST_EXCLUSION) {
      setCurrentState(APP_STATES.MORNING);
    }
  }, [currentState]);

  const handleTabChange = useCallback((tab) => {
    if (tab === TABS.EXCLUDED) {
      setActiveTab(TABS.EXCLUDED);
    } else {
      switchToCheckpointTab();
    }
  }, [switchToCheckpointTab]);

  return {
    currentState,
    activeTab,
    exclusionCount,
    showExcludingState,
    showPostExclusionState,
    showMorningState,
    switchToExcludedTab,
    switchToCheckpointTab,
    handleTabChange
  };
}

