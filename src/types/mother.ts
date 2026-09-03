export type Language = "en" | "hi" | "mr" | "bn" | "te" | "ta" | "kn" | "ml" | "gu" | "pa";

export interface Mother {
  id: string;
  name: string;
  age?: number;
  status: "pregnant" | "postpartum";
  gestationalWeeks?: number;
  postpartumDay?: number;
  language: Language;
  ashaId: string;
  phone?: string;
  location: {
    x: number; // 0-100 percentage for the simple UI map
    y: number; // 0-100 percentage
    label: string;
  };
}
