import LeadCard from './LeadCard';

export default function LeadList({ 
  leads, 
  selectedIds, 
  onToggleSelection, 
  onSelectAll,
  emptyMessage = "No leads available"
}) {
  const allSelected = leads.length > 0 && selectedIds.size === leads.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < leads.length;

  if (leads.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="text-6xl mb-4 opacity-50">📋</div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">No Leads</h3>
        <p className="text-slate-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-sm font-medium text-slate-600">
          {selectedIds.size} of {leads.length} selected
        </span>
        <button
          onClick={onSelectAll}
          className="text-sm font-medium text-primary hover:text-primary-hover"
        >
          {allSelected ? 'Deselect All' : 'Select All'}
        </button>
      </div>
      
      <div className="space-y-3">
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            isSelected={selectedIds.has(lead.id)}
            onToggle={onToggleSelection}
          />
        ))}
      </div>
    </div>
  );
}

