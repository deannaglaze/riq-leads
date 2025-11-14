export default function SuccessMessage({ count, onContinue, onViewExcluded }) {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 sm:p-12 text-center">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl font-bold text-white">✓</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Leads Excluded Successfully
        </h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          <strong className="text-slate-900">{count}</strong> lead{count !== 1 ? 's have' : ' has'} been excluded and moved to the Excluded Leads tab.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onContinue}
            className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors"
          >
            Continue Reviewing
          </button>
          <button
            onClick={onViewExcluded}
            className="px-6 py-2.5 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            View Excluded Leads
          </button>
        </div>
      </div>
    </div>
  );
}

