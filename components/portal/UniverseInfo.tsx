"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, GitMerge } from "lucide-react";
import { characters as allCharactersData } from "@/data/characters";

const universeBlurbs: Record<string, string> = {
  "DC": "Home to gods amongst men. The DC Universe is defined by legacy, symbols of hope, and crisis events that shatter reality itself. From the streets of Gotham to the skies of Metropolis, justice is upheld by immensely powerful beings.",
  "Marvel": "The world outside your window. Marvel's universe is built on flawed heroes, mutants, and cosmic entities fighting for the fate of reality. Science and magic collide to create champions that defend Earth from galactic threats.",
  "Mortal Kombat": "A brutal multiverse of realms constantly at war. Elder Gods oversee the eternal tournament designed to prevent realms from merging by force. Fighters from Earthrealm, Outworld, and the Netherrealm clash in fatal combat.",
  "Street Fighter": "A world defined by the pursuit of strength. Martial artists traverse the globe to test their limits against the strongest fighters alive, harnessing spiritual energy like Hadouken and Psycho Power to achieve victory.",
  "TMNT": "Hidden in the sewers of New York, mutant turtles and their rat master wage a shadow war against the Foot Clan, alien Krang, and interdimensional threats, armed with ninjutsu and brotherly bonds.",
  "Star Wars": "A galaxy far, far away defined by the eternal struggle between the light and dark sides of the Force, spanning generations of Jedi, Sith, and galactic rebellions.",
  "Godzilla": "The realm of titans. Colossal prehistoric beasts awaken from the depths of the Earth to restore balance to nature, leaving destruction in their wake as apex predators fight for supremacy.",
  "X-Men": "A branch of the Marvel multiverse focused exclusively on Homo Superior. Mutants are hated and feared by the very world they are sworn to protect, fighting both human prejudice and mutant supremacy.",
};

export function UniverseInfo() {
  const universes = Object.keys(universeBlurbs).sort();
  const [selectedOpt, setSelectedOpt] = useState<string>(universes[0]);

  // Build the tree (sorted by powerScoredesc)
  const rosterTree = allCharactersData
    .filter(c => c.universe === selectedOpt)
    .sort((a, b) => b.powerScore - a.powerScore);

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-[2rem] p-6 lg:p-10 flex flex-col mb-12 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 z-10 relative">
         <div className="flex items-center gap-4">
           <BookOpen className="text-blue-500 w-8 h-8" />
           <h3 className="text-2xl font-black uppercase tracking-wider text-white">Universe Archives</h3>
         </div>
         
         {/* Dropdown */}
         <div className="relative w-full md:w-64">
           <select 
              value={selectedOpt}
              onChange={(e) => setSelectedOpt(e.target.value)}
              className="w-full appearance-none bg-zinc-900 border border-zinc-700 text-white font-bold uppercase tracking-widest text-sm px-4 py-3 rounded-xl outline-none focus:border-blue-500 transition-colors cursor-pointer shadow-lg"
           >
             {universes.map(u => (
               <option key={u} value={u}>{u}</option>
             ))}
           </select>
           <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none w-4 h-4" />
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 z-10 relative">
         {/* Left Col: Lore Blurb */}
         <div className="flex flex-col">
            <h4 className="text-sm font-bold text-blue-400 uppercase tracking-[0.2em] mb-4 border-b border-zinc-800 pb-2">History & Lore</h4>
            <p className="text-zinc-300 leading-relaxed text-sm md:text-base selection:bg-blue-500/30">
               {universeBlurbs[selectedOpt]}
            </p>
         </div>

         {/* Right Col: Hierarchy Tree */}
         <div className="flex flex-col bg-zinc-900/80 rounded-2xl p-6 border border-zinc-800/50 shadow-inner">
            <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
               <GitMerge className="w-4 h-4 rotate-90" />
               Power Hierarchy Tree
            </h4>
            
            <div className="flex flex-col relative pl-4 border-l-2 border-zinc-800 ml-4">
                 {rosterTree.map((char, index) => (
                   <div key={char.id} className="relative flex items-center mb-6 last:mb-0 group">
                      {/* Tree branch line */}
                      <div className="absolute -left-4 w-6 h-0.5 bg-zinc-800 group-hover:bg-blue-500/50 transition-colors" />
                      
                      <div className="bg-zinc-950 border border-zinc-800 p-2 pr-6 rounded-xl flex items-center gap-4 ml-6 hover:border-blue-500/50 hover:bg-zinc-900 transition-all cursor-default shadow-md relative group-hover:scale-105 origin-left w-full sm:w-auto">
                          
                          {/* Rank indicator */}
                          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center font-black text-xs text-zinc-500 border-2 border-zinc-950 group-hover:bg-blue-500 group-hover:text-black transition-colors">
                             {index + 1}
                          </div>

                          <img src={char.previewUrl} alt={char.name} className="w-10 h-10 rounded-lg object-cover border border-zinc-700 bg-zinc-800" />
                          <div className="flex flex-col">
                             <div className="font-black text-white uppercase tracking-tight text-sm">{char.name}</div>
                             <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400">{char.powerScore} Power</div>
                          </div>
                      </div>
                   </div>
                 ))}
            </div>
         </div>
      </div>
    </div>
  );
}
