import { useState } from "react";
import { Mother } from "../../types/mother";
import { CheckIn } from "../../types/checkIn";
import { PriorityBadge } from "./PriorityBadge";

export function MotherListItem({
  mother,
  latestCheckIn,
  isSelected,
  onClick,
}: {
  mother: Mother;
  latestCheckIn?: CheckIn;
  isSelected: boolean;
  onClick: () => void;
}) {
  const [showCallModal, setShowCallModal] = useState(false);
  const statusLabel =
    mother.status === "pregnant"
      ? `${mother.gestationalWeeks} weeks pregnant`
      : `Postpartum day ${mother.postpartumDay}`;

  const priorityLevel = latestCheckIn?.priority?.level;
  
  let borderClass = "border-teal/15";
  if (priorityLevel === "review") borderClass = "border-coral";
  else if (priorityLevel === "follow_up") borderClass = "border-yellow-400";

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCallModal(true);
  };

  return (
    <>
      <div className={`w-full bg-white rounded-xl border ${borderClass} border-l-4 shadow-sm p-5 flex flex-col gap-3 transition-shadow hover:shadow-md`}>
        {/* Top Row: Name and Badge */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-foreground text-lg cursor-pointer hover:text-teal" onClick={onClick}>{mother.name}</h3>
          </div>
          {latestCheckIn?.priority ? (
            <PriorityBadge priority={latestCheckIn.priority} />
          ) : (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-teal/10 text-teal uppercase tracking-wider">
              Routine
            </span>
          )}
        </div>

        {/* Middle Content */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">Key Health Detail</p>
          <p className="text-sm font-medium text-foreground">
            {priorityLevel === "review" ? `Reported: ${latestCheckIn?.priority?.reason || "Severe symptoms."}` : 
            priorityLevel === "follow_up" ? `Reported: ${latestCheckIn?.priority?.reason || "Routine follow-up."}` : 
            "Routine monthly progress within healthy range."}
            {" - "} <span className="font-normal text-foreground/70">{statusLabel}.</span>
          </p>
        </div>

        {/* Footer Row: Metadata and Buttons */}
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-teal/10">
          <div className="flex items-center gap-4 text-xs text-foreground/60">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {mother.location.label}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Updated {latestCheckIn ? new Date(latestCheckIn.createdAt).toLocaleDateString() : "recently"} via check-in
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCall} 
              className="px-3 py-1.5 rounded-md border border-teal/20 text-xs font-medium text-teal hover:bg-teal/5 transition-colors flex items-center gap-1.5"
              title={mother.phone ? `Call ${mother.name}` : "No phone number on record"}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onClick(); }} 
              className="px-3 py-1.5 rounded-md bg-teal text-white text-xs font-medium hover:bg-teal-mid transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Plan Visit
            </button>
          </div>
        </div>
      </div>

      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 w-[320px] shadow-2xl relative">
            <button onClick={() => setShowCallModal(false)} className="absolute top-4 right-4 text-foreground/40 hover:text-foreground">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="relative">
              <div className="w-20 h-20 bg-teal text-white rounded-full flex items-center justify-center text-3xl font-bold z-10 relative">
                {mother.name.charAt(0)}
              </div>
              <div className="absolute inset-0 bg-teal/20 rounded-full animate-ping z-0 scale-150"></div>
            </div>
            
            <div className="text-center mt-2">
              <h3 className="text-lg font-bold text-foreground">Calling {mother.name}...</h3>
              <p className="text-teal font-medium mt-1">{mother.phone || "+91 98765 43210"}</p>
            </div>
            
            <button onClick={() => setShowCallModal(false)} className="mt-4 px-6 py-2.5 rounded-full bg-coral text-white font-medium hover:bg-red-600 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.516l2.257-1.13a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" /></svg>
              End Call
            </button>
          </div>
        </div>
      )}
    </>
  );
}


