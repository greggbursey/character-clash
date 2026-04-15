"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
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

interface PowerMatrixProps {
  characters: CharStat[];
}

export function PowerMatrix({ characters }: PowerMatrixProps) {
  const [hoveredChar, setHoveredChar] = useState<CharStat | null>(null);

  const data = useMemo(() => {
    return characters.map((c) => {
      const total = Math.max(c.wins + c.losses, 1);
      const winRate = (c.wins / total) * 100;
      const powerScore = c.powerScore || 500;
      // Normalize powerScore. Let's assume max is 1000 for realistic scaling, though some might be higher (we cap for display)
      const normalizedPower = Math.min(Math.max(powerScore, 0), 1000) / 10; 
      
      const baseChar = baseCharacters.find(bc => bc.id === c.id);

      return {
        ...c,
        winRate,
        normalizedPower,
        previewUrl: baseChar?.previewUrl || "",
      };
    }).filter(c => c.wins + c.losses >= 5); // Only show characters with at least some battles for statistical relevance
  }, [characters]);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-[2rem] p-6 md:p-8 flex flex-col relative overflow-hidden group w-full">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      
      <div className="mb-6 z-10">
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-[0.1em] text-cyan-400 flex items-center gap-3">
          <span className="w-2 h-8 bg-cyan-500 rounded-full" />
          The Power Matrix
        </h3>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
          Lore Strength vs. Actual Win Rate (Min 5 Battles)
        </p>
      </div>

      <div className="relative w-full aspect-square md:aspect-[3/2] border-l-2 border-b-2 border-zinc-700/50 mt-4 rounded-bl-lg">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none">
           {[...Array(16)].map((_, i) => (
             <div key={i} className="border-t border-r border-zinc-800/30 border-dashed" />
           ))}
        </div>

        {/* Labels */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase font-bold tracking-widest text-zinc-500">
          Lore Power Score &rarr;
        </div>
        <div className="absolute top-1/2 -left-10 md:-left-12 -translate-y-1/2 -rotate-90 text-[10px] uppercase font-bold tracking-widest text-zinc-500 whitespace-nowrap">
          Actual Win Rate &rarr;
        </div>

        {/* Diagonal average line */}
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
          <svg className="w-full h-full opacity-20" preserveAspectRatio="none">
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>

        {/* Quadrant labels */}
        <div className="absolute top-4 left-4 text-[9px] font-mono text-zinc-600 uppercase">Giant Slayers</div>
        <div className="absolute top-4 right-4 text-[9px] font-mono text-cyan-600/50 uppercase">True Powerhouses</div>
        <div className="absolute bottom-4 left-4 text-[9px] font-mono text-zinc-700 uppercase">Fodder</div>
        <div className="absolute bottom-4 right-4 text-[9px] font-mono text-red-600/50 uppercase">Glass Cannons</div>

        {/* Data Points */}
        {data.map((char) => {
          // X is Power Score (0 to 100) -> left
          // Y is Win Rate (0 to 100) -> bottom to top
          return (
            <div
              key={char.id}
              className="absolute w-6 h-6 md:w-8 md:h-8 -translate-x-1/2 translate-y-1/2 cursor-pointer z-20 hover:z-30 transition-all duration-300 transform hover:scale-150"
              style={{
                left: `${char.normalizedPower}%`,
                bottom: `${char.winRate}%`,
              }}
              onMouseEnter={() => setHoveredChar(char as any)}
              onMouseLeave={() => setHoveredChar(null)}
            >
              <div 
                className="w-full h-full rounded-full border-2 overflow-hidden shadow-lg bg-zinc-900"
                style={{ borderColor: char.color }}
              >
                {char.previewUrl ? (
                  <Image src={getAssetPath(char.previewUrl)} alt={char.name} width={32} height={32} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-zinc-800" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tooltip Overlay */}
      {hoveredChar && (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-zinc-950/90 border border-zinc-800 p-4 rounded-2xl z-40 backdrop-blur-md shadow-2xl pointer-events-none min-w-[200px]">
          <div className="font-black text-white text-lg uppercase tracking-tight" style={{ color: hoveredChar.color }}>{hoveredChar.name}</div>
          <div className="text-[10px] font-mono text-zinc-400 uppercase">{hoveredChar.universe}</div>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500 font-bold uppercase">Record</span>
              <span className="text-white font-mono">{hoveredChar.wins}W - {hoveredChar.losses}L</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500 font-bold uppercase">Win Rate</span>
              <span className="text-green-400 font-mono font-bold">{Math.round((hoveredChar.wins / Math.max(hoveredChar.wins + hoveredChar.losses, 1)) * 100)}%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500 font-bold uppercase">Lore Power</span>
              <span className="text-cyan-400 font-mono font-bold">{hoveredChar.powerScore}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
