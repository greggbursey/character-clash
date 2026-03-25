"use client";

import { Flame } from "lucide-react";
import { motion } from "motion/react";

interface CharStat {
  id: string;
  name: string;
  wins: number;
  losses: number;
}

interface Props {
  characters: CharStat[];
}

export function WinStreaks({ characters }: Props) {
  // Mock streaks since streak field doesn't exist yet, but let's base it on win-loss diff
  const streaks = [...characters]
    .map(c => ({
      ...c,
      mockStreak: Math.max(0, Math.floor((c.wins - c.losses) * 0.5) + Math.floor(Math.random() * 3))
    }))
    .filter(c => c.mockStreak > 0)
    .sort((a, b) => b.mockStreak - a.mockStreak)
    .slice(0, 5);

  return (
     <div className="bg-zinc-900/30 border border-zinc-800/40 rounded-[2rem] p-6 h-full flex flex-col relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-all pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6 z-10">
            <Flame className="text-orange-500" />
            <h3 className="text-xl font-black uppercase tracking-wider text-white">Active Streaks</h3>
        </div>

        <div className="flex flex-col gap-3 z-10">
            {streaks.length > 0 ? (
                streaks.map((s, i) => (
                    <div key={s.id} className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-3">
                        <div className="w-8 font-black text-zinc-600 text-lg">#{i+1}</div>
                        <div className="flex-1 font-bold text-white uppercase tracking-tight text-sm">{s.name}</div>
                        <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
                            <Flame size={12} className="text-orange-500 fill-orange-500 hidden md:block" />
                            <span className="font-mono text-orange-400 font-bold text-xs uppercase tracking-widest">{s.mockStreak} WINS</span>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-zinc-600 font-mono text-sm text-center py-8">
                    No active blazing streaks right now.
                </div>
            )}
        </div>
     </div>
  );
}
