'use client';

import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Info, Brain } from 'lucide-react';
import { Character } from '@/types';

interface SingleViewProps {
  char1: Character | null;
  setSelectedLoreChar: (char: Character) => void;
  setSelectedModifier: (val: { char: Character; type: 'gear' | 'prep' } | null) => void;
  withGear: boolean;
  setWithGear: (val: boolean) => void;
  withPrep: boolean;
  setWithPrep: (val: boolean) => void;
}

export default function SingleView({ 
  char1, 
  setSelectedLoreChar,
  setSelectedModifier,
  withGear,
  setWithGear,
  withPrep,
  setWithPrep
}: SingleViewProps) {
  return (
    <AnimatePresence mode="wait">
      {char1 ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          key={`info-${char1.id}`}
          className="w-full text-center space-y-4 px-4 sm:px-12"
        >
          <h2 className="text-4xl sm:text-6xl md:text-[clamp(2.5rem,6vw,90px)] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 leading-[0.9] break-words text-balance max-w-[90vw] mx-auto pb-1">
            {char1.name}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest">
              Universe: {char1.universe}
            </p>
            <div className="h-4 w-px bg-zinc-700" />
            <p className="text-sm font-mono text-yellow-500 uppercase tracking-widest font-bold">
              Power: {(char1.powerScore + (withGear ? (char1.gearBonus || 0) : 0) + (withPrep ? (char1.prepBonus || 0) : 0)).toLocaleString()}
            </p>
          </div>

          {/* New Gear/Prep Toggles for Single Mode */}
          <div className="flex flex-wrap items-center justify-center gap-4 py-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setWithGear(!withGear)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${
                  withGear 
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                With Gear {withGear && <span className="ml-2 text-[10px] opacity-70">+{(char1.gearBonus || 0).toLocaleString()}</span>}
              </button>
              <button 
                onClick={() => setSelectedModifier({ char: char1, type: 'gear' })}
                className="p-2 rounded-full border border-zinc-800 text-zinc-500 hover:text-blue-400 hover:border-blue-500/50 transition-colors bg-zinc-900/50"
                title="Gear Info"
              >
                <Info size={14} />
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setWithPrep(!withPrep)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${
                  withPrep 
                    ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                With Prep {withPrep && <span className="ml-2 text-[10px] opacity-70">+{(char1.prepBonus || 0).toLocaleString()}</span>}
              </button>
              <button 
                onClick={() => setSelectedModifier({ char: char1, type: 'prep' })}
                className="p-2 rounded-full border border-zinc-800 text-zinc-500 hover:text-purple-400 hover:border-purple-500/50 transition-colors bg-zinc-900/50"
                title="Prep Info"
              >
                <Info size={14} />
              </button>
            </div>
          </div>
          <p className="text-sm md:text-base lg:text-lg text-zinc-300 leading-relaxed max-w-xl mx-auto line-clamp-3 md:line-clamp-none">
            {char1.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setSelectedLoreChar(char1)}
              className="inline-flex items-center gap-2 px-6 py-2 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white rounded-full text-sm font-black uppercase tracking-widest transition-colors border border-zinc-700/50"
            >
              <div className="flex items-center gap-2">
                <Info size={16} />
                <span>Background</span>
              </div>
            </button>
            <Link
              href={`/portal?tab=Trivia&category=character&value=${char1.id}`}
              className="inline-flex items-center gap-2 px-6 py-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 hover:text-white rounded-full text-sm font-black uppercase tracking-widest transition-all border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
            >
              <Brain size={16} />
              <span>Test Your Knowledge</span>
            </Link>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key="single-empty"
          className="text-center space-y-6"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-full" />
            <h2 className="relative text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-white/20">
              Choose Your<br />Champion
            </h2>
          </div>
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-[0.3em]">
            Select a character below to begin
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
