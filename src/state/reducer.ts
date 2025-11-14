import { Lead, LeadsState, LeadsAction } from '../types';

/**
 * Reducer for managing leads state
 */
export function leadsReducer(state: LeadsState, action: LeadsAction): LeadsState {
  switch (action.type) {
    case 'TOGGLE_LEAD': {
      const newSelected = new Set(state.selectedLeads);
      if (newSelected.has(action.payload)) {
        newSelected.delete(action.payload);
      } else {
        newSelected.add(action.payload);
      }
      return { ...state, selectedLeads: newSelected };
    }

    case 'TOGGLE_EXCLUDED_LEAD': {
      const newSelected = new Set(state.selectedExcludedLeads);
      if (newSelected.has(action.payload)) {
        newSelected.delete(action.payload);
      } else {
        newSelected.add(action.payload);
      }
      return { ...state, selectedExcludedLeads: newSelected };
    }

    case 'SELECT_ALL_LEADS': {
      const allSelected = state.selectedLeads.size === state.leads.length;
      return {
        ...state,
        selectedLeads: allSelected
          ? new Set<number>()
          : new Set(state.leads.map(lead => lead.id))
      };
    }

    case 'SELECT_ALL_EXCLUDED': {
      const allSelected = state.selectedExcludedLeads.size === state.excludedLeads.length;
      return {
        ...state,
        selectedExcludedLeads: allSelected
          ? new Set<number>()
          : new Set(state.excludedLeads.map(lead => lead.id))
      };
    }

    case 'EXCLUDE_SELECTED': {
      const leadsToExclude = state.leads.filter(lead => state.selectedLeads.has(lead.id));
      const remainingLeads = state.leads.filter(lead => !state.selectedLeads.has(lead.id));
      
      // Calculate next send time from remaining leads
      const nextSendTime = remainingLeads.length > 0
        ? remainingLeads.reduce((earliest, lead) => {
            const leadTime = new Date(lead.nextSendTime);
            return leadTime < earliest ? leadTime : earliest;
          }, new Date(remainingLeads[0].nextSendTime)).toISOString()
        : state.nextSendTime;

      return {
        ...state,
        leads: remainingLeads,
        excludedLeads: [...state.excludedLeads, ...leadsToExclude],
        selectedLeads: new Set<number>(),
        nextSendTime
      };
    }

    case 'REINCLUDE_SELECTED': {
      const leadsToReinclude = state.excludedLeads.filter(
        lead => state.selectedExcludedLeads.has(lead.id)
      );
      const remainingExcluded = state.excludedLeads.filter(
        lead => !state.selectedExcludedLeads.has(lead.id)
      );

      // Calculate next send time including re-included leads
      const allActiveLeads = [...state.leads, ...leadsToReinclude];
      const nextSendTime = allActiveLeads.length > 0
        ? allActiveLeads.reduce((earliest, lead) => {
            const leadTime = new Date(lead.nextSendTime);
            return leadTime < earliest ? leadTime : earliest;
          }, new Date(allActiveLeads[0].nextSendTime)).toISOString()
        : state.nextSendTime;

      return {
        ...state,
        leads: allActiveLeads,
        excludedLeads: remainingExcluded,
        selectedExcludedLeads: new Set<number>(),
        nextSendTime
      };
    }

    case 'SET_LEADS': {
      const nextSendTime = action.payload.length > 0
        ? action.payload.reduce((earliest, lead) => {
            const leadTime = new Date(lead.nextSendTime);
            return leadTime < earliest ? leadTime : earliest;
          }, new Date(action.payload[0].nextSendTime)).toISOString()
        : state.nextSendTime;

      return { ...state, leads: action.payload, nextSendTime };
    }

    case 'SET_EXCLUDED_LEADS': {
      return { ...state, excludedLeads: action.payload };
    }

    case 'UPDATE_NEXT_SEND_TIME': {
      return { ...state, nextSendTime: action.payload };
    }

    default:
      return state;
  }
}

