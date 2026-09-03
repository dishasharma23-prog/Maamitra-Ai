import { Language } from "../../types";
import { CheckIn, VoiceTranscript, Observation } from "../../types/checkIn";
import { t } from "../../core/i18n/translations";

export async function processVoiceInput(language: Language): Promise<Partial<CheckIn>> {
  // Simulate network processing delay
  await new Promise((resolve) => setTimeout(resolve, 2500));

  let transcriptText = "";
  let obs1 = "";
  let obs2 = "";
  
  if (language === "hi") {
    transcriptText = "मुझे कल से बहुत तेज़ सिर दर्द हो रहा है।";
    obs1 = "तेज़ सिर दर्द";
    obs2 = "कल से शुरू हुआ";
  } else {
    // English or fallback
    transcriptText = "I have had a severe headache since yesterday.";
    obs1 = "Severe headache";
    obs2 = "Started yesterday";
  }

  const transcript: VoiceTranscript = {
    text: transcriptText,
    language,
  };

  const observations: Observation[] = [
    {
      id: "obs-1",
      type: "symptom",
      label: obs1,
    },
    {
      id: "obs-2",
      type: "onset",
      label: obs2,
    },
  ];

  return {
    transcript,
    observations,
    status: "transcribed",
    createdAt: new Date().toISOString(),
  };
}
