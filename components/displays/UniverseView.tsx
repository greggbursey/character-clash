'use client';

import { motion, AnimatePresence } from 'motion/react';
import { BattleState } from '@/types';
import { Zap, BarChart2 } from 'lucide-react';


interface UniverseViewProps {
  universe1: string | null;
  universe2: string | null;
  battleState: BattleState;
  countdown: number;
  winner: 1 | 2 | null;
  getUniverseStats: (uni: string) => { 
    count: number; 
    totalPower: number; 
    totalGear: number;
    totalPrep: number;
    avgPower: number; 
    avgGear: number;
    avgPrep: number;
    color: string; 
    background: string 
  };
  startBattle: () => void;
  setBattleState: (state: BattleState) => void;
  setUniverse1: (uni: string | null) => void;
  setUniverse2: (uni: string | null) => void;
  withGear1: boolean;
  setWithGear1: (val: boolean) => void;
  withPrep1: boolean;
  setWithPrep1: (val: boolean) => void;
  withGear2: boolean;
  setWithGear2: (val: boolean) => void;
  withPrep2: boolean;
  setWithPrep2: (val: boolean) => void;
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
  setUniverse2,
  withGear1,
  setWithGear1,
  withPrep1,
  setWithPrep1,
  withGear2,
  setWithGear2,
  withPrep2,
  setWithPrep2
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
            <div className="flex flex-col items-center gap-1 md:gap-2">
              <p className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest">
                {getUniverseStats(universe1).count} Fighters
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                <div className="flex items-center gap-1.5" title="Total Universe Power">
                  <Zap size={12} className="text-yellow-500" />
                  <p className="text-[10px] md:text-xs font-mono text-yellow-500/90 uppercase tracking-widest font-bold">
                    TOT: {(getUniverseStats(universe1).totalPower + (withGear1 ? getUniverseStats(universe1).totalGear : 0) + (withPrep1 ? getUniverseStats(universe1).totalPrep : 0)).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-1.5" title="Average Fighter Power">
                  <BarChart2 size={12} className="text-blue-400" />
                  <p className="text-[10px] md:text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">
                    AVG: {(getUniverseStats(universe1).avgPower + (withGear1 ? getUniverseStats(universe1).avgGear : 0) + (withPrep1 ? getUniverseStats(universe1).avgPrep : 0)).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Modifiers U1 */}
            <div className="flex flex-col items-center gap-2 mt-4">
              <button
                onClick={() => setWithGear1(!withGear1)}
                className={`w-full max-w-[120px] py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                  withGear1 
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                With Gear {withGear1 && <span className="ml-1 text-[8px] opacity-70">+{getUniverseStats(universe1).avgGear.toLocaleString()}</span>}
              </button>
              <button
                onClick={() => setWithPrep1(!withPrep1)}
                className={`w-full max-w-[120px] py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                  withPrep1 
                    ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]' 
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                With Prep {withPrep1 && <span className="ml-1 text-[8px] opacity-70">+{getUniverseStats(universe1).avgPrep.toLocaleString()}</span>}
              </button>
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
            <div className="flex flex-col items-center gap-1 md:gap-2">
              <p className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest">
                {getUniverseStats(universe2).count} Fighters
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                <div className="flex items-center gap-1.5" title="Total Universe Power">
                  <Zap size={12} className="text-yellow-500" />
                  <p className="text-[10px] md:text-xs font-mono text-yellow-500/90 uppercase tracking-widest font-bold">
                    TOT: {(getUniverseStats(universe2).totalPower + (withGear2 ? getUniverseStats(universe2).totalGear : 0) + (withPrep2 ? getUniverseStats(universe2).totalPrep : 0)).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-1.5" title="Average Fighter Power">
                  <BarChart2 size={12} className="text-blue-400" />
                  <p className="text-[10px] md:text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">
                    AVG: {(getUniverseStats(universe2).avgPower + (withGear2 ? getUniverseStats(universe2).avgGear : 0) + (withPrep2 ? getUniverseStats(universe2).avgPrep : 0)).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Modifiers U2 */}
            <div className="flex flex-col items-center gap-2 mt-4">
              <button
                onClick={() => setWithGear2(!withGear2)}
                className={`w-full max-w-[120px] py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                  withGear2 
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                With Gear {withGear2 && <span className="ml-1 text-[8px] opacity-70">+{getUniverseStats(universe2).avgGear.toLocaleString()}</span>}
              </button>
              <button
                onClick={() => setWithPrep2(!withPrep2)}
                className={`w-full max-w-[120px] py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                  withPrep2 
                    ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]' 
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                With Prep {withPrep2 && <span className="ml-1 text-[8px] opacity-70">+{getUniverseStats(universe2).avgPrep.toLocaleString()}</span>}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="text-zinc-500 font-mono text-xs md:text-sm uppercase tracking-widest">Select Universe 2</div>
        )}
      </div>

    </div>
  );
}
