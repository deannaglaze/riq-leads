import { useState, useEffect, useCallback } from 'react';
import { initialLeads } from '../fixtures/leads';

/**
 * Custom hook for managing leads state
 * Handles active leads, excluded leads, and selections
 */
export function useLeadsState() {
  const [leads, setLeads] = useState(initialLeads);
  const [excludedLeads, setExcludedLeads] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState(new Set());
  const [selectedExcludedLeads, setSelectedExcludedLeads] = useState(new Set());
  const [nextSendTime, setNextSendTime] = useState(() => {
    if (initialLeads.length === 0) {
      return new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
    }
    return initialLeads.reduce((earliest, lead) => {
      const leadTime = new Date(lead.nextSendTime);
      return leadTime < earliest ? leadTime : earliest;
    }, new Date(initialLeads[0].nextSendTime)).toISOString();
  });

  // Update next send time when leads change
  useEffect(() => {
    if (leads.length > 0) {
      const earliest = leads.reduce((earliest, lead) => {
        const leadTime = new Date(lead.nextSendTime);
        return leadTime < earliest ? leadTime : earliest;
      }, new Date(leads[0].nextSendTime));
      setNextSendTime(earliest.toISOString());
    }
  }, [leads]);

  const toggleLead = useCallback((leadId) => {
    setSelectedLeads(prev => {
      const newSet = new Set(prev);
      if (newSet.has(leadId)) {
        newSet.delete(leadId);
      } else {
        newSet.add(leadId);
      }
      return newSet;
    });
  }, []);

  const toggleExcludedLead = useCallback((leadId) => {
    setSelectedExcludedLeads(prev => {
      const newSet = new Set(prev);
      if (newSet.has(leadId)) {
        newSet.delete(leadId);
      } else {
        newSet.add(leadId);
      }
      return newSet;
    });
  }, []);

  const selectAllLeads = useCallback(() => {
    setSelectedLeads(prev => {
      if (prev.size === leads.length) {
        return new Set();
      }
      return new Set(leads.map(lead => lead.id));
    });
  }, [leads]);

  const selectAllExcluded = useCallback(() => {
    setSelectedExcludedLeads(prev => {
      if (prev.size === excludedLeads.length) {
        return new Set();
      }
      return new Set(excludedLeads.map(lead => lead.id));
    });
  }, [excludedLeads]);

  const excludeSelectedLeads = useCallback(() => {
    const leadsToExclude = leads.filter(lead => selectedLeads.has(lead.id));
    
    setExcludedLeads(prev => [...prev, ...leadsToExclude]);
    setLeads(prev => prev.filter(lead => !selectedLeads.has(lead.id)));
    setSelectedLeads(new Set());
    
    return leadsToExclude.length;
  }, [leads, selectedLeads]);

  const reincludeSelectedLeads = useCallback(() => {
    const leadsToReinclude = excludedLeads.filter(lead => selectedExcludedLeads.has(lead.id));
    
    setLeads(prev => [...prev, ...leadsToReinclude]);
    setExcludedLeads(prev => prev.filter(lead => !selectedExcludedLeads.has(lead.id)));
    setSelectedExcludedLeads(new Set());
  }, [excludedLeads, selectedExcludedLeads]);

  return {
    leads,
    excludedLeads,
    selectedLeads,
    selectedExcludedLeads,
    nextSendTime,
    toggleLead,
    toggleExcludedLead,
    selectAllLeads,
    selectAllExcluded,
    excludeSelectedLeads,
    reincludeSelectedLeads
  };
}

