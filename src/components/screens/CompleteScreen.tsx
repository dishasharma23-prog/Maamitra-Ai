import { HelperText } from "../ui/HelperText";
import { PrimaryButton } from "../ui/PrimaryButton";
import { t } from "../../core/i18n/translations";
import { MotherData, Language, LanguageDef } from "../../types";

const INDIC_FONT_STACK =
  "'Noto Sans', 'Noto Sans Devanagari', 'Noto Sans Bengali', 'Noto Sans Telugu', 'Noto Sans Tamil', 'Noto Sans Kannada', 'Noto Sans Malayalam', 'Noto Sans Gujarati', 'Noto Sans Gurmukhi', sans-serif";
const SANS = "'Noto Sans', sans-serif";
const SERIF = "'Lora', Georgia, serif";

export function CompleteScreen({
  motherData,
  language,
  languages,
  onContinue,
}: {
  motherData: MotherData;
  language: Language;
  languages: LanguageDef[];
  onContinue: () => void;
}) {
  const langEntry = languages.find((l) => l.code === language);

  return (
    <div className="flex flex-col h-full items-center justify-center px-8 pb-16 gap-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <div
          className="w-20 h-20 rounded-full bg-teal-light flex items-center justify-center"
          aria-hidden="true"
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path
              d="M8 18L14.5 24.5L28 11"
              stroke="#1c4f60"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <p
            style={{ fontFamily: INDIC_FONT_STACK }}
            className="text-2xl font-semibold text-teal"
          >
            {t(language, "welcomeGreeting")}, {motherData.name}
          </p>
          <h2
            style={{ fontFamily: SERIF }}
            className="text-xl text-foreground font-medium leading-snug"
          >
            {t(language, "completeHeading")}
          </h2>
          <p
            style={{ fontFamily: SANS }}
            className="text-sm text-foreground/50 leading-relaxed mt-1"
          >
            {t(language, "completeSupport")}
          </p>
        </div>
      </div>

      <div className="w-12 h-px bg-teal/20" />

      <div className="w-full rounded-xl border border-border bg-white p-5 flex flex-col gap-3">
        {[
          { label: t(language, "yourName"), value: motherData.name },
          {
            label: t(language, "statusLabel"),
            value:
              motherData.status === "pregnant"
                ? t(language, "pregnantOption")
                : t(language, "postpartumOption"),
          },
          {
            label:
              motherData.status === "pregnant"
                ? t(language, "expectedDate")
                : t(language, "babyDob"),
            value: motherData.date
              ? new Date(motherData.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "—",
          },
          {
            label: t(language, "language"),
            value: langEntry
              ? langEntry.native + (langEntry.label ? ` · ${langEntry.label}` : "")
              : "English",
          },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-start justify-between gap-4">
            <span
              style={{ fontFamily: SANS }}
              className="text-xs text-foreground/40 uppercase tracking-wide pt-0.5"
            >
              {label}
            </span>
            <span
              style={{ fontFamily: INDIC_FONT_STACK }}
              className="text-sm text-foreground font-medium text-right"
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      <HelperText centered>
        {t(language, "completeDemoNote")}
      </HelperText>

      <div className="w-full mt-4">
        <PrimaryButton onClick={onContinue}>
          {t(language, "continueBtn")}
        </PrimaryButton>
      </div>
    </div>
  );
}
