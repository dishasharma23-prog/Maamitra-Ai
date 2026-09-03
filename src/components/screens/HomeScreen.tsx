import { PageHeading } from "../ui/PageHeading";
import { HelperText } from "../ui/HelperText";
import { PrimaryButton } from "../ui/PrimaryButton";
import { SecondaryButton } from "../ui/SecondaryButton";
import { t, timeGreeting } from "../../core/i18n/translations";
import { MotherData, Language } from "../../types";
import { useDatabase } from "../../hooks/useDatabase";

const INDIC_FONT_STACK =
  "'Noto Sans', 'Noto Sans Devanagari', 'Noto Sans Bengali', 'Noto Sans Telugu', 'Noto Sans Tamil', 'Noto Sans Kannada', 'Noto Sans Malayalam', 'Noto Sans Gujarati', 'Noto Sans Gurmukhi', sans-serif";
const SANS = "'Noto Sans', sans-serif";

export function HomeScreen({
  motherData,
  language,
  onVoiceCheckIn,
}: {
  motherData: MotherData;
  language: Language;
  onVoiceCheckIn: () => void;
}) {
  const { db } = useDatabase();
  const DEMO_MOTHER_ID = "m-01";
  const actions = db.getActions(DEMO_MOTHER_ID);
  const latestAction = actions.length > 0 ? actions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0] : null;

  return (
    <div className="flex flex-col h-full px-6 pt-12 pb-8">
      <div className="flex flex-col gap-1 mb-6">
        <p style={{ fontFamily: INDIC_FONT_STACK }} className="text-teal font-medium text-lg">
          {timeGreeting(language)}, {motherData.name}
        </p>
      </div>

      {latestAction && (
        <div className="mb-10 bg-teal/10 p-4 rounded-xl border border-teal/20 shadow-sm">
          <p className="text-sm text-foreground flex items-start gap-2">
            <svg className="w-5 h-5 text-teal shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="leading-snug">
              <strong className="block mb-0.5">{t(language, "ashaUpdateTitle")}</strong>
              {latestAction.type === 'contact' && t(language, "ashaActionContact")}
              {latestAction.type === 'visit' && t(language, "ashaActionVisit")}
              {latestAction.type === 'refer' && t(language, "ashaActionRefer")}
            </span>
          </p>
        </div>
      )}

      {!latestAction && <div className="mb-10" />}

      <div className="flex flex-col gap-3 mb-16 text-center mt-2">
        <PageHeading>{t(language, "homeQuestion")}</PageHeading>
        <HelperText centered>{t(language, "homeSupport")}</HelperText>
      </div>

      <div className="flex flex-col items-center gap-6 mt-auto">
        <div className="flex flex-col items-center gap-3 w-full">
          <button
            onClick={onVoiceCheckIn}
            className="flex flex-col items-center justify-center gap-3 w-32 h-32 rounded-full bg-teal text-white hover:bg-teal-mid transition-colors shadow-sm"
            aria-label={t(language, "micLabel")}
          >
            <svg
              width="36"
              height="36"
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
            <span style={{ fontFamily: SANS }} className="text-sm font-semibold tracking-wide">
              {t(language, "micLabel")}
            </span>
          </button>
        </div>

        <div className="w-full mt-4">
          <SecondaryButton onClick={onVoiceCheckIn}>{t(language, "quickCheckin")}</SecondaryButton>
        </div>

        <p style={{ fontFamily: SANS }} className="text-xs text-foreground/40 font-medium mt-2">
          {t(language, "lastCheckin")}
        </p>
      </div>
    </div>
  );
}
