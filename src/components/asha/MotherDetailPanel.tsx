import { Mother } from "../../types/mother";
import { CheckIn } from "../../types/checkIn";
import { AshaAction, AshaActionType } from "../../types/asha";
import { PriorityBadge } from "./PriorityBadge";
import { useState } from "react";
import { PrimaryButton } from "../ui/PrimaryButton";
import { SecondaryButton } from "../ui/SecondaryButton";

export function MotherDetailPanel({
  mother,
  checkIns,
  actions,
  onRecordAction,
}: {
  mother: Mother | null;
  checkIns: CheckIn[];
  actions: AshaAction[];
  onRecordAction: (motherId: string, type: AshaActionType, note: string) => void;
}) {
  const [activeAction, setActiveAction] = useState<AshaActionType | null>(null);
  const [note, setNote] = useState("");

  if (!mother) {
    return (
      <div className="h-full flex items-center justify-center text-teal/60 bg-white/50 rounded-2xl border border-teal/10">
        <p>Select a mother to view details</p>
      </div>
    );
  }

  const latestCheckIn = checkIns[0];

  const handleActionSubmit = () => {
    if (activeAction) {
      onRecordAction(mother.id, activeAction, note);
      setActiveAction(null);
      setNote("");
    }
  };

  const timelineItems = [...checkIns.map(c => ({...c, _type: 'checkin'})), ...actions.map(a => ({...a, _type: 'action'}))]
    .sort((a, b) => {
      const timeA = new Date((a as any).createdAt || (a as any).timestamp).getTime();
      const timeB = new Date((b as any).createdAt || (b as any).timestamp).getTime();
      return timeB - timeA; // Descending
    });

  return (
    <div className="bg-white rounded-2xl border border-teal/10 shadow-sm flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-teal/10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-medium text-foreground mb-1">{mother.name}</h2>
            <p className="text-teal/80">
              {mother.status === "pregnant" ? `${mother.gestationalWeeks} weeks pregnant` : `Postpartum day ${mother.postpartumDay}`}
              {" • "}{mother.language === "hi" ? "Hindi" : "English"}
            </p>
          </div>
          {latestCheckIn?.priority && <PriorityBadge priority={latestCheckIn.priority} />}
        </div>
        
        {latestCheckIn?.priority?.level === "review" && (
          <div className="bg-coral/5 rounded-xl p-4 border border-coral/10 text-foreground">
            <h4 className="text-sm font-medium text-coral mb-1">Needs Review</h4>
            <p className="text-sm">{latestCheckIn.priority.reason}</p>
          </div>
        )}
      </div>

      {/* Action Panel */}
      <div className="p-6 border-b border-teal/10 bg-cream/30">
        <h3 className="text-sm font-medium text-foreground mb-3">Record Action</h3>
        
        {!activeAction ? (
          <div className="flex flex-wrap gap-2">
            <SecondaryButton onClick={() => setActiveAction("contact")}>Contact mother</SecondaryButton>
            <SecondaryButton onClick={() => setActiveAction("visit")}>Plan visit</SecondaryButton>
            <SecondaryButton onClick={() => setActiveAction("refer")}>Refer</SecondaryButton>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-teal capitalize">{activeAction} Recorded</p>
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a short note..."
              className="w-full rounded-lg border border-teal/20 p-3 text-sm text-foreground focus:outline-none focus:border-teal/50 bg-white"
              rows={2}
            />
            <div className="flex gap-2">
              <div className="flex-1">
                <PrimaryButton onClick={handleActionSubmit}>Save to timeline</PrimaryButton>
              </div>
              <div className="flex-1">
                <SecondaryButton onClick={() => { setActiveAction(null); setNote(""); }}>Cancel</SecondaryButton>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto p-6">
        <h3 className="text-sm font-medium text-foreground mb-6">Recent Activity</h3>
        <div className="flex flex-col gap-6 relative before:absolute before:inset-0 before:ml-[11px] before:w-px before:bg-teal/10">
          {timelineItems.map((item, i) => {
            const isAction = item._type === 'action';
            const date = new Date((item as any).createdAt || (item as any).timestamp).toLocaleString();
            
            return (
              <div key={i} className="relative pl-8">
                <div className={`absolute left-0 w-[23px] h-[23px] rounded-full border-4 border-white shadow-sm ${isAction ? 'bg-teal' : 'bg-coral'}`} />
                
                <div className="bg-cream/50 rounded-xl p-4 border border-teal/5">
                  <p className="text-xs text-teal/60 mb-2">{date}</p>
                  
                  {isAction ? (
                    <div>
                      <p className="text-sm font-medium text-foreground capitalize mb-1">{(item as AshaAction).type}</p>
                      <p className="text-sm text-foreground/80">{(item as AshaAction).note}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Voice Check-in</p>
                      <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
                        {(item as CheckIn).observations.map(obs => (
                          <li key={obs.id}>{obs.label}</li>
                        ))}
                      </ul>
                      {(item as CheckIn).transcript && (
                        <p className="text-xs text-teal mt-3 italic bg-white p-2 rounded">
                          "{(item as CheckIn).transcript?.transcript}"
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
