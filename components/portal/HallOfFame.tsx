"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { ShieldAlert, ZapOff, Sparkles } from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import { characters as baseCharacters } from "@/data/characters";

interface CharStat {
  id: string;
  name: string;
  wins: number;
  losses: number;
  color: string;
  universe?: string;
  powerScore?: number;
}

interface HallOfFameProps {
  characters: CharStat[];
}

export function HallOfFame({ characters }: HallOfFameProps) {
  const accolades = useMemo(() => {
    const validChars = characters.filter(c => c.wins + c.losses >= 5).map(c => {
      const total = c.wins + c.losses;
      const winRate = (c.wins / total) * 100;
      const powerScore = c.powerScore || 500;
      const baseChar = baseCharacters.find(bc => bc.id === c.id);
      return { 
        ...c, 
        winRate, 
        total, 
        powerScore,
        previewUrl: baseChar?.previewUrl || "" 
      };
    });

    if (validChars.length === 0) return [];

    let giantSlayer = validChars[0];
    let glassCannon = validChars[0];
    let mostConsistent = validChars[0];

    // Giant Slayer: high win rate despite low power score
    // Score = winRate - (powerScore / 10)
    giantSlayer = validChars.reduce((prev, curr) => {
      const prevScore = prev.winRate - (prev.powerScore / 10);
      const currScore = curr.winRate - (curr.powerScore / 10);
      return currScore > prevScore ? curr : prev;
    });

    // Glass Cannon: low win rate despite high power score
    // Score = (powerScore / 10) - winRate
    glassCannon = validChars.reduce((prev, curr) => {
      const prevScore = (prev.powerScore / 10) - prev.winRate;
      const currScore = (curr.powerScore / 10) - curr.winRate;
      return currScore > prevScore ? curr : prev;
    });

    // Most Consistent: supreme win rate with high battle count
    // Score = winRate + Math.min(total, 50)
    mostConsistent = validChars.reduce((prev, curr) => {
      const prevScore = prev.winRate + Math.min(prev.total, 50);
      const currScore = curr.winRate + Math.min(curr.total, 50);
      return currScore > prevScore ? curr : prev;
    });

    return [
      {
        title: "The Giant Slayer",
        desc: "Overperforming their canon strength",
        char: giantSlayer,
        icon: <ShieldAlert className="text-emerald-500 w-6 h-6" />,
        theme: "emerald"
      },
      {
        title: "Glass Cannon",
        desc: "Underperforming their massive power",
        char: glassCannon,
        icon: <ZapOff className="text-red-500 w-6 h-6" />,
        theme: "red"
      },
      {
        title: "Most Consistent",
        desc: "Unstoppable track record",
        char: mostConsistent,
        icon: <Sparkles className="text-yellow-500 w-6 h-6" />,
        theme: "yellow"
      }
    ];

  }, [characters]);

  if (accolades.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 z-10 relative">
      {accolades.map((acc, i) => (
        <div key={i} className="bg-zinc-900/50 border border-zinc-800/80 rounded-[2rem] p-6 flex items-center gap-6 relative overflow-hidden group hover:bg-zinc-800/50 transition-colors">
          {/* Subtle Glow */}
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity bg-${acc.theme}-500`} />
          
          {/* Avatar */}
          <div 
             className="w-16 h-16 rounded-full border-2 overflow-hidden bg-zinc-950 flex-shrink-0 z-10"
             style={{ borderColor: acc.char.color }}
          >
             {acc.char.previewUrl && (
               <Image src={getAssetPath(acc.char.previewUrl)} alt={acc.char.name} width={64} height={64} className="w-full h-full object-cover" />
             )}
          </div>

          <div className="flex flex-col z-10 flex-1">
            <div className="flex items-center gap-2 mb-1">
              {acc.icon}
              <h4 className="text-white font-black uppercase tracking-tight text-sm md:text-base leading-none">
                {acc.title}
              </h4>
            </div>
            <p className="text-zinc-500 text-[9px] uppercase tracking-widest font-bold mb-2">
              {acc.desc}
            </p>
            <div className="text-white font-bold uppercase text-lg line-clamp-1" style={{ color: acc.char.color }}>
              {acc.char.name}
            </div>
            <div className="text-[10px] font-mono text-zinc-400">
              {Math.round(acc.char.winRate)}% Win Rate  |  {acc.char.powerScore} Power
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
