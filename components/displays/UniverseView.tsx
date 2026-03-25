'use client';

import { motion, AnimatePresence } from 'motion/react';
import { BattleState } from '@/types';


interface UniverseViewProps {
  universe1: string | null;
  universe2: string | null;
  battleState: BattleState;
  countdown: number;
  winner: 1 | 2 | null;
  getUniverseStats: (uni: string) => { count: number; avgPower: number; color: string; background: string };
  startBattle: () => void;
  setBattleState: (state: BattleState) => void;
  setUniverse1: (uni: string | null) => void;
  setUniverse2: (uni: string | null) => void;
}

export default function UniverseView({
  universe1,
  universe2,
  battleState,
  countdown,
  winner,
  getUniverseStats,
  startBattle,
  setBattleState,
  setUniverse1,
  setUniverse2
}: UniverseViewProps) {
  const isResult = battleState === 'result';

  return (
    <div className="w-full max-w-5xl flex flex-row justify-between items-center gap-2 md:gap-0">

      {/* Universe 1 Info — fades out during result to avoid clashing with "DOMINATES" overlay */}
      <div className={`flex-1 text-center px-2 md:px-4 transition-opacity duration-500 ${isResult ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {universe1 ? (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-2"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white break-words leading-none">
              {universe1}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <p className="text-[10px] md:text-xs font-mono text-zinc-400 uppercase tracking-widest">
                {getUniverseStats(universe1).count} Fighters
              </p>
              <div className="h-3 w-px bg-zinc-700 hidden sm:block" />
              <p className="text-[10px] md:text-xs font-mono text-blue-400 uppercase tracking-widest font-bold hidden sm:block">
                AVG PWR: {getUniverseStats(universe1).avgPower}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="text-zinc-500 font-mono text-xs md:text-sm uppercase tracking-widest">Select Universe 1</div>
        )}
      </div>

      {/* VS / Countdown center column */}
      <div className="flex-shrink-0 w-20 md:w-48 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {battleState === 'idle' ? (
            <motion.div
              key="idle-uni"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="text-4xl md:text-6xl font-black italic text-zinc-700">VS</div>
              {universe1 && universe2 && (
                <button
                  onClick={startBattle}
                  className="px-4 md:px-8 py-2 md:py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(37,99,235,0.5)] text-xs md:text-base"
                >
                  Clash
                </button>
              )}
            </motion.div>
          ) : battleState === 'countdown' ? (
            <motion.div
              key={`countdown-uni-${countdown}`}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-5xl md:text-9xl font-black text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
            >
              {countdown > 0 ? countdown : '⚔️'}
            </motion.div>
          ) : (
            // Result: page.tsx renders the bottom overlay
            <div />
          )}
        </AnimatePresence>
      </div>

      {/* Universe 2 Info — fades out during result */}
      <div className={`flex-1 text-center px-2 md:px-4 transition-opacity duration-500 ${isResult ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {universe2 ? (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-2"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white break-words leading-none">
              {universe2}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <p className="text-[10px] md:text-xs font-mono text-zinc-400 uppercase tracking-widest">
                {getUniverseStats(universe2).count} Fighters
              </p>
              <div className="h-3 w-px bg-zinc-700 hidden sm:block" />
              <p className="text-[10px] md:text-xs font-mono text-blue-400 uppercase tracking-widest font-bold hidden sm:block">
                AVG PWR: {getUniverseStats(universe2).avgPower}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="text-zinc-500 font-mono text-xs md:text-sm uppercase tracking-widest">Select Universe 2</div>
        )}
      </div>

    </div>
  );
}
