"use client";

import Image from "next/image";
import { useState } from "react";
import { Users, Swords, Shuffle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { characters as allCharactersData } from "@/data/characters";
import { getAssetPath } from "@/lib/utils";
import { Character } from "@/types";

export function MatchupSimulator() {
  const [team1, setTeam1] = useState<Character[]>([]);
  const [team2, setTeam2] = useState<Character[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTeam, setActiveTeam] = useState<1 | 2>(1);
  const [result, setResult] = useState<string | null>(null);

  const filtered = allCharactersData
    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const isDrafted = (charId: string) => {
    return team1.some(c => c.id === charId) || team2.some(c => c.id === charId);
  };

  const addToTeam = (char: Character) => {
    if (isDrafted(char.id)) return;
    
    if (activeTeam === 1 && team1.length < 5) {
      setTeam1([...team1, char]);
    } else if (activeTeam === 2 && team2.length < 5) {
      setTeam2([...team2, char]);
    }
  };

  const addRandomToTeam = () => {
    const available = allCharactersData.filter(c => !isDrafted(c.id));
    if (available.length === 0) return;
    
    const randomChar = available[Math.floor(Math.random() * available.length)];
    addToTeam(randomChar);
  };

  const removeFromTeam = (team: 1 | 2, charId: string) => {
    if (team === 1) setTeam1(team1.filter((c) => c.id !== charId));
    else setTeam2(team2.filter((c) => c.id !== charId));
  };

  const simulate = () => {
    if (team1.length === 0 || team2.length === 0) return;
    const power1 = team1.reduce((acc, c) => acc + (c.powerScore || 500), 0) / team1.length;
    const power2 = team2.reduce((acc, c) => acc + (c.powerScore || 500), 0) / team2.length;
    
    // Simple logic for the simulator
    if (power1 > power2 + 100) setResult("Team 1 Dominates");
    else if (power2 > power1 + 100) setResult("Team 2 Dominates");
    else if (power1 > power2) setResult("Team 1 Wins a Close Battle");
    else if (power2 > power1) setResult("Team 2 Wins a Close Battle");
    else setResult("It's a Draw!");
  };

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/40 rounded-[2rem] p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Users className="text-zinc-400 w-8 h-8" />
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">5v5 Squad Simulator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Team 1 */}
        <div 
          className={`p-5 rounded-2xl border-2 transition-all ${activeTeam === 1 ? 'border-red-500 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'border-zinc-800 hover:border-zinc-700'} cursor-pointer`}
          onClick={() => setActiveTeam(1)}
        >
          <h4 className="font-bold text-red-500 mb-4 uppercase tracking-widest text-sm flex justify-between items-center">
             <span>Team 1 ({team1.length}/5)</span>
             {activeTeam === 1 && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
          </h4>
          <div className="flex flex-wrap gap-2 min-h-[50px]">
            <AnimatePresence>
              {team1.map((c) => (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  exit={{ scale: 0 }}
                  key={`t1-${c.id}`} 
                  onClick={(e) => { e.stopPropagation(); removeFromTeam(1, c.id); }}
                  className="bg-zinc-900 border border-zinc-700 p-1.5 pr-3 rounded-full flex items-center gap-2 text-white hover:bg-zinc-800 hover:border-red-500/50 transition-all cursor-pointer group shadow-sm"
                  title="Click to remove"
                >
                  {c.previewUrl && (
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image src={getAssetPath(c.previewUrl)} alt="" fill className="rounded-full object-cover border-2 border-zinc-800" />
                    </div>
                  )}
                  <span className="text-xs font-bold group-hover:line-through">{c.name} <span className="text-zinc-500 font-normal">[{c.powerScore}]</span></span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Team 2 */}
         <div 
          className={`p-5 rounded-2xl border-2 transition-all ${activeTeam === 2 ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'border-zinc-800 hover:border-zinc-700'} cursor-pointer`}
          onClick={() => setActiveTeam(2)}
        >
          <h4 className="font-bold text-blue-500 mb-4 uppercase tracking-widest text-sm flex justify-between items-center">
             <span>Team 2 ({team2.length}/5)</span>
             {activeTeam === 2 && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
          </h4>
          <div className="flex flex-wrap gap-2 min-h-[50px]">
            <AnimatePresence>
              {team2.map((c) => (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  exit={{ scale: 0 }}
                  key={`t2-${c.id}`} 
                  onClick={(e) => { e.stopPropagation(); removeFromTeam(2, c.id); }}
                  className="bg-zinc-900 border border-zinc-700 p-1.5 pr-3 rounded-full flex items-center gap-2 text-white hover:bg-zinc-800 hover:border-blue-500/50 transition-all cursor-pointer group shadow-sm"
                  title="Click to remove"
                >
                  {c.previewUrl && (
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image src={getAssetPath(c.previewUrl)} alt="" fill className="rounded-full object-cover border-2 border-zinc-800" />
                    </div>
                  )}
                  <span className="text-xs font-bold group-hover:line-through">{c.name} <span className="text-zinc-500 font-normal">[{c.powerScore}]</span></span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Roster Selection */}
      <div className="bg-black/50 border border-zinc-800 rounded-2xl p-5 mb-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <h4 className="font-bold text-zinc-400 uppercase tracking-widest text-xs flex items-center gap-2">
            Drafting for Team <span className={`px-2 py-0.5 rounded text-white ${activeTeam === 1 ? 'bg-red-500' : 'bg-blue-500'}`}>{activeTeam}</span>
          </h4>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
             <input
                type="text"
                placeholder="Search roster..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-48 bg-zinc-900 border border-zinc-700 focus:border-zinc-500 rounded-lg py-2 px-3 text-white text-xs outline-none transition-all"
             />
            <button
              onClick={addRandomToTeam}
              className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap border border-zinc-700"
            >
              <Shuffle size={14} /> Random
            </button>
          </div>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar">
           {filtered.length > 0 ? filtered.map(c => (
            <div 
               key={c.id}
               onClick={() => addToTeam(c)}
               className={`flex-shrink-0 w-28 flex flex-col items-center group cursor-pointer ${isDrafted(c.id) ? 'opacity-20 grayscale pointer-events-none' : 'hover:scale-105 transition-transform'}`}
               title={`${c.name} [${c.powerScore} PWR]`}
             >
                <div className="relative w-28 h-28 mx-auto mb-3 flex-shrink-0">
                  <Image src={getAssetPath(c.previewUrl)} alt={c.name} fill className={`rounded-full border-4 object-cover ${activeTeam === 1 ? 'group-hover:border-red-500' : 'group-hover:border-blue-500'} border-zinc-800 shadow-2xl`} />
                </div>
                <div className="text-[10px] text-center text-zinc-400 font-bold uppercase tracking-tight w-full leading-tight line-clamp-2 px-1 group-hover:text-white transition-colors">{c.name}</div>
             </div>
           )) : (
             <div className="w-full text-center py-4 text-zinc-600 text-xs font-mono uppercase tracking-widest">No fighters found</div>
           )}
        </div>
      </div>

      <button 
        onClick={simulate}
        disabled={team1.length === 0 || team2.length === 0}
        className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-black tracking-widest uppercase py-5 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg border border-zinc-700 hover:border-zinc-500 shadow-xl"
      >
        <Swords size={20} />
        Simulate Clash
      </button>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 rounded-2xl border border-yellow-500/50 bg-yellow-500/10 text-center shadow-[0_0_30px_rgba(234,179,8,0.1)]"
          >
            <h4 className="font-black text-yellow-500 uppercase tracking-widest text-xl">{result}</h4>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
