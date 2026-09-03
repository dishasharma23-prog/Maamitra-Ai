import { useState, useCallback } from "react";
import { CheckIn } from "../types/checkIn";
import { analyzeCheckIn } from "../services/risk/riskEngine";
import { Mother } from "../types/mother";
import { db } from "../services/store/localDb";

interface SubmitOptions {
  checkIn: Partial<CheckIn>;
  mother: Mother;
}

export function useCheckInSubmit() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const submitCheckIn = useCallback(
    async ({ checkIn, mother }: SubmitOptions): Promise<CheckIn> => {
      setIsAnalyzing(true);

      try {
        const priority = await analyzeCheckIn(
          checkIn.observations ?? [],
          checkIn.transcript?.transcript,
          mother.status,
          mother.gestationalWeeks,
          mother.postpartumDay
        );

        const finalCheckIn: CheckIn = {
          id: `checkin-${Date.now()}`,
          motherId: mother.id,
          observations: checkIn.observations ?? [],
          transcript: checkIn.transcript,
          status: "submitted",
          createdAt: checkIn.createdAt ?? new Date().toISOString(),
          priority,
        };

        db.saveCheckIn(finalCheckIn);
        window.dispatchEvent(new Event("db-updated"));

        return finalCheckIn;
      } finally {
        setIsAnalyzing(false);
      }
    },
    []
  );

  return { submitCheckIn, isAnalyzing };
}
