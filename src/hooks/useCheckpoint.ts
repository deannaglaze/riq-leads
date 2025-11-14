import { useReducer, useEffect, useCallback } from 'react';
import { leadsReducer } from '../state/reducer';
import { Lead, LeadsState } from '../types';
import initialLeadsData from '../fixtures/leads.json';

/**
 * Custom hook for managing checkpoint state
 * Handles leads, selections, and exclusion operations
 */
export function useCheckpoint() {
  const initialState: LeadsState = {
    leads: initialLeadsData as Lead[],
    excludedLeads: [],
    selectedLeads: new Set<number>(),
    selectedExcludedLeads: new Set<number>(),
    nextSendTime: initialLeadsData.length > 0
      ? (() => {
          const firstLead = initialLeadsData[0] as Lead;
          return initialLeadsData.reduce((earliest: Date, lead: Lead) => {
            const leadTime = new Date(lead.nextSendTime);
            return leadTime < earliest ? leadTime : earliest;
          }, new Date(firstLead.nextSendTime)).toISOString();
        })()
      : new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
  };

  const [state, dispatch] = useReducer(leadsReducer, initialState);

  // Update next send time when leads change
  useEffect(() => {
    if (state.leads.length > 0) {
      const earliest = state.leads.reduce((earliest, lead) => {
        const leadTime = new Date(lead.nextSendTime);
        return leadTime < earliest ? leadTime : earliest;
      }, new Date(state.leads[0].nextSendTime));
      
      dispatch({
        type: 'UPDATE_NEXT_SEND_TIME',
        payload: earliest.toISOString()
      });
    }
  }, [state.leads]);

  const toggleLead = useCallback((leadId: number) => {
    dispatch({ type: 'TOGGLE_LEAD', payload: leadId });
  }, []);

  const toggleExcludedLead = useCallback((leadId: number) => {
    dispatch({ type: 'TOGGLE_EXCLUDED_LEAD', payload: leadId });
  }, []);

  const selectAllLeads = useCallback(() => {
    dispatch({ type: 'SELECT_ALL_LEADS' });
  }, []);

  const selectAllExcluded = useCallback(() => {
    dispatch({ type: 'SELECT_ALL_EXCLUDED' });
  }, []);

  const excludeSelectedLeads = useCallback(() => {
    dispatch({ type: 'EXCLUDE_SELECTED' });
    return state.selectedLeads.size;
  }, [state.selectedLeads.size]);

  const reincludeSelectedLeads = useCallback(() => {
    dispatch({ type: 'REINCLUDE_SELECTED' });
  }, []);

  return {
    leads: state.leads,
    excludedLeads: state.excludedLeads,
    selectedLeads: state.selectedLeads,
    selectedExcludedLeads: state.selectedExcludedLeads,
    nextSendTime: state.nextSendTime,
    toggleLead,
    toggleExcludedLead,
    selectAllLeads,
    selectAllExcluded,
    excludeSelectedLeads,
    reincludeSelectedLeads
  };
}

