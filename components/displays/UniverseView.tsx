'use client';

import { motion, AnimatePresence } from 'motion/react';
import { BattleState } from '@/types';
import { useState } from 'react';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
  const [hasVoted, setHasVoted] = useState(false);
  const [voteStats, setVoteStats] = useState<{u1: number, u2: number} | null>(null);

  const handleVote = async (predictedUniverse: string) => {
    if (!universe1 || !universe2) return;
    setHasVoted(true);
    
    try {
      const unis = [universe1, universe2].sort();
      const matchId = `universe_${unis[0]}_vs_${unis[1]}`.replace(/[^a-zA-Z0-9_]/g, '_');
      const docRef = doc(db, 'predictions', matchId);
      
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, { [universe1]: predictedUniverse === universe1 ? 1 : 0, [universe2]: predictedUniverse === universe2 ? 1 : 0 });
        setVoteStats({ u1: predictedUniverse === universe1 ? 1 : 0, u2: predictedUniverse === universe2 ? 1 : 0 });
      } else {
        await updateDoc(docRef, { [predictedUniverse]: increment(1) });
        const data = docSnap.data();
        setVoteStats({ 
          u1: (data[universe1] || 0) + (predictedUniverse === universe1 ? 1 : 0),
          u2: (data[universe2] || 0) + (predictedUniverse === universe2 ? 1 : 0)
        });
      }
    } catch (e) {
      console.error("Firebase unavailable or not configured. Proceeding directly.", e);
    }

    setTimeout(() => {
      setHasVoted(false);
      setVoteStats(null);
      setBattleState('countdown');
    }, 2500);
  };

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
          ) : battleState === 'prediction' ? (
            <motion.div
              key="prediction"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center gap-3 w-48 md:w-64"
            >
              <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-xs md:text-[10px] whitespace-nowrap text-center">
                {hasVoted ? "Community Consensus" : "Who do you think wins?"}
              </h3>
              {!hasVoted ? (
                <div className="flex gap-2 mt-1 w-full justify-center">
                  <button
                    onClick={() => handleVote(universe1 as string)}
                    className="flex-1 py-3 px-2 bg-zinc-900 border border-zinc-700 hover:border-red-500 rounded-xl text-white font-bold text-[9px] md:text-[10px] uppercase tracking-wider transition-all hover:bg-zinc-800 break-words line-clamp-2 leading-tight"
                  >
                    {universe1}
                  </button>
                  <button
                    onClick={() => handleVote(universe2 as string)}
                    className="flex-1 py-3 px-2 bg-zinc-900 border border-zinc-700 hover:border-blue-500 rounded-xl text-white font-bold text-[9px] md:text-[10px] uppercase tracking-wider transition-all hover:bg-zinc-800 break-words line-clamp-2 leading-tight"
                  >
                    {universe2}
                  </button>
                </div>
              ) : (
                <div className="flex w-full h-8 bg-zinc-900 rounded-full overflow-hidden border border-zinc-700 mt-2">
                  {voteStats && (voteStats.u1 + voteStats.u2 > 0) ? (
                    <>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(voteStats.u1 / (voteStats.u1 + voteStats.u2)) * 100}%` }}
                        className="h-full items-center justify-center flex text-[10px] font-black"
                        style={{ backgroundColor: universe1 ? getUniverseStats(universe1).color : 'red' }}
                      >
                         {Math.round((voteStats.u1 / (voteStats.u1 + voteStats.u2)) * 100)}%
                      </motion.div>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(voteStats.u2 / (voteStats.u1 + voteStats.u2)) * 100}%` }}
                        className="h-full items-center justify-center flex text-[10px] font-black"
                        style={{ backgroundColor: universe2 ? getUniverseStats(universe2).color : 'blue' }}
                      >
                         {Math.round((voteStats.u2 / (voteStats.u1 + voteStats.u2)) * 100)}%
                      </motion.div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-zinc-500">Calculating...</div>
                  )}
                </div>
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
