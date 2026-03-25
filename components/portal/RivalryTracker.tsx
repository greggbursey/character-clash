"use client";

import { Swords } from "lucide-react";

export function RivalryTracker() {
  const rivalries = [
    { 
      p1: "Batman", p2: "Joker", p1Wins: 42, p2Wins: 18, p1Color: "#52525b", p2Color: "#a855f7",
      universe: "DC Comics",
      description: "An eternal struggle of order versus chaos. Batman refuses to break his one rule, while the Joker lives only to try and force his hand. The Dark Knight holds the overwhelming physical advantage (280 vs 70 power), but Joker's psychological warfare and unpredictable traps keep this rivalry alive."
    },
    { 
      p1: "Ryu", p2: "Ken", p1Wins: 55, p2Wins: 50, p1Color: "#ef4444", p2Color: "#dc2626",
      universe: "Street Fighter",
      description: "Two eternal brothers trained under the same master, Gouken. Ryu's relentless pursuit of the path of the true warrior contrasts heavily with Ken's fiery, passionate, and family-oriented fighting style. Their power scores are almost identical, making their sparring sessions legends within the franchise."
    },
    { 
      p1: "Scorpion", p2: "Sub-Zero", p1Wins: 88, p2Wins: 85, p1Color: "#eab308", p2Color: "#3b82f6",
      universe: "Mortal Kombat",
      description: "Born of fire and ice, this is arguably fighting gaming's most iconic rivalry. Stemming from the destruction of the Shirai Ryu clan by the Lin Kuei, Scorpion's vengeance fueled his hellfire. Sub-Zero's cryomancy is a deadly counter, leading to a perfectly balanced 500-power battle where either ninja can claim victory."
    },
    { 
      p1: "Luke Skywalker", p2: "Darth Vader", p1Wins: 4, p2Wins: 3, p1Color: "#10b981", p2Color: "#ef4444",
      universe: "Star Wars",
      description: "The classic tragedy of the Skywalker lineage. A battle not just of lightsabers, but for the soul of Anakin Skywalker. Vader's brutal rage and cybernetic strength (640) initially overpowered young Luke, but as the son embraced the light side of the Force (650), the scales finally tipped on the Death Star."
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {rivalries.map((r, i) => {
        const total = Math.max(r.p1Wins + r.p2Wins, 1);
        const p1Pct = (r.p1Wins / total) * 100;
        
        return (
           <div key={i} className="bg-zinc-900/30 border border-zinc-800/60 rounded-3xl p-6 lg:p-8 flex flex-col hover:border-blue-500/20 transition-all group">
              
              {/* Header section */}
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                 <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-800 px-2 py-1 rounded-md mb-2 inline-block">
                      {r.universe}
                    </span>
                    <div className="flex items-center gap-4 text-xl md:text-2xl font-black uppercase tracking-tighter">
                       <span style={{ color: r.p1Color }}>{r.p1}</span>
                       <Swords className="text-zinc-700 w-5 h-5" />
                       <span style={{ color: r.p2Color }}>{r.p2}</span>
                    </div>
                 </div>
                 
                 {/* Bar & Stats */}
                 <div className="flex flex-col w-full md:w-64 gap-2">
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-widest">
                        <span style={{ color: r.p1Color }}>{r.p1Wins} WINS</span>
                        <span style={{ color: r.p2Color }}>{r.p2Wins} WINS</span>
                    </div>
                    <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden flex shadow-inner">
                        <div 
                            className="h-full transition-all" 
                            style={{ width: `${p1Pct}%`, backgroundColor: r.p1Color }} 
                        />
                        <div 
                            className="h-full transition-all" 
                            style={{ width: `${100 - p1Pct}%`, backgroundColor: r.p2Color }} 
                        />
                    </div>
                 </div>
              </div>

              {/* Description */}
              <div className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-4xl border-l-2 border-zinc-800 pl-4 group-hover:border-blue-500/50 transition-colors">
                {r.description}
              </div>
           </div>
        );
      })}
    </div>
  );
}
