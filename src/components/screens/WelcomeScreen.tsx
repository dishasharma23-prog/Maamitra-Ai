import { useState } from "react";
import { BrandMark } from "../ui/BrandMark";
import { PrimaryButton } from "../ui/PrimaryButton";
import { TextInput } from "../ui/TextInput";
import { HelperText } from "../ui/HelperText";
import { t } from "../../core/i18n/translations";
import { Language } from "../../types";

const SANS = "'Noto Sans', sans-serif";
const SERIF = "'Lora', Georgia, serif";

export function WelcomeScreen({
  onContinue,
  onDemo,
  language,
}: {
  onContinue: () => void;
  onDemo: () => void;
  language: Language;
}) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handlePhoneChange = (val: string) => {
    // Only allow numeric digits and max 10
    const numericVal = val.replace(/\D/g, "").slice(0, 10);
    setPhone(numericVal);
    if (error) setError(null);
  };

  const handleContinue = () => {
    if (!/^\d{10}$/.test(phone)) {
      setError(t(language, "phoneError"));
      return;
    }
    setError(null);
    onContinue();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-shrink-0 bg-teal/10 overflow-hidden" style={{ height: "40%" }}>
        <img
          src="https://images.unsplash.com/photo-1714595747121-7067706bc557?w=420&h=320&fit=crop&auto=format&crop=top"
          alt="A mother gently holding her newborn baby"
          className="w-full h-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(245,240,230,0) 45%, rgba(245,240,230,0.7) 75%, #f5f0e6 100%)",
          }}
        />
      </div>

      <div className="flex flex-col flex-1 px-6 pb-8 gap-5 overflow-y-auto">
        <div className="flex flex-col items-center gap-3 text-center pt-2">
          <BrandMark size={52} />
          <div>
            <h1
              style={{ fontFamily: SERIF }}
              className="text-[2rem] font-bold text-teal tracking-tight leading-none"
            >
              MaaMitra
            </h1>
            <p
              style={{ fontFamily: SANS }}
              className="text-base font-semibold text-foreground/80 mt-3 leading-relaxed"
            >
              {t(language, "welcomeTagline")}
            </p>
            <p
              style={{ fontFamily: SANS }}
              className="text-sm text-foreground/60 mt-2 leading-relaxed max-w-[280px] mx-auto"
            >
              {t(language, "welcomeSupport")}
            </p>
          </div>
        </div>

        <div className="h-px bg-border my-1" />

        <div className="flex flex-col gap-3">
          <p style={{ fontFamily: SANS }} className="text-sm font-medium text-foreground/60">
            {t(language, "continueWithPhone")}
          </p>
          <div>
            <TextInput
              prefix="+91"
              placeholder={t(language, "enterNumber")}
              value={phone}
              onChange={handlePhoneChange}
              type="tel"
            />
            {error && (
              <p className="text-xs font-medium text-coral mt-2 ml-1 animate-in fade-in slide-in-from-top-1">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-auto pt-2">
          <PrimaryButton onClick={handleContinue}>{t(language, "continueBtn")}</PrimaryButton>
          <button
            onClick={onDemo}
            style={{ fontFamily: SANS, minHeight: 44 }}
            className="text-sm font-medium text-coral py-2 tracking-wide"
          >
            {t(language, "demoAccount")}
          </button>
        </div>

        <HelperText centered>
          {t(language, "legalNote")}
        </HelperText>
      </div>
    </div>
  );
}
