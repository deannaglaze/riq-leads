import LeadList from '../components/LeadList';

/**
 * Excluded Leads Page
 * Displays excluded leads with re-include capabilities
 */
export default function ExcludedLeads({
  excludedLeads,
  selectedExcludedLeads,
  onToggleExcludedLead,
  onSelectAllExcluded,
  onReinclude
}) {
  if (excludedLeads.length === 0) {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Excluded Leads
          </h2>
          <p className="text-slate-600">
            Review and re-include leads that were previously excluded
          </p>
        </div>
        <div className="text-center py-16 px-4">
          <div className="text-6xl mb-4 opacity-50">📋</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No Excluded Leads</h3>
          <p className="text-slate-600">Leads you exclude will appear here for review.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Excluded Leads
        </h2>
        <p className="text-slate-600">
          Review and re-include leads that were previously excluded
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-sm font-medium text-slate-600">
          {selectedExcludedLeads.size} selected
        </span>
        <div className="flex gap-3">
          <button
            onClick={onSelectAllExcluded}
            className="px-4 py-2 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Select All
          </button>
          <button
            onClick={onReinclude}
            disabled={selectedExcludedLeads.size === 0}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Re-include Selected
          </button>
        </div>
      </div>

      <LeadList
        leads={excludedLeads}
        selectedIds={selectedExcludedLeads}
        onToggleSelection={onToggleExcludedLead}
        onSelectAll={onSelectAllExcluded}
        emptyMessage="No excluded leads"
      />
    </div>
  );
}

