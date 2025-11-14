export default function Tabs({ activeTab, onTabChange, checkpointCount, excludedCount }) {
  return (
    <div className="flex gap-2 border-b-2 border-slate-200 mb-8">
      <button
        onClick={() => onTabChange('checkpoint')}
        className={`
          relative px-6 py-3 font-medium transition-colors flex items-center gap-2
          ${activeTab === 'checkpoint'
            ? 'text-primary border-b-2 border-primary -mb-[2px]'
            : 'text-slate-600 hover:text-slate-900'
          }
        `}
      >
        Morning Checkpoint
        <span className={`
          px-2 py-0.5 rounded-full text-xs font-semibold
          ${activeTab === 'checkpoint'
            ? 'bg-primary text-white'
            : 'bg-slate-100 text-slate-600'
          }
        `}>
          {checkpointCount}
        </span>
      </button>
      
      <button
        onClick={() => onTabChange('excluded')}
        className={`
          relative px-6 py-3 font-medium transition-colors flex items-center gap-2
          ${activeTab === 'excluded'
            ? 'text-primary border-b-2 border-primary -mb-[2px]'
            : 'text-slate-600 hover:text-slate-900'
          }
        `}
      >
        Excluded Leads
        <span className={`
          px-2 py-0.5 rounded-full text-xs font-semibold
          ${activeTab === 'excluded'
            ? 'bg-primary text-white'
            : 'bg-slate-100 text-slate-600'
          }
        `}>
          {excludedCount}
        </span>
      </button>
    </div>
  );
}

