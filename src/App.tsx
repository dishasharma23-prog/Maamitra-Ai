import { useState } from "react";
import { WelcomeScreen } from "./components/screens/WelcomeScreen";
import { LanguageScreen } from "./components/screens/LanguageScreen";
import { OnboardingScreen } from "./components/screens/OnboardingScreen";
import { CompleteScreen } from "./components/screens/CompleteScreen";
import { HomeScreen } from "./components/screens/HomeScreen";
import { VoiceCheckInScreen } from "./components/screens/VoiceCheckInScreen";
import { UnderstandingScreen } from "./components/screens/UnderstandingScreen";
import { CheckInConfirmationScreen } from "./components/screens/CheckInConfirmationScreen";
import { ASHADashboardScreen } from "./components/screens/ASHADashboardScreen";
import { Screen, Language, MotherData } from "./types";
import { Mother } from "./types/mother";
import { CheckIn } from "./types/checkIn";
import { useCheckInSubmit } from "./hooks/useCheckInSubmit";

const SANS = "'Noto Sans', sans-serif";

const LANGUAGES = [
  { code: "en" as Language, native: "English", label: "" },
  { code: "hi" as Language, native: "हिंदी", label: "Hindi" },
  { code: "mr" as Language, native: "मराठी", label: "Marathi" },
  { code: "bn" as Language, native: "বাংলা", label: "Bengali" },
  { code: "te" as Language, native: "తెలుగు", label: "Telugu" },
  { code: "ta" as Language, native: "தமிழ்", label: "Tamil" },
  { code: "kn" as Language, native: "ಕನ್ನಡ", label: "Kannada" },
  { code: "ml" as Language, native: "മലയാളം", label: "Malayalam" },
  { code: "gu" as Language, native: "ગુજરાતી", label: "Gujarati" },
  { code: "pa" as Language, native: "ਪੰਜਾਬੀ", label: "Punjabi" },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("preferredLanguage") as Language;
    return saved || "hi";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferredLanguage", lang);
  };
  const [mother, setMother] = useState<Mother | null>(null);
  const [currentCheckIn, setCurrentCheckIn] = useState<Partial<CheckIn> | null>(null);
  const [forceTapMode, setForceTapMode] = useState(false);

  const { submitCheckIn, isAnalyzing } = useCheckInSubmit();

  const handleOnboardingComplete = (data: MotherData) => {
    let gestationalWeeks: number | undefined;
    let postpartumDay: number | undefined;

    if (data.date) {
      const date = new Date(data.date);
      const today = new Date();
      if (data.status === "pregnant") {
        const daysUntilDue = Math.round((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        gestationalWeeks = Math.max(0, Math.round((280 - daysUntilDue) / 7));
      } else if (data.status === "postpartum") {
        const diffDays = Math.round((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        postpartumDay = Math.max(0, diffDays);
      }
    }

    const newMother: Mother = {
      id: "m-01",
      name: data.name,
      status: data.status as "pregnant" | "postpartum",
      language: language,
      ashaId: "a-01",
      phone: "+91 98765 43210",
      gestationalWeeks,
      postpartumDay,
      location: { x: 50, y: 50, label: "Demo Village" }
    };
    
    setMother(newMother);
    setScreen("complete");
  };

  const handleVoiceComplete = (checkIn: Partial<CheckIn>) => {
    setCurrentCheckIn(checkIn);
    setScreen("understanding");
  };

  const handleSubmitCheckIn = async () => {
    if (!currentCheckIn || !mother) return;

    await submitCheckIn({
      checkIn: currentCheckIn,
      mother,
    });

    setScreen("home");
  };

  // ASHA mode via URL param
  const urlParams = new URLSearchParams(window.location.search);
  const isAshaMode = urlParams.get("mode") === "asha";

  if (isAshaMode) {
    return (
      <ASHADashboardScreen
        onExitDemo={() => {
          window.location.href = "/";
        }}
      />
    );
  }

  return (
    <div
      className="min-h-full bg-cream flex justify-center relative"
      style={{ fontFamily: SANS }}
    >
      {/* Demo Switch Button */}
      {(screen === "home" || screen === "complete") && (
        <button
          onClick={() => {
            window.location.href = "?mode=asha";
          }}
          className="absolute top-4 right-4 z-[9999] bg-white border-2 border-teal text-teal px-6 py-3 rounded-lg text-base font-bold shadow-lg hover:bg-teal hover:text-white transition-colors cursor-pointer"
        >
          Open ASHA Dashboard
        </button>
      )}

      <div
        className="relative w-full bg-cream overflow-hidden flex flex-col shadow-2xl ring-1 ring-black/5"
        style={{ maxWidth: 430, minHeight: "100svh" }}
      >
        {screen === "welcome" && (
          <WelcomeScreen
            onContinue={() => setScreen("language")}
            onDemo={() => {
              setLanguage("hi");
              setScreen("language");
            }}
            language="en"
          />
        )}

        {screen === "language" && (
          <LanguageScreen
            languages={LANGUAGES}
            selectedLang={language}
            onSelect={setLanguage}
            onContinue={() => setScreen("onboarding")}
            onBack={() => setScreen("welcome")}
          />
        )}

        {screen === "onboarding" && (
          <OnboardingScreen
            onContinue={handleOnboardingComplete}
            onBack={() => setScreen("language")}
            language={language}
            languages={LANGUAGES}
          />
        )}

        {screen === "complete" && mother && (
          <CompleteScreen
            motherData={{ name: mother.name, status: mother.status, date: "" }}
            language={language}
            languages={LANGUAGES}
            onContinue={() => setScreen("home")}
          />
        )}

        {screen === "home" && mother && (
          <HomeScreen
            motherData={{ name: mother.name, status: mother.status, date: "" }}
            language={language}
            onVoiceCheckIn={() => {
              setForceTapMode(false);
              setScreen("voice");
            }}
          />
        )}

        {screen === "voice" && (
          <VoiceCheckInScreen
            language={language}
            initialTapMode={forceTapMode}
            onBack={() => setScreen("home")}
            onComplete={handleVoiceComplete}
          />
        )}

        {screen === "understanding" && currentCheckIn && (
          <UnderstandingScreen
            language={language}
            checkIn={currentCheckIn as CheckIn}
            onConfirm={() => setScreen("checkin-confirm")}
            onRetry={() => {
              setForceTapMode(false);
              setScreen("voice");
            }}
            onTapFallback={() => {
              setForceTapMode(true);
              setScreen("voice");
            }}
          />
        )}

        {screen === "checkin-confirm" && currentCheckIn && (
          <CheckInConfirmationScreen
            language={language}
            checkIn={currentCheckIn as CheckIn}
            onSubmit={handleSubmitCheckIn}
            onBack={() => setScreen("understanding")}
            isSubmitting={isAnalyzing}
          />
        )}
      </div>
    </div>
  );
}
