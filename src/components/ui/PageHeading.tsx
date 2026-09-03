import React from "react";

const SERIF = "'Lora', Georgia, serif";

export function PageHeading({ children }: { children: React.ReactNode }) {
  return (
    <h1
      style={{ fontFamily: SERIF }}
      className="text-[1.6rem] font-semibold text-foreground leading-snug"
    >
      {children}
    </h1>
  );
}
