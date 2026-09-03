import { useState } from "react";
import { BackButton } from "../ui/BackButton";
import { PageHeading } from "../ui/PageHeading";
import { HelperText } from "../ui/HelperText";
import { TextInput } from "../ui/TextInput";
import { StatusTile } from "../ui/StatusTile";
import { PrimaryButton } from "../ui/PrimaryButton";
import { t } from "../../core/i18n/translations";
import { MotherData, Status, Language, LanguageDef } from "../../types";

const INDIC_FONT_STACK =
  "'Noto Sans', 'Noto Sans Devanagari', 'Noto Sans Bengali', 'Noto Sans Telugu', 'Noto Sans Tamil', 'Noto Sans Kannada', 'Noto Sans Malayalam', 'Noto Sans Gujarati', 'Noto Sans Gurmukhi', sans-serif";
const SANS = "'Noto Sans', sans-serif";

export function OnboardingScreen({
  onContinue,
  onBack,
  language,
  languages,
}: {
  onContinue: (data: MotherData) => void;
  onBack: () => void;
  language: Language;
  languages: LanguageDef[];
}) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>(null);
  const [date, setDate] = useState("");

  const langEntry = languages.find((l) => l.code === language);
  const langDisplay = langEntry
    ? langEntry.native + (langEntry.label ? ` · ${langEntry.label}` : "")
    : "English";

  const isValid = name.trim().length > 0 && status !== null && date.length > 0;

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-12 pb-4 flex-shrink-0 flex flex-col gap-5">
        <BackButton onClick={onBack} label={t(language, "back")} />
        <div className="flex flex-col gap-1.5">
          <PageHeading>{t(language, "onboardingHeading")}</PageHeading>
          <HelperText>{t(language, "onboardingSupport")}</HelperText>
        </div>
      </div>

      <div className="mx-6 h-px bg-border flex-shrink-0" />

      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">
        <TextInput
          label={t(language, "yourName")}
          placeholder={t(language, "namePlaceholder")}
          value={name}
          onChange={setName}
        />

        <div className="flex flex-col gap-3">
          <label
            style={{ fontFamily: SANS }}
            className="text-sm font-medium text-foreground/60"
          >
            {t(language, "areYou")}
          </label>
          <div className="flex flex-col gap-2.5">
            <StatusTile
              label={t(language, "pregnantOption")}
              icon="🤰"
              selected={status === "pregnant"}
              onClick={() => setStatus("pregnant")}
            />
            <StatusTile
              label={t(language, "postpartumOption")}
              icon="👶"
              selected={status === "postpartum"}
              onClick={() => setStatus("postpartum")}
            />
          </div>
        </div>

        {status && (
          <TextInput
            label={
              status === "pregnant"
                ? t(language, "expectedDate")
                : t(language, "babyDob")
            }
            placeholder="DD / MM / YYYY"
            value={date}
            onChange={setDate}
            type="date"
          />
        )}

        <div className="flex flex-col gap-1.5">
          <label
            style={{ fontFamily: SANS }}
            className="text-sm font-medium text-foreground/60"
          >
            {t(language, "preferredLang")}
          </label>
          <div
            className="flex items-center justify-between px-4 rounded-xl border border-border bg-muted"
            style={{ minHeight: 52, fontFamily: INDIC_FONT_STACK }}
          >
            <span className="text-base text-foreground font-medium">
              {langDisplay}
            </span>
            <button
              onClick={onBack}
              style={{ fontFamily: SANS, minHeight: 44 }}
              className="text-xs text-coral font-semibold px-2 py-2"
            >
              {t(language, "changeLang")}
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 pt-4 pb-8 border-t border-border flex-shrink-0">
        <PrimaryButton
          onClick={() => isValid && onContinue({ name, status, date })}
          disabled={!isValid}
        >
          {t(language, "continueBtn")}
        </PrimaryButton>
      </div>
    </div>
  );
}
