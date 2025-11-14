import { Lead } from '../types';

interface LeadCardProps {
  lead: Lead;
  isSelected: boolean;
  onToggle: (leadId: number) => void;
  isExcluded?: boolean;
}

export default function LeadCard({ lead, isSelected, onToggle }: LeadCardProps) {
  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const getIntentColor = (intent: number): string => {
    if (intent >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (intent >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-orange-100 text-orange-800 border-orange-200';
  };

  const getStageColor = (stage: string): string => {
    if (stage.includes('3')) return 'bg-blue-100 text-blue-800';
    if (stage.includes('2')) return 'bg-purple-100 text-purple-800';
    if (stage.includes('1')) return 'bg-indigo-100 text-indigo-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div
      className={`
        bg-white border-2 rounded-lg p-4 sm:p-5 transition-all cursor-pointer
        ${isSelected 
          ? 'border-primary bg-blue-50 shadow-sm' 
          : 'border-slate-200 hover:border-primary hover:shadow-sm'
        }
      `}
      onClick={() => onToggle(lead.id)}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle(lead.id);
        }
      }}
    >
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(lead.id)}
          onClick={(e) => e.stopPropagation()}
          className="mt-1 w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary cursor-pointer"
          aria-label={`Select ${lead.name}`}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                {lead.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <span aria-hidden="true">🕐</span>
                  <span>Received {formatTimeAgo(lead.receivedTime)}</span>
                </span>
              </div>
            </div>
            
            <div className={`
              px-3 py-1 rounded-full text-sm font-semibold border
              ${getIntentColor(lead.intentPercent)}
            `}>
              {lead.intentPercent}% Intent
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-500" aria-hidden="true">🚗</span>
                <span className="text-slate-700 font-medium">{lead.vehicle}</span>
              </div>
              
              {lead.tradeIn ? (
                <div className="flex items-center gap-2">
                  <span className="text-slate-500" aria-hidden="true">🔄</span>
                  <span className="text-slate-700">Trade-in: {lead.tradeIn}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-400">
                  <span aria-hidden="true">🔄</span>
                  <span>No trade-in</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <span className={`
                px-2.5 py-1 rounded-md text-xs font-medium
                ${getStageColor(lead.sequenceStage)}
              `}>
                {lead.sequenceStage}
              </span>
              <span className="text-xs text-slate-500">
                Next send: {new Date(lead.nextSendTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

