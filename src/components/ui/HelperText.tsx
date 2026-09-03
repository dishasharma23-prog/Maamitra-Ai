import React from "react";

const SANS = "'Noto Sans', sans-serif";

export function HelperText({ children, centered }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <p
      style={{ fontFamily: SANS }}
      className={`text-sm text-foreground/45 leading-relaxed ${centered ? "text-center" : ""}`}
    >
      {children}
    </p>
  );
}
