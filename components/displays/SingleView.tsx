'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Info } from 'lucide-react';
import { Character } from '@/types';

interface SingleViewProps {
  char1: Character | null;
  setSelectedLoreChar: (char: Character) => void;
}

export default function SingleView({ char1, setSelectedLoreChar }: SingleViewProps) {
  return (
    <AnimatePresence mode="wait">
      {char1 ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          key={`info-${char1.id}`}
          className="max-w-2xl text-center space-y-4"
        >
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
            {char1.name}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest">
              Universe: {char1.universe}
            </p>
            <div className="h-4 w-px bg-zinc-700" />
            <p className="text-sm font-mono text-yellow-500 uppercase tracking-widest font-bold">
              Power: {char1.powerScore}
            </p>
          </div>
          <p className="text-lg text-zinc-300 leading-relaxed max-w-xl mx-auto">
            {char1.description}
          </p>
          <button
            onClick={() => setSelectedLoreChar(char1)}
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white rounded-full text-sm font-medium transition-colors border border-zinc-700/50"
          >
            <Info size={16} />
            Read More Background
          </button>
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
