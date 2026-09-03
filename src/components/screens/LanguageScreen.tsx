import { BackButton } from "../ui/BackButton";
import { PageHeading } from "../ui/PageHeading";
import { PrimaryButton } from "../ui/PrimaryButton";
import { HelperText } from "../ui/HelperText";
import { t } from "../../core/i18n/translations";
import { Language, LanguageDef } from "../../types";

const INDIC_FONT_STACK =
  "'Noto Sans', 'Noto Sans Devanagari', 'Noto Sans Bengali', 'Noto Sans Telugu', 'Noto Sans Tamil', 'Noto Sans Kannada', 'Noto Sans Malayalam', 'Noto Sans Gujarati', 'Noto Sans Gurmukhi', sans-serif";
const SANS = "'Noto Sans', sans-serif";

export function LanguageScreen({
  languages,
  selectedLang,
  onSelect,
  onContinue,
  onBack,
}: {
  languages: LanguageDef[];
  selectedLang: Language;
  onSelect: (code: Language) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-12 pb-5 flex-shrink-0 flex flex-col gap-5">
        <BackButton onClick={onBack} label={t(selectedLang, "back")} />
        <PageHeading>
          {t(selectedLang, "languageHeading")}
        </PageHeading>
      </div>

      <div className="flex-1 overflow-y-auto px-6">
        <div className="grid grid-cols-2 gap-2.5 pb-4">
          {languages.map((lang) => {
            const isSelected = selectedLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelect(lang.code)}
                style={{ minHeight: 76, fontFamily: INDIC_FONT_STACK }}
                className={`flex flex-col justify-center px-4 py-3.5 rounded-xl border transition-all text-left ${
                  isSelected
                    ? "border-teal bg-teal-light"
                    : "border-border bg-white active:bg-muted"
                }`}
              >
                <span
                  className={`text-xl font-semibold leading-tight ${
                    isSelected ? "text-teal" : "text-foreground"
                  }`}
                >
                  {lang.native}
                </span>
                {lang.label && (
                  <span
                    style={{ fontFamily: SANS }}
                    className={`text-xs mt-1 ${
                      isSelected ? "text-teal/60" : "text-foreground/35"
                    }`}
                  >
                    {lang.label}
                  </span>
                )}
                {isSelected && (
                  <div className="mt-1.5">
                    <div
                      className="w-4 h-0.5 rounded-full bg-teal"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6 pt-4 pb-8 flex flex-col gap-4 border-t border-border flex-shrink-0">
        <HelperText>{t(selectedLang, "languageNote")}</HelperText>
        <PrimaryButton onClick={onContinue} disabled={!selectedLang}>
          {t(selectedLang, "continueBtn")}
        </PrimaryButton>
      </div>
    </div>
  );
}
