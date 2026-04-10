"use client";

import Image from "next/image";
import { BookOpen, ChevronDown, GitMerge, History, Scroll, MapPin } from "lucide-react";
import { characters as allCharactersData } from "@/data/characters";
import { getAssetPath } from "@/lib/utils";
import { universeLoreData } from "@/data/universe-lore";

interface UniverseInfoProps {
  selectedUniverse: string;
  onUniverseChange: (universe: string) => void;
}

export function UniverseArchivesHeader({ selectedUniverse, onUniverseChange }: UniverseInfoProps) {
  const universes = Object.keys(universeLoreData)
    .filter(u => universeLoreData[u].active !== false)
    .sort();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 z-10 relative px-4 md:px-0">
       <div className="flex items-center gap-4">
         <BookOpen className="text-blue-500 w-8 h-8" />
         <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white italic">Universe Archives</h3>
       </div>
       
       {/* Dropdown */}
       <div className="relative w-full md:w-64">
         <select 
            value={selectedUniverse}
            onChange={(e) => onUniverseChange(e.target.value)}
            className="w-full appearance-none bg-zinc-900 border border-zinc-700 text-white font-bold uppercase tracking-widest text-sm px-4 py-3 rounded-xl outline-none focus:border-blue-500 transition-colors cursor-pointer shadow-lg"
         >
           {universes.map(u => (
             <option key={u} value={u}>{u}</option>
           ))}
         </select>
         <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none w-4 h-4" />
       </div>
    </div>
  );
}

export function UniverseLore({ selectedUniverse }: { selectedUniverse: string }) {
  const lore = universeLoreData[selectedUniverse] || universeLoreData["DC"];

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-[2rem] p-6 lg:p-10 flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all pointer-events-none" />
      
      <div className="flex flex-col gap-8 z-10 relative">
        <div className="flex flex-col">
           <h4 className="text-sm font-bold text-blue-400 uppercase tracking-[0.2em] mb-4 border-b border-zinc-800 pb-2 flex items-center gap-2">
              <History className="w-4 h-4" />
              Origin & History
           </h4>
           <p className="text-zinc-300 leading-relaxed text-sm md:text-base selection:bg-blue-500/30">
              {lore.history}
           </p>
        </div>

        <div className="flex flex-col">
           <h4 className="text-sm font-bold text-purple-400 uppercase tracking-[0.2em] mb-4 border-b border-zinc-800 pb-2 flex items-center gap-2">
              <Scroll className="w-4 h-4" />
              Universal Lore
           </h4>
           <p className="text-zinc-400 leading-relaxed text-sm selection:bg-purple-500/30 italic">
              {lore.lore}
           </p>
        </div>

        <div className="flex flex-col">
           <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 border-b border-zinc-800 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Key Locations
           </h4>
           <div className="flex flex-wrap gap-2">
              {lore.keyLocations.map(loc => (
                <span key={loc} className="px-3 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-full text-[10px] uppercase tracking-widest font-mono text-zinc-400">
                  {loc}
                </span>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

export function UniverseHierarchy({ selectedUniverse }: { selectedUniverse: string }) {
  const rosterTree = allCharactersData
    .filter(c => c.universe === selectedUniverse)
    .sort((a, b) => b.powerScore - a.powerScore);

  return (
    <div className="flex flex-col bg-zinc-900/80 rounded-[2rem] p-6 border border-zinc-800/50 shadow-inner relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
      
      <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-2 z-10">
         <GitMerge className="w-4 h-4 rotate-90" />
         Power Hierarchy
      </h4>
      
      <div className="flex flex-col relative pl-4 border-l-2 border-zinc-800 ml-4 z-10">
           {rosterTree.map((char, index) => (
             <div key={char.id} className="relative flex items-center mb-6 last:mb-0 group/item">
                <div className="absolute -left-4 w-6 h-0.5 bg-zinc-800 group-hover/item:bg-blue-500/50 transition-colors" />
                
                <div className="bg-zinc-950 border border-zinc-800 p-2 pr-6 rounded-xl flex items-center gap-4 ml-6 hover:border-blue-500/50 hover:bg-zinc-900 transition-all cursor-default shadow-md relative group-hover/item:scale-105 origin-left w-full sm:w-auto">
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center font-black text-xs text-zinc-500 border-2 border-zinc-950 group-hover/item:bg-blue-500 group-hover/item:text-black transition-colors">
                       {index + 1}
                    </div>

                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image src={getAssetPath(char.previewUrl)} alt={char.name} fill className="rounded-lg object-cover border border-zinc-700 bg-zinc-800" />
                    </div>
                    <div className="flex flex-col">
                       <div className="font-black text-white uppercase tracking-tight text-[12px]">{char.name}</div>
                       <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400">{char.powerScore}</div>
                    </div>
                </div>
             </div>
           ))}
      </div>
    </div>
  );
}

export function UniverseInfo({ selectedUniverse, onUniverseChange }: UniverseInfoProps) {
  return (
    <div className="flex flex-col">
      <UniverseArchivesHeader selectedUniverse={selectedUniverse} onUniverseChange={onUniverseChange} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <UniverseLore selectedUniverse={selectedUniverse} />
        <UniverseHierarchy selectedUniverse={selectedUniverse} />
      </div>
    </div>
  );
}

