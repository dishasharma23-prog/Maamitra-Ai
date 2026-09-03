import { Observation } from "../../types/checkIn";
import { Language } from "../../types";
import { t } from "../../core/i18n/translations";

const SYMPTOM_KEYWORDS: Record<string, string[]> = {
  headache: [
    "headache", "सिर दर्द", "डोकेदुखी", "মাথাব্যথা", "తలనొప్పి", "தலைவலி", "ತಲೆನೋವು", "തലവേദന", "માથાનો દુખાવો", "ਸਿਰ ਦਰਦ", "सिरदर्द"
  ],
  fever: [
    "fever", "बुखार", "ताप", "জ্বর", "జ్వరం", "காய்ச்சல்", "ಜ್ವರ", "പനി", "તાવ"
  ],
  swelling: [
    "swelling", "सूजन", "सूज", "ফোলা", "వాపు", "வீக்கம்", "ಊತ", "വീക്കം", "સોજો", "ਸੋਜ"
  ],
  pain: [
    "pain", "दर्द", "वेदना", "ব্যথা", "నొప్పి", "வலி", "ನೋವು", "വേദന", "પીડા", "ਦਰਦ"
  ],
  bleeding: [
    "bleeding", "खून", "रक्तस्राव", "ರಕ್ತಸ್ರಾವ", "രക്തസ്രാവം", "રક્તસ્ત્રાવ", "ਖੂਨ"
  ]
};

export function extractSupportedObservations(transcript: string, language: Language): Observation[] {
  const observations: Observation[] = [];
  const lowerTranscript = transcript.toLowerCase();

  const addObservation = (key: string, label: string) => {
    observations.push({
      id: `obs-${Date.now()}-${key}`,
      type: "symptom",
      label,
    });
  };

  if (SYMPTOM_KEYWORDS.headache.some(k => lowerTranscript.includes(k))) {
    addObservation("headache", t(language, "headache"));
  }
  if (SYMPTOM_KEYWORDS.fever.some(k => lowerTranscript.includes(k))) {
    addObservation("fever", t(language, "fever"));
  }
  if (SYMPTOM_KEYWORDS.swelling.some(k => lowerTranscript.includes(k))) {
    addObservation("swelling", t(language, "swelling"));
  }
  if (SYMPTOM_KEYWORDS.pain.some(k => lowerTranscript.includes(k))) {
    // Avoid double counting if headache is already caught, but simple logic for demo
    if (!SYMPTOM_KEYWORDS.headache.some(k => lowerTranscript.includes(k))) {
      addObservation("pain", t(language, "pain"));
    }
  }
  if (SYMPTOM_KEYWORDS.bleeding.some(k => lowerTranscript.includes(k))) {
    addObservation("bleeding", "Bleeding / Blood loss"); // A generic severe flag
  }

  // If we couldn't confidently extract anything but there's a transcript,
  // we don't invent symptoms. The STT transcript is the primary source of truth.
  
  return observations;
}
