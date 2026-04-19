'use client';

import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Character, Mode, BattleState } from '@/types';
import { getAssetPath } from '@/lib/utils';
import { universeLoreData } from '@/data/universe-lore';
import { Zap, Swords } from 'lucide-react';

interface CombatActionBarProps {
  mode: Mode;
  battleState: BattleState;
  countdown: number;
  char1: Character | null;
  char2: Character | null;
  universe1: string | null;
  universe2: string | null;
  withGear1: boolean;
  withPrep1: boolean;
  withGear2: boolean;
  withPrep2: boolean;
  getUniverseStats: (uni: string) => { avgPower: number; avgGear: number; avgPrep: number; color: string; };
  startBattle: () => void;
  onSlotClick?: (slot: 1 | 2) => void;
  setWithGear1: (val: boolean) => void;
  setWithPrep1: (val: boolean) => void;
  setWithGear2: (val: boolean) => void;
  setWithPrep2: (val: boolean) => void;
}

export default function CombatActionBar({
  mode,
  battleState,
  countdown,
  char1,
  char2,
  universe1,
  universe2,
  withGear1,
  withPrep1,
  withGear2,
  withPrep2,
  getUniverseStats,
  startBattle,
  onSlotClick,
  setWithGear1,
  setWithPrep1,
  setWithGear2,
  setWithPrep2
}: CombatActionBarProps) {

  // Hidden in single mode or if battle has resolved
  if (mode === 'single' || battleState === 'result') return null;

  const isBattle = mode === 'battle';
  
  const p1Ready = isBattle ? !!char1 : !!universe1;
  const p2Ready = isBattle ? !!char2 : !!universe2;
  const bothReady = p1Ready && p2Ready;

  const getP1Stats = () => {
    if (isBattle && char1) {
      return char1.powerScore + (withGear1 ? (char1.gearBonus || 0) : 0) + (withPrep1 ? (char1.prepBonus || 0) : 0);
    } else if (!isBattle && universe1) {
      const stats = getUniverseStats(universe1);
      return stats.avgPower + (withGear1 ? stats.avgGear : 0) + (withPrep1 ? stats.avgPrep : 0);
    }
    return 0;
  };

  const getP2Stats = () => {
    if (isBattle && char2) {
      return char2.powerScore + (withGear2 ? (char2.gearBonus || 0) : 0) + (withPrep2 ? (char2.prepBonus || 0) : 0);
    } else if (!isBattle && universe2) {
      const stats = getUniverseStats(universe2);
      return stats.avgPower + (withGear2 ? stats.avgGear : 0) + (withPrep2 ? stats.avgPrep : 0);
    }
    return 0;
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl"
    >
      <div className="bg-zinc-950/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between">
        
        {/* Player 1 Slot */}
        <div className={`relative flex flex-col items-center w-[35%] py-1 transition-all`}>
          <button 
            onClick={() => onSlotClick?.(1)}
            className={`w-full flex items-center gap-2 md:gap-3 rounded-full transition-all group ${p1Ready ? 'bg-white/5 hover:bg-white/10 p-2 pr-4' : 'bg-zinc-900/50 p-3 justify-center border border-dashed border-white/20'}`}
          >
          {p1Ready ? (
            <>
              {isBattle && char1 ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0 bg-black/50">
                  <Image src={getAssetPath(char1.previewUrl)} alt={char1.name} width={40} height={40} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full border border-white/20 shrink-0 bg-black/50 flex items-center justify-center text-xl">
                  {universeLoreData[universe1!]?.emoji || '🌍'}
                </div>
              )}
              <div className="flex flex-col items-start overflow-hidden text-left">
                <span className="text-[10px] md:text-xs font-bold uppercase truncate w-full text-white">
                  {isBattle ? char1?.name : universe1}
                </span>
                <span className="text-[9px] font-mono text-yellow-500 font-bold flex items-center gap-1">
                  <Zap size={8} /> {getP1Stats().toLocaleString()}
                </span>
              </div>
            </>
          ) : (
            <span className="text-[10px] md:text-xs font-black uppercase text-zinc-500 tracking-widest text-center py-[2px]">{isBattle ? 'Select P1' : 'Universe 1'}</span>
          )}
          </button>
          {!isBattle && p1Ready && (
            <div className="flex gap-2 mt-2 w-full justify-center">
              <button 
                onClick={(e) => { e.stopPropagation(); setWithGear1(!withGear1); }}
                className={`text-[8px] md:text-[9px] px-2 py-0.5 rounded uppercase font-black border transition-colors ${withGear1 ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:text-zinc-300'}`}
              >
                +Gear
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setWithPrep1(!withPrep1); }}
                className={`text-[8px] md:text-[9px] px-2 py-0.5 rounded uppercase font-black border transition-colors ${withPrep1 ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:text-zinc-300'}`}
              >
                +Prep
              </button>
            </div>
          )}
        </div>

        {/* Center VS / Clash Button */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-10">
          <AnimatePresence mode="wait">
            {bothReady && battleState === 'idle' ? (
              <motion.button
                key="clash-btn"
                onClick={startBattle}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex flex-col items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)] border-2 border-red-400 hover:scale-110 active:scale-95 transition-transform"
              >
                <span className="text-white font-black uppercase tracking-widest text-[10px] md:text-xs">Clash</span>
                <Swords size={18} className="text-white mt-1" />
              </motion.button>
            ) : battleState === 'countdown' ? (
              <motion.div
                key={`countdown-text-${countdown}`}
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 md:w-20 md:h-20 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-700 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
              >
                <span className="text-3xl md:text-4xl font-black text-blue-500">{countdown > 0 ? countdown : '⚔️'}</span>
              </motion.div>
            ) : (
              <motion.div
                key="vs-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800"
              >
                <span className="text-xs font-black italic text-zinc-500 tracking-widest">VS</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Player 2 Slot */}
        <div className={`relative flex flex-col items-center w-[35%] py-1 transition-all`}>
          <button 
            onClick={() => onSlotClick?.(2)}
            className={`w-full flex items-center justify-end gap-2 md:gap-3 rounded-full transition-all group ${p2Ready ? 'bg-white/5 hover:bg-white/10 p-2 pl-4' : 'bg-zinc-900/50 p-3 justify-center border border-dashed border-white/20'}`}
          >
          {p2Ready ? (
            <>
              <div className="flex flex-col items-end overflow-hidden text-right">
                <span className="text-[10px] md:text-xs font-bold uppercase truncate w-full text-white">
                  {isBattle ? char2?.name : universe2}
                </span>
                <span className="text-[9px] font-mono text-yellow-500 font-bold flex items-center justify-end gap-1">
                  {getP2Stats().toLocaleString()} <Zap size={8} />
                </span>
              </div>
              {isBattle && char2 ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0 bg-black/50">
                  <Image src={getAssetPath(char2.previewUrl)} alt={char2.name} width={40} height={40} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full border border-white/20 shrink-0 bg-black/50 flex items-center justify-center text-xl">
                  {universeLoreData[universe2!]?.emoji || '🌍'}
                </div>
              )}
            </>
          ) : (
            <span className="text-[10px] md:text-xs font-black uppercase text-zinc-500 tracking-widest text-center py-[2px]">{isBattle ? 'Select P2' : 'Universe 2'}</span>
          )}
          </button>
          {!isBattle && p2Ready && (
            <div className="flex gap-2 mt-2 w-full justify-center">
              <button 
                onClick={(e) => { e.stopPropagation(); setWithGear2(!withGear2); }}
                className={`text-[8px] md:text-[9px] px-2 py-0.5 rounded uppercase font-black border transition-colors ${withGear2 ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:text-zinc-300'}`}
              >
                +Gear
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setWithPrep2(!withPrep2); }}
                className={`text-[8px] md:text-[9px] px-2 py-0.5 rounded uppercase font-black border transition-colors ${withPrep2 ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:text-zinc-300'}`}
              >
                +Prep
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
