import React from "react";

const SANS = "'Noto Sans', sans-serif";

export function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ fontFamily: SANS, minHeight: 56 }}
      className="w-full rounded-xl bg-teal text-white font-semibold text-base tracking-wide transition-opacity active:opacity-80 disabled:opacity-35 px-6"
    >
      {children}
    </button>
  );
}
