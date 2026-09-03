import { PrioritySignal } from "../../types/checkIn";

export function PriorityBadge({ priority }: { priority?: PrioritySignal }) {
  if (!priority) return null;

  const styles = {
    routine: "bg-teal/10 text-teal",
    follow_up: "bg-yellow-100 text-yellow-800",
    review: "bg-coral/10 text-coral",
  };

  const labels = {
    routine: "Routine",
    follow_up: "Follow-up",
    review: "Needs review",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[priority.level]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {labels[priority.level]}
    </span>
  );
}
