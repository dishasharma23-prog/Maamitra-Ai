import { Language } from "./index";

export type CheckInStatus =
  | "draft"
  | "transcribed"
  | "confirmed"
  | "submitted";

export type ObservationType =
  | "symptom"
  | "onset"
  | "duration"
  | "other";

export interface Observation {
  id: string;
  type: ObservationType;
  label: string;
}

export interface VoiceTranscript {
  transcript: string;
  language: string;
}

export interface PrioritySignal {
  level: "routine" | "follow_up" | "review";
  reason: string;
}

export interface CheckIn {
  id?: string;
  motherId?: string;
  transcript?: VoiceTranscript;
  observations: Observation[];
  status: CheckInStatus;
  createdAt: string;
  priority?: PrioritySignal;
}
