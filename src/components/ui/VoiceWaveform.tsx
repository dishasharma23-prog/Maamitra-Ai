import React from "react";

export function VoiceWaveform({ active }: { active: boolean }) {
  if (!active) {
    return (
      <div className="h-8 flex items-center justify-center opacity-50" aria-hidden="true">
        <div className="w-1 h-1 rounded-full bg-teal" />
      </div>
    );
  }

  // 5 organic bars
  return (
    <div className="h-8 flex items-center justify-center gap-1.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-1.5 bg-coral rounded-full origin-bottom"
          style={{
            height: "100%",
            animation: `wave-bar 1.2s infinite ease-in-out`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
