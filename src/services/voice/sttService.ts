import { Language } from "../../types";
import { STT_LANGUAGE_MAP } from "../../core/i18n/languageMap";

export interface TranscriptionResult {
  transcript: string;
  language: Language;
}

export async function transcribeAudio(audioBlob: Blob, language: Language): Promise<TranscriptionResult> {
  const formData = new FormData();
  formData.append("file", audioBlob, "recording.webm");
  
  // Use the canonical language mapping
  const mappedLanguageCode = STT_LANGUAGE_MAP[language] || "en-IN";
  formData.append("language", language); // keep for the server to echo back if needed
  formData.append("language_code", mappedLanguageCode); // explicit BCP-47 for Sarvam

  const response = await fetch("/api/voice/transcribe", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to transcribe audio");
  }

  const data = await response.json();
  return {
    transcript: data.transcript,
    language: data.language as Language,
  };
}
