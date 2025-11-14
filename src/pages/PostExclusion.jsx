import SuccessMessage from '../components/SuccessMessage';

/**
 * Post-Exclusion Page
 * Success state after excluding leads
 */
export default function PostExclusion({
  exclusionCount,
  onContinue,
  onViewExcluded
}) {
  return (
    <SuccessMessage
      count={exclusionCount}
      onContinue={onContinue}
      onViewExcluded={onViewExcluded}
    />
  );
}

