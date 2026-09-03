const SANS = "'Noto Sans', sans-serif";

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ fontFamily: SANS, minHeight: 44 }}
      className="flex items-center gap-1.5 text-teal/60 hover:text-teal transition-colors -ml-1"
      aria-label="Go back"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M11 3.5L5.5 9L11 14.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-sm font-medium">Back</span>
    </button>
  );
}
