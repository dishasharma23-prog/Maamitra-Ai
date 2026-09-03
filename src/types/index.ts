export type Screen = "welcome" | "language" | "onboarding" | "complete" | "home" | "voice" | "understanding" | "checkin-confirm" | "asha-dashboard" | "debug-asha";
export type Status = "pregnant" | "postpartum" | null;
export type Language = "en" | "hi" | "mr" | "bn" | "te" | "ta" | "kn" | "ml" | "gu" | "pa";

export interface MotherData {
  name: string;
  status: Status;
  date: string;
}

export interface LanguageDef {
  code: Language;
  native: string;
  label: string;
}
