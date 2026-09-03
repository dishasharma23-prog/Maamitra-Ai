import React from "react";

export function MicrophoneButton({
  onClick,
  state,
}: {
  onClick: () => void;
  state: "ready" | "listening" | "processing" | "done";
}) {
  const isListening = state === "listening";

  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse ring when listening */}
      {isListening && (
        <div 
          className="absolute rounded-full bg-coral opacity-30"
          style={{ width: 120, height: 120, animation: "mic-ring 2s infinite ease-out" }}
          aria-hidden="true"
        />
      )}
      
      <button
        onClick={onClick}
        disabled={state === "processing" || state === "done"}
        className={`relative z-10 flex items-center justify-center rounded-full transition-colors w-24 h-24 ${
          isListening ? "bg-coral text-white" : "bg-teal text-white hover:bg-teal-mid"
        }`}
        aria-label="Microphone"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      </button>
    </div>
  );
}
