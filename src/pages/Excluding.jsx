import ConfirmationDialog from '../components/ConfirmationDialog';

/**
 * Excluding Page
 * Confirmation dialog state for excluding leads
 */
export default function Excluding({
  exclusionCount,
  onConfirm,
  onCancel
}) {
  return (
    <ConfirmationDialog
      count={exclusionCount}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

