export default function ConfirmationDialog({ count, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Exclude Selected Leads?
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          You're about to exclude <strong className="text-slate-900">{count}</strong> lead{count !== 1 ? 's' : ''} from the automated send.
          They will be moved to the Excluded Leads tab where you can review and re-include them later.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-danger text-white rounded-lg font-medium hover:bg-danger-hover transition-colors"
          >
            Confirm Exclusion
          </button>
        </div>
      </div>
    </div>
  );
}

