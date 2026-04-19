"use client";

import Image from "next/image";
import { useState } from "react";
import { List } from "lucide-react";
import { characters as allCharactersData } from "@/data/characters";
import { universeLoreData } from "@/data/universe-lore";
import { getAssetPath } from "@/lib/utils";
import CharacterDetailsDrawer from "@/components/displays/CharacterDetailsDrawer";
import { Character } from "@/types";
import { motion, AnimatePresence } from "motion/react";

export function TierListMaker() {
  const [selectedLoreChar, setSelectedLoreChar] = useState<Character | null>(null);
  const [withGear, setWithGear] = useState(false);
  const [withPrep, setWithPrep] = useState(false);

  const tiers: { id: string; color: string; min: number; max: number }[] = [
    { id: 'S', color: 'bg-red-500 text-red-950', min: 6000, max: 99999 },
    { id: 'A', color: 'bg-orange-500 text-orange-950', min: 3000, max: 5999 },
    { id: 'B', color: 'bg-yellow-500 text-yellow-950', min: 1000, max: 2999 },
    { id: 'C', color: 'bg-green-500 text-green-950', min: 300, max: 999 },
    { id: 'D', color: 'bg-blue-500 text-blue-950', min: 0, max: 299 },
  ];

  const getCharsByTier = (min: number, max: number) => {
    return allCharactersData
      .filter(c => universeLoreData[c.universe]?.active !== false)
      .map(c => ({
        ...c,
        computedPower: c.powerScore + (withGear ? (c.gearBonus || 0) : 0) + (withPrep ? (c.prepBonus || 0) : 0)
      }))
      .filter(c => c.computedPower >= min && c.computedPower <= max)
      .sort((a, b) => b.computedPower - a.computedPower);
  };

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/40 rounded-[2rem] p-6 lg:col-span-2">
      <div className="flex items-center gap-3 mb-6">
        <List className="text-zinc-400" />
        <h3 className="text-xl font-black uppercase tracking-wider text-white">Canonical Tier List</h3>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <p className="text-zinc-500 text-xs uppercase tracking-widest max-w-lg">
          The definitive multiverse power hierarchy. Click an avatar to view their expanded lore and origins.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setWithGear(!withGear)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border ${
              withGear 
                ? "bg-amber-500 border-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]" 
                : "bg-black text-zinc-500 border-zinc-700 hover:text-white"
            }`}
          >
            With Gear
          </button>
          <button
            onClick={() => setWithPrep(!withPrep)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border ${
              withPrep 
                ? "bg-blue-500 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]" 
                : "bg-black text-zinc-500 border-zinc-700 hover:text-white"
            }`}
          >
            With Prep
          </button>
        </div>
      </div>

      {/* Tier Board */}
      <div className="flex flex-col gap-2 bg-black/50 p-2 rounded-xl">
        {tiers.map((t) => (
          <div key={t.id} className="flex min-h-[120px] bg-zinc-900 border border-zinc-800 rounded-lg">
            <div className={`w-16 md:w-20 flex items-center justify-center font-black text-3xl md:text-4xl rounded-l-lg ${t.color}`}>
              {t.id}
            </div>
            <div className="flex-1 p-4 flex flex-wrap gap-4 items-center min-h-[120px]">
              <AnimatePresence>
                 {getCharsByTier(t.min, t.max).map(c => (
                   <motion.div
                     layout
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.8 }}
                     transition={{ duration: 0.3 }}
                     key={c.id}
                     onClick={() => setSelectedLoreChar(c)}
                     className="relative group cursor-pointer hover:z-50"
                   >
                     <div className="relative w-16 h-16 md:w-24 md:h-24 flex-shrink-0 transition-transform">
                       <Image 
                         src={getAssetPath(c.previewUrl)} 
                         alt={c.name}
                         fill
                         className="rounded-full border-2 border-zinc-800 group-hover:border-white group-hover:scale-110 transition-all object-cover shadow-lg bg-zinc-800"
                       />
                     </div>
                     <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-zinc-700 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50 font-bold flex flex-col items-center pointer-events-none shadow-2xl">
                        <span>{c.name}</span>
                        <span className="text-zinc-400 font-mono">[{c.computedPower} PWR]</span>
                     </div>
                   </motion.div>
                 ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      <CharacterDetailsDrawer
        char={selectedLoreChar}
        onClose={() => setSelectedLoreChar(null)}
        withGear={withGear}
        setWithGear={setWithGear}
        withPrep={withPrep}
        setWithPrep={setWithPrep}
      />
    </div>
  );
}
