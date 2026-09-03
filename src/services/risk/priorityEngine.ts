import { Observation, PrioritySignal } from "../../types/checkIn";
import { t } from "../../core/i18n/translations";
import { Language } from "../../types";

export function evaluatePriority(observations: Observation[], language: Language): PrioritySignal {
  let hasReview = false;
  let reason = "";

  for (const obs of observations) {
    const labelLower = obs.label.toLowerCase();
    // Deterministic rules based ONLY on demo cases:
    if (
      labelLower.includes("headache") ||
      labelLower.includes("सिर दर्द") ||
      labelLower.includes("fever") ||
      labelLower.includes("बुखार")
    ) {
      hasReview = true;
      // In a real app we'd localize the reason, but for the dashboard (usually in local language or English)
      // we'll keep it simple: "Reported: [Symptom]"
      reason = `Mother reported: ${obs.label}`;
      break;
    }
  }

  if (hasReview) {
    return {
      level: "review",
      reason: reason || "Observation required review.",
    };
  }

  return {
    level: "routine",
    reason: "No concerning observations reported.",
  };
}
