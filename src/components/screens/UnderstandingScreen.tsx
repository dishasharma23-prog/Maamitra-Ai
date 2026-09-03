import { PrimaryButton } from "../ui/PrimaryButton";
import { SecondaryButton } from "../ui/SecondaryButton";
import { TranscriptCard } from "../ui/TranscriptCard";
import { ObservationList } from "../ui/ObservationList";
import { t } from "../../core/i18n/translations";
import { Language } from "../../types";
import { CheckIn } from "../../types/checkIn";

export function UnderstandingScreen({
  language,
  checkIn,
  onConfirm,
  onRetry,
  onTapFallback,
}: {
  language: Language;
  checkIn: Partial<CheckIn>;
  onConfirm: () => void;
  onRetry: () => void;
  onTapFallback: () => void;
}) {
  const { transcript, observations } = checkIn;

  return (
    <div className="flex flex-col h-full bg-cream-dark">
      <div className="flex-1 overflow-y-auto px-6 pt-16 pb-6 flex flex-col gap-8">
        
        {transcript && (
          <TranscriptCard
            label={t(language, "transcriptHeading")}
            text={transcript.transcript}
            subtext={t(language, "transcribedFromVoice")}
          />
        )}

        <div className="h-px bg-border opacity-60" />

        {observations && observations.length > 0 && (
          <ObservationList
            label={t(language, "understoodHeading")}
            observations={observations}
          />
        )}

      </div>

      <div className="px-6 pt-5 pb-8 flex flex-col gap-3 bg-cream border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
        <p className="text-center text-sm font-medium text-foreground mb-1">
          {t(language, "isThisCorrect")}
        </p>
        <PrimaryButton onClick={onConfirm}>
          {t(language, "confirmBtn")}
        </PrimaryButton>
        <div className="grid grid-cols-2 gap-3 mt-1">
          <SecondaryButton onClick={onRetry}>
            {t(language, "retryBtn")}
          </SecondaryButton>
          <button 
            onClick={onTapFallback}
            className="rounded-xl border border-border bg-white text-foreground/60 font-medium text-sm transition-opacity hover:bg-gray-50 active:opacity-70"
          >
            {t(language, "somethingWrongBtn")}
          </button>
        </div>
      </div>
    </div>
  );
}

