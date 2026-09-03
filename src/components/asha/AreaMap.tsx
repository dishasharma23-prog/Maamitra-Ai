import { Mother } from "../../types/mother";
import { CheckIn } from "../../types/checkIn";

export function AreaMap({
  mothers,
  checkIns,
  selectedMotherId,
  onSelectMother,
}: {
  mothers: Mother[];
  checkIns: CheckIn[];
  selectedMotherId: string | null;
  onSelectMother: (id: string) => void;
}) {
  const getPriorityColor = (motherId: string) => {
    const motherCheckIns = checkIns
      .filter((c) => c.motherId === motherId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    const latest = motherCheckIns[0];
    if (!latest?.priority) return "bg-teal";
    
    if (latest.priority.level === "review") return "bg-coral";
    if (latest.priority.level === "follow_up") return "bg-yellow-500";
    return "bg-teal";
  };

  return (
    <div className="bg-white rounded-2xl border border-teal/10 p-4 shadow-sm flex flex-col h-full">
      <div className="mb-4">
        <h3 className="font-medium text-foreground">Approximate locations</h3>
        <p className="text-xs text-teal/60">Used to help plan visits. Not live tracking.</p>
      </div>
      
      <div className="relative flex-1 bg-cream rounded-xl overflow-hidden border border-teal/5 min-h-[300px]">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ backgroundImage: 'radial-gradient(#115e59 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        />
        
        {mothers.map((m) => {
          const isSelected = m.id === selectedMotherId;
          const color = getPriorityColor(m.id);
          return (
            <button
              key={m.id}
              onClick={() => onSelectMother(m.id)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${m.location.x}%`, top: `${m.location.y}%` }}
            >
              <div className={`w-4 h-4 rounded-full ${color} shadow-sm border-2 border-white transition-transform ${isSelected ? 'scale-150 ring-4 ring-teal/20' : 'hover:scale-125'}`} />
              <div className={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-medium bg-white/90 shadow-sm border border-teal/10 ${isSelected ? 'opacity-100 text-foreground' : 'opacity-0 group-hover:opacity-100 text-teal'}`}>
                {m.name}
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-teal/80">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-coral"></span> Needs review</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Follow-up</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal"></span> Routine</span>
      </div>
    </div>
  );
}
