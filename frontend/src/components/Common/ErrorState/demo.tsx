import { ErrorState } from './ErrorState';

export default function ErrorStateDemo() {
  return (
    <div style={{ padding: 24, display: 'grid', gap: 24 }}>
      <ErrorState
        title="Unable to load profile"
        message="We couldn't retrieve your profile information."
        onRetry={() => console.log('retry clicked')}
      />
      <ErrorState /> {/* no retry button */}
    </div>
  );
}
