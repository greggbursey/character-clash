"use client";

import { ShieldAlert } from "lucide-react";
import { useMemo } from "react";

interface CharStat {
  id: string;
  name: string;
  wins: number;
  losses: number;
  powerScore?: number;
}

interface Props {
  characters: CharStat[];
}

export function UnderdogOfTheWeek({ characters }: Props) {
  // Find highest win count among char with power < 400
  const underdog = useMemo(() => {
    const valid = characters.filter(c => (c.powerScore || 500) < 400);
    if (valid.length === 0) return null;
    return valid.sort((a, b) => b.wins - a.wins)[0];
  }, [characters]);

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/40 rounded-[2rem] p-6 h-full flex flex-col items-center justify-center text-center relative group overflow-hidden min-h-[250px]">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none transition-all group-hover:bg-blue-500/20" />
       
       <ShieldAlert className="text-blue-500 w-12 h-12 mb-4" />
       <h3 className="text-xl font-black uppercase tracking-wider text-white mb-2">Underdog of the Week</h3>
       <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-6">Top Fighter Under 400 Power</p>
       
       {underdog ? (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 w-full max-w-[250px]">
             <h4 className="font-black text-2xl text-blue-400 uppercase tracking-tight mb-2 line-clamp-1">{underdog.name}</h4>
             <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-zinc-400">
                <span>Power: <span className="text-white font-bold">{underdog.powerScore}</span></span>
                <span>Wins: <span className="text-green-400 font-bold">{underdog.wins}</span></span>
             </div>
          </div>
       ) : (
          <p className="text-sm font-mono text-zinc-600">Calculating underdog stats...</p>
       )}
    </div>
  );
}
