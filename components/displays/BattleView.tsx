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
  setSelectedModifier: (val: { char: Character; type: 'gear' | 'prep' } | null) => void;
  withGear1: boolean;
  setWithGear1: (val: boolean) => void;
  withPrep1: boolean;
  setWithPrep1: (val: boolean) => void;
  withGear2: boolean;
  setWithGear2: (val: boolean) => void;
  withPrep2: boolean;
  setWithPrep2: (val: boolean) => void;
}

export default function BattleView({
  char1,
  char2,
  battleState,
  countdown,
  winner,
  startBattle,
  setBattleState,
  setSelectedLoreChar,
  setSelectedModifier,
  withGear1,
  setWithGear1,
  withPrep1,
  setWithPrep1,
  withGear2,
  setWithGear2,
  withPrep2,
  setWithPrep2
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
                PWR: {char1.powerScore + (withGear1 ? (char1.gearBonus || 0) : 0) + (withPrep1 ? (char1.prepBonus || 0) : 0)}
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

            {/* Modifiers P1 */}
            <div className="flex flex-col items-center gap-2 mt-4">
              <div className="flex items-center gap-1 w-full max-w-[140px]">
                <button
                  onClick={() => setWithGear1(!withGear1)}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                    withGear1 
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
                      : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                  }`}
                >
                  Gear {withGear1 && <span className="ml-1 text-[8px] opacity-70">+{char1.gearBonus || 0}</span>}
                </button>
                <button 
                  onClick={() => setSelectedModifier({ char: char1, type: 'gear' })}
                  className="p-1.5 rounded-lg border border-zinc-800 text-zinc-500 hover:text-blue-400 hover:border-blue-500/50 transition-colors bg-zinc-900/50"
                  title="Gear Info"
                >
                  <Info size={12} />
                </button>
              </div>
              <div className="flex items-center gap-1 w-full max-w-[140px]">
                <button
                  onClick={() => setWithPrep1(!withPrep1)}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                    withPrep1 
                      ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]' 
                      : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                  }`}
                >
                  Prep {withPrep1 && <span className="ml-1 text-[8px] opacity-70">+{char1.prepBonus || 0}</span>}
                </button>
                <button 
                  onClick={() => setSelectedModifier({ char: char1, type: 'prep' })}
                  className="p-1.5 rounded-lg border border-zinc-800 text-zinc-500 hover:text-purple-400 hover:border-purple-500/50 transition-colors bg-zinc-900/50"
                  title="Prep Info"
                >
                  <Info size={12} />
                </button>
              </div>
            </div>
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
                PWR: {char2.powerScore + (withGear2 ? (char2.gearBonus || 0) : 0) + (withPrep2 ? (char2.prepBonus || 0) : 0)}
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

            {/* Modifiers P2 */}
            <div className="flex flex-col items-center gap-2 mt-4 flex-row-reverse sm:flex-row">
              <div className="flex items-center gap-1 w-full max-w-[140px]">
                <button
                  onClick={() => setWithGear2(!withGear2)}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                    withGear2 
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
                      : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                  }`}
                >
                  Gear {withGear2 && <span className="ml-1 text-[8px] opacity-70">+{char2.gearBonus || 0}</span>}
                </button>
                <button 
                  onClick={() => setSelectedModifier({ char: char2, type: 'gear' })}
                  className="p-1.5 rounded-lg border border-zinc-800 text-zinc-500 hover:text-blue-400 hover:border-blue-500/50 transition-colors bg-zinc-900/50"
                  title="Gear Info"
                >
                  <Info size={12} />
                </button>
              </div>
              <div className="flex items-center gap-1 w-full max-w-[140px]">
                <button
                  onClick={() => setWithPrep2(!withPrep2)}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                    withPrep2 
                      ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]' 
                      : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                  }`}
                >
                  Prep {withPrep2 && <span className="ml-1 text-[8px] opacity-70">+{char2.prepBonus || 0}</span>}
                </button>
                <button 
                  onClick={() => setSelectedModifier({ char: char2, type: 'prep' })}
                  className="p-1.5 rounded-lg border border-zinc-800 text-zinc-500 hover:text-purple-400 hover:border-purple-500/50 transition-colors bg-zinc-900/50"
                  title="Prep Info"
                >
                  <Info size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-zinc-500 font-mono text-xs md:text-sm uppercase tracking-widest">Select P2</div>
        )}
      </div>

    </div>
  );
}
