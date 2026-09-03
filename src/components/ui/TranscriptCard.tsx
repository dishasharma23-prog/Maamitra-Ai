import React from "react";

const INDIC_FONT_STACK =
  "'Noto Sans', 'Noto Sans Devanagari', 'Noto Sans Bengali', 'Noto Sans Telugu', 'Noto Sans Tamil', 'Noto Sans Kannada', 'Noto Sans Malayalam', 'Noto Sans Gujarati', 'Noto Sans Gurmukhi', sans-serif";
const SANS = "'Noto Sans', sans-serif";

export function TranscriptCard({ text, label, subtext }: { text: string; label: string; subtext?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 style={{ fontFamily: SANS }} className="text-sm font-semibold text-foreground/60 uppercase tracking-wide">
        {label}
      </h3>
      <div className="bg-white rounded-xl border border-border p-5 flex flex-col gap-3">
        <p style={{ fontFamily: INDIC_FONT_STACK }} className="text-lg text-foreground font-medium leading-relaxed">
          "{text}"
        </p>
        {subtext && (
          <p style={{ fontFamily: SANS }} className="text-xs text-foreground/45">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
