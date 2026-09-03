export interface AshaWorker {
  id: string;
  name: string;
  area: string;
  phone?: string;
  motherIds: string[];
}

export type AshaActionType = "contact" | "visit" | "refer";

export interface AshaAction {
  id: string;
  motherId: string;
  type: AshaActionType;
  note: string;
  timestamp: string;
}
