import React from "react";

const SANS = "'Noto Sans', sans-serif";

export function StatusTile({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{ fontFamily: SANS, minHeight: 60 }}
      className={`flex items-center gap-4 px-5 rounded-xl border text-left transition-all w-full ${
        selected
          ? "border-teal bg-teal-light text-teal"
          : "border-border bg-white text-foreground"
      }`}
    >
      <span className="text-2xl flex-shrink-0" aria-hidden="true">{icon}</span>
      <span className="text-base font-medium flex-1">{label}</span>
      {selected && (
        <svg
          className="flex-shrink-0"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="10" fill="#1c4f60" />
          <path
            d="M5.5 10L8.5 13L14.5 7"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
