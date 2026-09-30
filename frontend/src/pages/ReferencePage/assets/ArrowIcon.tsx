type ArrowIconProps = {
  direction: 'left' | 'right';
  size?: number;
};

export default function ArrowIcon({ direction, size = 14 }: ArrowIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        display: 'block',
        flex: '0 0 auto',
        transform: direction === 'left' ? 'scaleX(-1)' : undefined,
      }}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
