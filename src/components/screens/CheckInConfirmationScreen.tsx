import { PageHeading } from "../ui/PageHeading";
import { HelperText } from "../ui/HelperText";
import { PrimaryButton } from "../ui/PrimaryButton";
import { SecondaryButton } from "../ui/SecondaryButton";
import { Language, CheckIn } from "../../types";
import { t } from "../../core/i18n/translations";

const INDIC_FONT_STACK = "'Tiro Devanagari Hindi', 'Tiro Marathi', serif";
const SANS = "'Noto Sans', sans-serif";

export function CheckInConfirmationScreen({
  language,
  checkIn,
  onSubmit,
  onBack,
  isSubmitting = false,
}: {
  language: Language;
  checkIn: Partial<CheckIn>;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}) {
  const { observations } = checkIn;
  const nativeLangName = t(language, "languageName");
  const confirmationText = t(language, "ashaConfirmationText");
  const analyzingText = t(language, "analyzingText");

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 pt-10 pb-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <PageHeading>{t(language, "confirmHeading")}</PageHeading>
          <HelperText>{t(language, "confirmSupport")}</HelperText>
        </div>

        <div className="bg-white rounded-xl border border-border p-5 flex flex-col gap-4">
          <h3
            style={{ fontFamily: SANS }}
            className="text-xs font-semibold text-foreground/45 uppercase tracking-wide"
          >
            {t(language, "whatYouShared")}
          </h3>

          {observations && observations.length > 0 && (
            <ul className="flex flex-col gap-2">
              {observations.map((obs) => (
                <li key={obs.id} className="flex items-start gap-3">
                  <span className="text-teal font-bold mt-0.5" aria-hidden="true">
                    •
                  </span>
                  <span
                    style={{ fontFamily: INDIC_FONT_STACK }}
                    className="text-base text-foreground font-medium leading-snug"
                  >
                    {obs.label}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="h-px bg-border/60 my-1" />

          <div className="flex items-center justify-between">
            <span
              style={{ fontFamily: SANS }}
              className="text-xs font-semibold text-foreground/45 uppercase tracking-wide"
            >
              {t(language, "language")}
            </span>
            <span
              style={{ fontFamily: INDIC_FONT_STACK }}
              className="text-sm font-medium text-foreground"
            >
              {nativeLangName}
            </span>
          </div>
        </div>

        <div className="bg-teal/5 border border-teal/10 rounded-lg p-3 mt-2 text-center">
          <p
            style={{ fontFamily: INDIC_FONT_STACK }}
            className="text-sm font-medium text-teal"
          >
            {confirmationText}
          </p>
        </div>

        {/* AI analysis loading indicator */}
        {isSubmitting && (
          <div className="flex items-center justify-center gap-2 py-2">
            <svg
              className="w-4 h-4 text-teal animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <p
              style={{ fontFamily: INDIC_FONT_STACK }}
              className="text-sm text-teal animate-pulse font-medium"
            >
              {analyzingText}
            </p>
          </div>
        )}
      </div>

      <div className="px-6 pt-5 pb-8 flex flex-col gap-3 bg-cream border-t border-border">
        <PrimaryButton onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? analyzingText : t(language, "submitBtn")}
        </PrimaryButton>
        <SecondaryButton onClick={onBack} disabled={isSubmitting}>
          {t(language, "goBackBtn")}
        </SecondaryButton>
      </div>
    </div>
  );
}
