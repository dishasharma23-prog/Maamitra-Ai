import { useState, useRef, useCallback } from "react";

export type RecorderState = "ready" | "listening" | "processing" | "success" | "error";

export function useAudioRecorder(maxDurationMs = 30000) {
  const [state, setState] = useState<RecorderState>("ready");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<number | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const options = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? { mimeType: 'audio/webm;codecs=opus' }
        : {}; // fallback

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.start();
      setState("listening");
      setErrorMsg(null);

      timerRef.current = window.setTimeout(() => {
        stopRecording();
      }, maxDurationMs);

    } catch (err) {
      console.error("Microphone access error:", err);
      setState("error");
      setErrorMsg("Microphone access is needed to use voice check-in.");
    }
  }, [maxDurationMs]);

  const stopRecording = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const mediaRecorder = mediaRecorderRef.current;
      
      if (!mediaRecorder || mediaRecorder.state === "inactive") {
        resolve(null);
        return;
      }

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      mediaRecorder.onstop = () => {
        // Release tracks
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
        
        if (chunksRef.current.length === 0) {
          resolve(null);
          return;
        }
        
        const blob = new Blob(chunksRef.current, {
          type: mediaRecorder.mimeType || 'audio/webm',
        });
        resolve(blob);
      };

      mediaRecorder.stop();
      setState("processing");
    });
  }, []);

  const reset = useCallback(() => {
    setState("ready");
    setErrorMsg(null);
    chunksRef.current = [];
  }, []);

  const setError = useCallback((msg: string) => {
    setState("error");
    setErrorMsg(msg);
  }, []);

  return {
    state,
    errorMsg,
    startRecording,
    stopRecording,
    reset,
    setError,
  };
}
