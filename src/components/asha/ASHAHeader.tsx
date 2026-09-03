import { AshaWorker } from "../../types/asha";

export function ASHAHeader({ asha, onExitDemo }: { asha: AshaWorker; onExitDemo: () => void }) {
  return (
    <header className="bg-white border-b border-teal/10 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-teal tracking-tight">MaaMitra AI</h1>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-teal/10 text-teal uppercase tracking-widest border border-teal/20">
          Frontline Portal
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-sm text-foreground">{asha.name}</p>
          <p className="text-xs text-foreground/50">ASHA Worker · {asha.area} Area</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-bold shadow-sm cursor-pointer" onClick={onExitDemo} title="Exit Demo">
          {asha.name.charAt(0)}
        </div>
      </div>
    </header>
  );
}
