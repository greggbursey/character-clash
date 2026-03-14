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
  return (
    <div className="w-full max-w-5xl flex justify-between items-center">
      {/* Universe 1 Info */}
      <div className="w-1/3 text-center">
        {universe1 ? (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`space-y-2 transition-opacity duration-1000 ${battleState === 'result' && winner === 2 ? 'opacity-30' : 'opacity-100'}`}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              {universe1}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                {getUniverseStats(universe1).count} Fighters
              </p>
              <div className="h-3 w-px bg-zinc-700" />
              <p className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">
                AVG PWR: {getUniverseStats(universe1).avgPower}
              </p>
            </div>
            {battleState === 'result' && winner === 1 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-blue-400 font-bold text-2xl uppercase tracking-widest mt-4"
              >
                Dominates
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Select Universe 1</div>
        )}
      </div>

      {/* VS / Battle Controls */}
      <div className="w-1/3 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {battleState === 'idle' ? (
            <motion.div
              key="idle-uni"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="text-6xl font-black italic text-zinc-700 mb-6">VS</div>
              {universe1 && universe2 && (
                <button
                  onClick={startBattle}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(37,99,235,0.5)]"
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
              className="text-7xl md:text-9xl font-black text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
            >
              {countdown > 0 ? countdown : 'CLASH!'}
            </motion.div>
          ) : (
            <motion.button
              key="result-uni"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => {
                setBattleState('idle');
                setUniverse1(null);
                setUniverse2(null);
              }}
              className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Play Again
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Universe 2 Info */}
      <div className="w-1/3 text-center">
        {universe2 ? (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`space-y-2 transition-opacity duration-1000 ${battleState === 'result' && winner === 1 ? 'opacity-30' : 'opacity-100'}`}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              {universe2}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                {getUniverseStats(universe2).count} Fighters
              </p>
              <div className="h-3 w-px bg-zinc-700" />
              <p className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">
                AVG PWR: {getUniverseStats(universe2).avgPower}
              </p>
            </div>
            {battleState === 'result' && winner === 2 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-blue-400 font-bold text-2xl uppercase tracking-widest mt-4"
              >
                Dominates
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Select Universe 2</div>
        )}
      </div>
    </div>
  );
}
