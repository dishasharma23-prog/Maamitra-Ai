import React from "react";
import { Observation } from "../../types/checkIn";

const INDIC_FONT_STACK =
  "'Noto Sans', 'Noto Sans Devanagari', 'Noto Sans Bengali', 'Noto Sans Telugu', 'Noto Sans Tamil', 'Noto Sans Kannada', 'Noto Sans Malayalam', 'Noto Sans Gujarati', 'Noto Sans Gurmukhi', sans-serif";
const SANS = "'Noto Sans', sans-serif";

export function ObservationList({ observations, label }: { observations: Observation[]; label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 style={{ fontFamily: SANS }} className="text-sm font-semibold text-teal uppercase tracking-wide">
        {label}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {observations.map((obs) => (
          <li key={obs.id} className="flex items-start gap-3 bg-teal-light/50 border border-teal/15 rounded-lg px-4 py-3">
            <span className="text-teal font-bold mt-0.5" aria-hidden="true">•</span>
            <span style={{ fontFamily: INDIC_FONT_STACK }} className="text-base text-teal font-medium leading-snug">
              {obs.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
