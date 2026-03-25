"use client";

import Image from "next/image";
import { useState } from "react";
import { List } from "lucide-react";
import { characters as allCharactersData } from "@/data/characters";
import { getAssetPath } from "@/lib/utils";
import LoreModal from "@/components/ui/LoreModal";
import { Character } from "@/types";

export function TierListMaker() {
  const [selectedLoreChar, setSelectedLoreChar] = useState<Character | null>(null);

  const tiers: { id: string; color: string; min: number; max: number }[] = [
    { id: 'S', color: 'bg-red-500 text-red-950', min: 850, max: 1000 },
    { id: 'A', color: 'bg-orange-500 text-orange-950', min: 650, max: 849 },
    { id: 'B', color: 'bg-yellow-500 text-yellow-950', min: 450, max: 649 },
    { id: 'C', color: 'bg-green-500 text-green-950', min: 200, max: 449 },
    { id: 'D', color: 'bg-blue-500 text-blue-950', min: 0, max: 199 },
  ];

  const getCharsByTier = (min: number, max: number) => {
    return allCharactersData
      .filter(c => c.powerScore >= min && c.powerScore <= max)
      .sort((a, b) => b.powerScore - a.powerScore);
  };

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/40 rounded-[2rem] p-6 lg:col-span-2">
      <div className="flex items-center gap-3 mb-6">
        <List className="text-zinc-400" />
        <h3 className="text-xl font-black uppercase tracking-wider text-white">Canonical Tier List</h3>
      </div>
      <p className="text-zinc-500 text-xs mb-8 uppercase tracking-widest">
        The definitive multiverse power hierarchy. Click an avatar to view their expanded lore and origins.
      </p>

      {/* Tier Board */}
      <div className="flex flex-col gap-2 bg-black/50 p-2 rounded-xl">
        {tiers.map((t) => (
          <div key={t.id} className="flex min-h-[120px] bg-zinc-900 border border-zinc-800 rounded-lg">
            <div className={`w-16 md:w-20 flex items-center justify-center font-black text-3xl md:text-4xl rounded-l-lg ${t.color}`}>
              {t.id}
            </div>
            <div className="flex-1 p-4 flex flex-wrap gap-4 items-center min-h-[120px]">
                 {getCharsByTier(t.min, t.max).map(c => (
                   <div
                     key={c.id}
                     onClick={() => setSelectedLoreChar(c)}
                     className="relative group cursor-pointer"
                   >
                     <div className="relative w-24 h-24 flex-shrink-0 group-hover:scale-110 transition-transform">
                       <Image 
                         src={getAssetPath(c.previewUrl)} 
                         alt={c.name}
                         fill
                         className="rounded-full border-2 border-zinc-800 group-hover:border-white transition-all object-cover shadow-lg bg-zinc-800"
                       />
                     </div>
                     <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-zinc-700 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50 font-bold flex flex-col items-center pointer-events-none shadow-2xl">
                        <span>{c.name}</span>
                        <span className="text-zinc-400 font-mono">[{c.powerScore} PWR]</span>
                     </div>
                   </div>
                 ))}
            </div>
          </div>
        ))}
      </div>

      <LoreModal
        character={selectedLoreChar}
        onClose={() => setSelectedLoreChar(null)}
      />
    </div>
  );
}
