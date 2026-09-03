import { useState } from "react";
import { useDatabase } from "../../hooks/useDatabase";
import { ASHAHeader } from "../asha/ASHAHeader";
import { AreaMap } from "../asha/AreaMap";
import { MotherListItem } from "../asha/MotherListItem";
import { MotherDetailPanel } from "../asha/MotherDetailPanel";
import { AshaActionType } from "../../types/asha";

export function ASHADashboardScreen({ onExitDemo }: { onExitDemo: () => void }) {
  const { db, tick } = useDatabase();
  const asha = db.getAsha();
  const mothers = db.getMothers();
  const [selectedMotherId, setSelectedMotherId] = useState<string | null>(null);

  if (!asha) return <div>Loading...</div>;

  const checkIns = db.getCheckIns();

  const getLatestCheckIn = (motherId: string) => {
    return checkIns
      .filter((c) => c.motherId === motherId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  };

  const sortedMothers = [...mothers].sort((a, b) => {
    const aLatest = getLatestCheckIn(a.id);
    const bLatest = getLatestCheckIn(b.id);
    if (aLatest?.priority?.level === "review" && bLatest?.priority?.level !== "review") return -1;
    if (bLatest?.priority?.level === "review" && aLatest?.priority?.level !== "review") return 1;
    if (aLatest?.priority?.level === "follow_up" && bLatest?.priority?.level !== "follow_up") return -1;
    if (bLatest?.priority?.level === "follow_up" && aLatest?.priority?.level !== "follow_up") return 1;
    return 0;
  });

  const selectedMother = mothers.find((m) => m.id === selectedMotherId) || null;
  const selectedMotherCheckIns = selectedMother ? checkIns.filter(c => c.motherId === selectedMother.id) : [];
  const selectedMotherActions = selectedMother ? db.getActions(selectedMother.id) : [];

  const handleRecordAction = (motherId: string, type: AshaActionType, note: string) => {
    db.saveAction({ motherId, type, note });
  };

  const mothersRequiringReview = mothers.filter(m => getLatestCheckIn(m.id)?.priority?.level === "review").length;

  if (selectedMotherId) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex flex-col font-sans">
        <ASHAHeader asha={asha} onExitDemo={onExitDemo} />
        <main className="flex-1 p-8 max-w-4xl mx-auto w-full">
          <button 
            onClick={() => setSelectedMotherId(null)}
            className="mb-6 text-teal font-medium flex items-center gap-2 hover:underline"
          >
            &larr; Back to Dashboard
          </button>
          <MotherDetailPanel 
            mother={selectedMother}
            checkIns={selectedMotherCheckIns}
            actions={selectedMotherActions}
            onRecordAction={handleRecordAction}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] flex flex-col font-sans">
      <ASHAHeader asha={asha} onExitDemo={onExitDemo} />
      
      <div className="bg-white border-b border-teal/10 px-8 py-2.5 text-[11px] text-foreground font-semibold flex gap-3 uppercase tracking-wider items-center">
        <span className="text-teal/70">SHIVAPUR SUMMARY</span>
        <span className="w-1 h-1 rounded-full bg-teal/20"></span>
        <span>{mothers.length} Mothers Assigned</span>
        <span className="w-1 h-1 rounded-full bg-teal/20"></span>
        <span className={mothersRequiringReview > 0 ? "text-coral" : ""}>{mothersRequiringReview} Need Attention</span>
        <span className="w-1 h-1 rounded-full bg-teal/20"></span>
        <span className="text-yellow-600">1 Visit Overdue</span>
        <span className="w-1 h-1 rounded-full bg-teal/20"></span>
        <span>2 Visits Completed This Week</span>
      </div>

      <main className="flex-1 p-8 grid grid-cols-12 gap-10 max-w-[1440px] mx-auto w-full">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
          <div>
            <div className="flex justify-between items-end mb-1">
              <h2 className="text-2xl font-semibold text-foreground">Mother Priority Register</h2>
              <span className="text-teal text-sm font-medium bg-teal/10 px-3 py-1 rounded-full">{mothers.length} Active Profiles</span>
            </div>
            <p className="text-sm text-foreground/50">Sorted by clinical urgency · Action items compiled by MaaMitra AI</p>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            {sortedMothers.map((mother) => (
              <MotherListItem
                key={mother.id}
                mother={mother}
                latestCheckIn={getLatestCheckIn(mother.id)}
                isSelected={false}
                onClick={() => setSelectedMotherId(mother.id)}
              />
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-foreground">Shivapur Area Map</h3>
            <div className="h-64 rounded-xl overflow-hidden border border-teal/15 shadow-sm bg-white relative">
              <AreaMap 
                mothers={mothers} 
                checkIns={checkIns} 
                selectedMotherId={null}
                onSelectMother={setSelectedMotherId}
              />
            </div>
            <p className="text-xs text-foreground/50">Approximate locations · Used to help plan visits, not live tracking.</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Activity Log</h3>
            <div className="bg-white border border-teal/10 rounded-xl p-5 shadow-sm flex flex-col gap-5">
              <div className="flex gap-4">
                <div className="w-16 text-xs text-foreground/50 text-right pt-1 shrink-0">Today<br/>10:42 AM</div>
                <div className="flex-1 pb-4 border-b border-teal/10 relative">
                  <div className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-coral"></div>
                  <p className="text-sm font-medium text-foreground">Voice check-in · Priya Sharma</p>
                  <p className="text-sm text-foreground/70 mt-0.5">Severe headache reported since yesterday.</p>
                  <p className="text-xs text-teal font-medium mt-1">Mother confirmed ✓</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-16 text-xs text-foreground/50 text-right pt-1 shrink-0">Yesterday<br/>4:15 PM</div>
                <div className="flex-1 pb-4 border-b border-teal/10 relative">
                  <div className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-yellow-500"></div>
                  <p className="text-sm font-medium text-foreground">ASHA follow-up · Anjali Verma</p>
                  <p className="text-sm text-foreground/70 mt-0.5">Routine follow-up due.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-16 text-xs text-foreground/50 text-right pt-1 shrink-0">2 days ago<br/>9:00 AM</div>
                <div className="flex-1 pb-4 border-b border-teal/10 relative">
                  <div className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-teal/40"></div>
                  <p className="text-sm font-medium text-foreground">Check-in · Kavita Singh</p>
                  <p className="text-sm text-foreground/70 mt-0.5">Routine postpartum recovery.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-16 text-xs text-foreground/50 text-right pt-1 shrink-0">3 days ago<br/>2:30 PM</div>
                <div className="flex-1 relative">
                  <div className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-teal/40"></div>
                  <p className="text-sm font-medium text-foreground">Visit recorded · Meena Kumari</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
