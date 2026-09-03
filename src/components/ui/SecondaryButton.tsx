import React from "react";

const SANS = "'Noto Sans', sans-serif";

export function SecondaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{ fontFamily: SANS, minHeight: 52 }}
      className="w-full rounded-xl border border-teal/25 text-teal font-medium text-base transition-opacity active:opacity-70 px-6"
    >
      {children}
    </button>
  );
}
