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
  setChar1,
  setChar2,
  setSelectedLoreChar
}: BattleViewProps) {
  return (
    <div className="w-full max-w-5xl flex justify-between items-center">
      {/* Player 1 Info */}
      <div className="w-1/3 text-center">
        {char1 ? (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`space-y-2 transition-opacity duration-1000 ${battleState === 'result' && winner === 2 ? 'opacity-30' : 'opacity-100'}`}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              {char1.name}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                {char1.universe}
              </p>
              <div className="h-3 w-px bg-zinc-700" />
              <p className="text-xs font-mono text-yellow-500 uppercase tracking-widest font-bold">
                PWR: {char1.powerScore}
              </p>
            </div>
            <button
              onClick={() => setSelectedLoreChar(char1)}
              className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white rounded-full text-xs font-medium transition-colors border border-zinc-700/50"
            >
              <Info size={12} />
              Background
            </button>
            {battleState === 'result' && winner === 1 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-yellow-400 font-bold text-2xl uppercase tracking-widest mt-4"
              >
                Winner
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Select Player 1</div>
        )}
      </div>

      {/* VS / Battle Controls */}
      <div className="w-1/3 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {battleState === 'idle' ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="text-6xl font-black italic text-zinc-700 mb-6">VS</div>
              {char1 && char2 && (
                <button
                  onClick={startBattle}
                  className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.5)]"
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
              className="text-7xl md:text-9xl font-black text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]"
            >
              {countdown > 0 ? countdown : 'FIGHT!'}
            </motion.div>
          ) : (
            <motion.button
              key="result"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => {
                setBattleState('idle');
                setChar1(null);
                setChar2(null);
              }}
              className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Play Again
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Player 2 Info */}
      <div className="w-1/3 text-center">
        {char2 ? (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`space-y-2 transition-opacity duration-1000 ${battleState === 'result' && winner === 1 ? 'opacity-30' : 'opacity-100'}`}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              {char2.name}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                {char2.universe}
              </p>
              <div className="h-3 w-px bg-zinc-700" />
              <p className="text-xs font-mono text-yellow-500 uppercase tracking-widest font-bold">
                PWR: {char2.powerScore}
              </p>
            </div>
            <button
              onClick={() => setSelectedLoreChar(char2)}
              className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white rounded-full text-xs font-medium transition-colors border border-zinc-700/50"
            >
              <Info size={12} />
              Background
            </button>
            {battleState === 'result' && winner === 2 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-yellow-400 font-bold text-2xl uppercase tracking-widest mt-4"
              >
                Winner
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Select Player 2</div>
        )}
      </div>
    </div>
  );
}
