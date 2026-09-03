import { Observation, PrioritySignal } from "../../types/checkIn";

const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-3-5-sonnet-20241022";

const SYSTEM_PROMPT = `You are a clinical decision-support assistant for ASHA (Accredited Social Health Activist) workers in India. You analyze maternal health check-in reports from pregnant and postpartum women and determine clinical priority.

You will receive a list of observations reported by a mother via voice check-in. These may be in any Indian language — evaluate the clinical meaning regardless of language.

Your job is to classify the urgency and provide a brief, actionable reason for the ASHA worker.

Respond ONLY with valid JSON in this exact format:
{
  "level": "review" | "follow_up" | "routine",
  "reason": "<one concise English sentence for the ASHA worker>"
}

Priority levels:
- "review": Requires immediate ASHA attention today. Use for: severe headache, visual disturbances, swelling in face/hands/feet, heavy bleeding, fever >38°C, reduced fetal movement, chest pain, difficulty breathing, signs of postpartum depression/psychosis, or any combination of warning signs.
- "follow_up": Needs follow-up within 1-2 days. Use for: mild persistent symptoms, missed medications, nutrition concerns, moderate pain, emotional distress without crisis.
- "routine": Regular check-in with no concerning symptoms. Use for: normal progress updates, minor expected discomforts.

Be conservative — when in doubt, escalate. A missed pre-eclampsia case is far worse than an unnecessary follow-up.

Examples of "review" cases:
- Severe headache + swelling → possible pre-eclampsia
- Heavy bleeding postpartum → haemorrhage risk  
- Reduced fetal movement → fetal distress
- Chest pain + breathlessness → cardiac concern

Keep the reason under 12 words, written for a frontline health worker, not a doctor.`;

export async function analyzeCheckIn(
  observations: Observation[],
  transcriptText?: string,
  motherStatus?: "pregnant" | "postpartum",
  gestationalWeeks?: number,
  postpartumDay?: number
): Promise<PrioritySignal> {
  // Build context string
  const contextParts: string[] = [];

  if (motherStatus === "pregnant" && gestationalWeeks) {
    contextParts.push(`Mother is ${gestationalWeeks} weeks pregnant.`);
  } else if (motherStatus === "postpartum" && postpartumDay) {
    contextParts.push(`Mother is on postpartum day ${postpartumDay}.`);
  }

  if (transcriptText) {
    contextParts.push(`Voice transcript: "${transcriptText}"`);
  }

  const observationList = observations
    .map((o) => `- ${o.label} (${o.type})`)
    .join("\n");

  const userMessage = `${contextParts.join(" ")}

Reported observations:
${observationList}

Classify the priority and provide a reason for the ASHA worker.`;

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.VITE_ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 150,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      console.error("Risk engine API error:", response.status);
      return fallbackRisk(observations);
    }

    const data = await response.json();
    const raw = data.content?.[0]?.text ?? "";

    // Strip any markdown fences
    const clean = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    if (
      parsed.level &&
      ["review", "follow_up", "routine"].includes(parsed.level) &&
      typeof parsed.reason === "string"
    ) {
      return { level: parsed.level, reason: parsed.reason };
    }

    return fallbackRisk(observations);
  } catch (err) {
    console.error("Risk engine error:", err);
    return fallbackRisk(observations);
  }
}

/**
 * Keyword-based fallback if Claude API is unavailable.
 * Covers the most critical red flags for demo reliability.
 */
function fallbackRisk(observations: Observation[]): PrioritySignal {
  const text = observations
    .map((o) => o.label.toLowerCase())
    .join(" ");

  // Pre-eclampsia / severe warning signs
  const redFlags = [
    "headache", "सिर दर्द", "डोकेदुखी", "தலைவலி", "తలనొప్పి",
    "swelling", "सूजन", "सूज", "வீக்கம்", "వాపు",
    "bleed", "रक्तस्राव", "bleeding",
    "vision", "दृष्टि",
    "fetal", "movement", "हलचल",
    "chest", "छाती",
    "breath", "सांस",
    "fever", "बुखार", "ताप",
    "unconscious", "बेहोश",
  ];

  const followUpFlags = [
    "pain", "दर्द", "नोव",
    "tired", "थकान", "थकावट",
    "nausea", "उल्टी", "मतली",
    "appetite", "भूख",
    "sad", "crying", "रोना", "उदास",
  ];

  if (redFlags.some((flag) => text.includes(flag))) {
    return {
      level: "review",
      reason: "Reported symptoms may indicate urgent condition — review today.",
    };
  }

  if (followUpFlags.some((flag) => text.includes(flag))) {
    return {
      level: "follow_up",
      reason: "Mild symptoms reported — follow up within 1–2 days.",
    };
  }

  return {
    level: "routine",
    reason: "Routine check-in with no concerning symptoms.",
  };
}
