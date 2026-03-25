'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Info } from 'lucide-react';
import { Character, BattleState } from '@/types';


interface BattleViewProps {
  char1: Character | null;
  char2: Character | null;
  battleState: BattleState;
  countdown: number;
  winner: 1 | 2 | null;
  startBattle: () => void;
  setBattleState: (state: BattleState) => void;
  setChar1: (char: Character | null) => void;
  setChar2: (char: Character | null) => void;
  setSelectedLoreChar: (char: Character) => void;
}

export default function BattleView({
  char1,
  char2,
  battleState,
  countdown,
  winner,
  startBattle,
  setBattleState,
  setSelectedLoreChar
}: BattleViewProps) {
  const isResult = battleState === 'result';


  return (
    <div className="w-full max-w-5xl flex flex-row justify-between items-center gap-2 md:gap-0">

      {/* Player 1 Info — hidden during result to avoid clashing with "WINS" overlay */}
      <div className={`flex-1 text-center px-2 md:px-4 transition-opacity duration-500 ${isResult ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {char1 ? (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-1 md:space-y-2"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-white break-words leading-none">
              {char1.name}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <p className="text-[10px] md:text-xs font-mono text-zinc-400 uppercase tracking-widest">
                {char1.universe}
              </p>
              <div className="h-3 w-px bg-zinc-700 hidden sm:block" />
              <p className="text-[10px] md:text-xs font-mono text-yellow-500 uppercase tracking-widest font-bold hidden sm:block">
                PWR: {char1.powerScore}
              </p>
            </div>
            <button
              onClick={() => setSelectedLoreChar(char1)}
              className="inline-flex items-center gap-1 mt-1 px-2 py-1 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white rounded-full text-[10px] font-medium transition-colors border border-zinc-700/50"
            >
              <Info size={10} />
              <span className="hidden sm:inline">Background</span>
              <span className="sm:hidden">Info</span>
            </button>
          </motion.div>
        ) : (
          <div className="text-zinc-500 font-mono text-xs md:text-sm uppercase tracking-widest">Select P1</div>
        )}
      </div>

      {/* VS / Countdown center column */}
      <div className="flex-shrink-0 w-20 md:w-48 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {battleState === 'idle' ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="text-4xl md:text-6xl font-black italic text-zinc-700">VS</div>
              {char1 && char2 && (
                <button
                  onClick={startBattle}
                  className="px-4 md:px-8 py-2 md:py-4 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.5)] text-xs md:text-base"
                >
                  Battle
                </button>
              )}
            </motion.div>
          ) : battleState === 'countdown' ? (
            <motion.div
              key={`countdown-${countdown}`}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-5xl md:text-9xl font-black text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]"
            >
              {countdown > 0 ? countdown : '⚔️'}
            </motion.div>
          ) : (
            // Result state: center column is empty — page.tsx renders the bottom overlay
            <div />
          )}
        </AnimatePresence>
      </div>

      {/* Player 2 Info — hidden during result */}
      <div className={`flex-1 text-center px-2 md:px-4 transition-opacity duration-500 ${isResult ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {char2 ? (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-1 md:space-y-2"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-white break-words leading-none">
              {char2.name}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <p className="text-[10px] md:text-xs font-mono text-zinc-400 uppercase tracking-widest">
                {char2.universe}
              </p>
              <div className="h-3 w-px bg-zinc-700 hidden sm:block" />
              <p className="text-[10px] md:text-xs font-mono text-yellow-500 uppercase tracking-widest font-bold hidden sm:block">
                PWR: {char2.powerScore}
              </p>
            </div>
            <button
              onClick={() => setSelectedLoreChar(char2)}
              className="inline-flex items-center gap-1 mt-1 px-2 py-1 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white rounded-full text-[10px] font-medium transition-colors border border-zinc-700/50"
            >
              <Info size={10} />
              <span className="hidden sm:inline">Background</span>
              <span className="sm:hidden">Info</span>
            </button>
          </motion.div>
        ) : (
          <div className="text-zinc-500 font-mono text-xs md:text-sm uppercase tracking-widest">Select P2</div>
        )}
      </div>

    </div>
  );
}
