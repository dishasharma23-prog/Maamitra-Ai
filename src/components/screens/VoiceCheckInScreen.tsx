import { useState } from "react";
import { BackButton } from "../ui/BackButton";
import { PageHeading } from "../ui/PageHeading";
import { HelperText } from "../ui/HelperText";
import { MicrophoneButton } from "../ui/MicrophoneButton";
import { VoiceWaveform } from "../ui/VoiceWaveform";
import { t } from "../../core/i18n/translations";
import { Language } from "../../types";
import { transcribeAudio } from "../../services/voice/sttService";
import { extractSupportedObservations } from "../../services/observations/observationExtractor";
import { CheckIn } from "../../types/checkIn";
import { useAudioRecorder } from "../../hooks/useAudioRecorder";
import { PrimaryButton } from "../ui/PrimaryButton";

export function VoiceCheckInScreen({
  initialTapMode = false,
  language,
  onBack,
  onComplete,
}: {
  language: Language;
  initialTapMode?: boolean;
  onBack: () => void;
  onComplete: (checkIn: Partial<CheckIn>) => void;
}) {
  const { state, errorMsg, startRecording, stopRecording, reset, setError } = useAudioRecorder(30000);
  const [isTapMode, setIsTapMode] = useState(initialTapMode);
  const [tapStep, setTapStep] = useState<"initial" | "symptoms">("initial");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const handleMicClick = async () => {
    if (state === "ready" || state === "error") {
      reset();
      await startRecording();
    } else if (state === "listening") {
      handleStopAndProcess();
    }
  };

  const handleStopAndProcess = async () => {
    const audioBlob = await stopRecording();
    if (!audioBlob) {
      setError(t(language, "couldntHear"));
      return;
    }

    if (!navigator.onLine) {
      setError(t(language, "offlineMsg") + " - " + t(language, "offlineDetail"));
      return;
    }

    try {
      // FORCE REAL STT PIPELINE
      const result = await transcribeAudio(audioBlob, language);
      if (!result.transcript) {
        throw new Error("Empty transcript");
      }
      
      const observations = extractSupportedObservations(result.transcript, language);
      
      const checkIn: Partial<CheckIn> = {
        transcript: result,
        observations,
        status: "transcribed",
        createdAt: new Date().toISOString(),
      };

      onComplete(checkIn);

    } catch (err) {
      console.error("STT Error:", err);
      // Hard fallback message explicitly requested by prompt
      setError(t(language, "error") + " - " + t(language, "voiceTapInstead"));
    }
  };

  if (isTapMode) {
    const handleSymptomToggle = (symptom: string) => {
      setSelectedSymptoms(prev => 
        prev.includes(symptom) 
          ? prev.filter(s => s !== symptom)
          : [...prev, symptom]
      );
    };

    const submitTapFlow = (symptoms: string[]) => {
      const observations = symptoms.map(s => ({
        id: "tap-" + Date.now() + Math.random().toString(),
        type: "symptom" as const,
        label: s
      }));

      onComplete({
        transcript: { transcript: t(language, "submittedViaTap"), language: language, confidence: 1 },
        observations,
        status: "transcribed",
        createdAt: new Date().toISOString(),
      });
    };

    return (
      <div className="flex flex-col h-full bg-cream">
        <div className="px-6 pt-12 pb-4 flex-shrink-0 flex items-center justify-between">
           <BackButton onClick={() => {
             if (tapStep === "symptoms") setTapStep("initial");
             else setIsTapMode(false);
           }} label={t(language, "back")} />
           <span className="text-sm font-semibold text-teal tracking-widest uppercase">{t(language, "quickCheckin")}</span>
        </div>

        <div className="flex-1 px-6 pt-4 flex flex-col gap-6 overflow-y-auto">
          <PageHeading>{t(language, "tapCheckInHeading")}</PageHeading>

          {tapStep === "initial" && (
            <div className="flex flex-col gap-4 mt-6">
               <button 
                 onClick={() => submitTapFlow([t(language, "iFeelOkay")])}
                 className="p-4 rounded-xl border border-teal bg-white text-foreground text-left shadow-sm font-medium hover:bg-teal/5 transition-colors"
               >
                 {t(language, "iFeelOkay")}
               </button>
               <button 
                 onClick={() => setTapStep("symptoms")}
                 className="p-4 rounded-xl border border-coral/30 bg-white text-coral text-left shadow-sm font-medium hover:bg-coral/5 transition-colors"
               >
                 {t(language, "somethingWrongBtn")}
               </button>
            </div>
          )}

          {tapStep === "symptoms" && (
            <div className="flex flex-col gap-4">
              <HelperText>{t(language, "selectAllThatApply")}</HelperText>
              
              <div className="flex flex-col gap-3 mt-2">
                {[
                  t(language, "headache"), 
                  t(language, "fever"), 
                  t(language, "swelling"), 
                  t(language, "pain"), 
                  t(language, "troubleFeeding")
                ].map(sym => (
                  <label key={sym} className={"flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors " + (selectedSymptoms.includes(sym) ? "bg-teal/10 border-teal" : "bg-white border-teal/20 hover:border-teal/50")}>
                    <div className={"w-5 h-5 rounded border flex items-center justify-center " + (selectedSymptoms.includes(sym) ? "bg-teal border-teal" : "border-teal/30 bg-white")}>
                      {selectedSymptoms.includes(sym) && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <input type="checkbox" className="hidden" checked={selectedSymptoms.includes(sym)} onChange={() => handleSymptomToggle(sym)} />
                    <span className="font-medium text-foreground">{sym}</span>
                  </label>
                ))}
              </div>

              <div className="mt-8 mb-6">
                <PrimaryButton 
                  onClick={() => submitTapFlow(selectedSymptoms)}
                  disabled={selectedSymptoms.length === 0}
                >
                  {t(language, "continueBtn")}
                </PrimaryButton>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-12 pb-4 flex-shrink-0 flex flex-col gap-5">
        {(state === "ready" || state === "error") ? (
          <BackButton onClick={onBack} label={t(language, "back")} />
        ) : (
          <div className="h-11" />
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-12 pb-20">
        <div className="flex flex-col gap-3 text-center">
          <PageHeading>{t(language, "voiceHeading")}</PageHeading>
          <HelperText centered>{t(language, "voiceSupport")}</HelperText>
        </div>

        <div className="flex flex-col items-center gap-8 my-8">
          <VoiceWaveform active={state === "listening" || state === "processing"} />
          
          <MicrophoneButton 
            onClick={handleMicClick} 
            state={state as any} 
          />

          <div className="min-h-12 flex flex-col items-center justify-start text-center">
            <p className={`text-sm font-medium transition-opacity ${state === "processing" ? "text-teal animate-pulse" : "text-foreground/60"}`}>
              {state === "ready" && t(language, "voiceReady")}
              {state === "listening" && t(language, "voiceListening")}
              {state === "processing" && t(language, "voiceProcessing")}
              {state === "success" && t(language, "done")}
            </p>
            {state === "error" && (
              <div className="flex flex-col items-center gap-4 mt-2">
                <p className="text-sm font-medium text-coral max-w-[250px] leading-relaxed">
                  {errorMsg || t(language, "couldntHear")}
                </p>
                <PrimaryButton onClick={reset}>
                  {t(language, "tryAgain")}
                </PrimaryButton>
              </div>
            )}
          </div>
        </div>

        {(state === "ready" || state === "error") && (
          <button
            onClick={() => setIsTapMode(true)}
            className="text-sm font-medium text-teal/60 underline underline-offset-4 hover:text-teal transition-colors"
          >
            {t(language, "voiceTapInstead")}
          </button>
        )}
      </div>
    </div>
  );
}


