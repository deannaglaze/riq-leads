import LeadList from '../components/LeadList';

/**
 * Morning Checkpoint Page
 * Displays newly imported leads with selection and exclusion capabilities
 */
export default function MorningCheckpoint({
  leads,
  selectedLeads,
  onToggleLead,
  onSelectAll,
  onExcludeClick
}) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Newly Imported Leads
        </h2>
        <p className="text-slate-600">
          Review and exclude leads before the next automated send
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-sm font-medium text-slate-600">
          {selectedLeads.size} selected
        </span>
        <div className="flex gap-3">
          <button
            onClick={onSelectAll}
            className="px-4 py-2 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Select All
          </button>
          <button
            onClick={onExcludeClick}
            disabled={selectedLeads.size === 0}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Exclude Selected
          </button>
        </div>
      </div>

      <LeadList
        leads={leads}
        selectedIds={selectedLeads}
        onToggleSelection={onToggleLead}
        onSelectAll={onSelectAll}
        emptyMessage="All leads have been processed."
      />
    </div>
  );
}

