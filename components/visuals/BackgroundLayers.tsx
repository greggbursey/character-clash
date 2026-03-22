'use client';

import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Character, Mode, BattleState } from '@/types';

interface BackgroundLayersProps {
  mode: Mode;
  battleState: BattleState;
  winner: 1 | 2 | null;
  char1: Character | null;
  char2: Character | null;
  universe1: string | null;
  universe2: string | null;
  getUniverseStats: (uni: string) => { color: string; background: string };
}

export default function BackgroundLayers({
  mode,
  battleState,
  winner,
  char1,
  char2,
  universe1,
  universe2,
  getUniverseStats
}: BackgroundLayersProps) {
  return (
    <div className="absolute inset-0 z-0 flex">
      {/* Lightning Effect */}
      <AnimatePresence>
        {battleState === 'countdown' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0, 0.9, 0, 0.5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-0 bg-red-900 mix-blend-color-burn z-20 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {mode === 'single' && (
          <motion.div
            key={char1 ? `single-${char1.id}` : 'single-default'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={char1 ? char1.backgroundUrl : "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=1920"}
              alt={char1 ? char1.name : "Superheroes Collage"}
              fill
              className="object-cover opacity-50 blur-sm scale-105"
              referrerPolicy="no-referrer"
            />
            <div 
              className="absolute inset-0 mix-blend-overlay opacity-60" 
              style={{ backgroundColor: char1 ? char1.color : '#3f3f46' }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          </motion.div>
        )}

        {mode === 'battle' && (
          <motion.div
            key="battle-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex"
          >
            {/* Left Side */}
            <motion.div 
              className="relative h-full"
              animate={{ width: battleState === 'result' ? (winner === 1 ? '75%' : '25%') : '50%' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait">
                {char1 ? (
                  <motion.div
                    key={`left-${char1.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      filter: battleState === 'result' && winner === 2 ? 'grayscale(100%) brightness(0.2)' : 'grayscale(0%) brightness(1)'
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={char1.backgroundUrl}
                      alt={char1.name}
                      fill
                      className="object-cover opacity-60 blur-sm scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div 
                      className="absolute inset-0 mix-blend-overlay opacity-60" 
                      style={{ backgroundColor: char1.color }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="left-default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-zinc-900/20"
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=1920"
                      alt="Default"
                      fill
                      className="object-cover opacity-20 blur-md grayscale"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right Side */}
            <motion.div 
              className="relative h-full"
              animate={{ width: battleState === 'result' ? (winner === 2 ? '75%' : '25%') : '50%' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait">
                {char2 ? (
                  <motion.div
                    key={`right-${char2.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      filter: battleState === 'result' && winner === 1 ? 'grayscale(100%) brightness(0.2)' : 'grayscale(0%) brightness(1)'
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={char2.backgroundUrl}
                      alt={char2.name}
                      fill
                      className="object-cover opacity-60 blur-sm scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div 
                      className="absolute inset-0 mix-blend-overlay opacity-60" 
                      style={{ backgroundColor: char2.color }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="right-default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-zinc-900/20"
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=1920"
                      alt="Default"
                      fill
                      className="object-cover opacity-20 blur-md grayscale"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Center Divider */}
            <motion.div 
              animate={{ 
                left: battleState === 'result' ? (winner === 1 ? '75%' : '25%') : '50%',
                opacity: battleState === 'result' ? 0 : 1 
              }}
              className="absolute inset-y-0 w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-red-500/50 to-transparent z-10" 
            />
            
            {/* Massive Victory Overlay */}
            <AnimatePresence>
              {battleState === 'result' && (
                <motion.div
                  initial={{ scale: 3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                >
                  <div className="text-center px-4">
                    <h2 
                      className="text-4xl md:text-[8rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-[0_10px_30px_rgba(220,38,38,0.8)]" 
                      style={{ WebkitTextStroke: '3px #b91c1c' }}
                    >
                      {winner === 1 ? char1?.name : char2?.name}
                    </h2>
                    <h3 className="text-2xl md:text-7xl font-black uppercase tracking-widest text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] mt-[-6px] md:mt-[-10px]">
                      WINS
                    </h3>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        {mode === 'universe' && (
          <motion.div
            key="universe-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex"
          >
            {/* Left Side */}
            <motion.div 
              className="relative h-full"
              animate={{ width: battleState === 'result' ? (winner === 1 ? '75%' : '25%') : '50%' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait">
                {universe1 ? (
                  <motion.div
                    key={`uni-left-${universe1}`}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      filter: battleState === 'result' && winner === 2 ? 'grayscale(100%) brightness(0.2)' : 'grayscale(0%) brightness(1)'
                    }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={getUniverseStats(universe1).background}
                      alt={universe1}
                      fill
                      className="object-cover opacity-60 blur-sm scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div 
                      className="absolute inset-0 mix-blend-overlay opacity-60" 
                      style={{ backgroundColor: getUniverseStats(universe1).color }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="uni-left-default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src="https://miro.medium.com/v2/resize:fit:1400/1*A3q00aZNYvh5qoJNiorEeg.jpeg"
                      alt="Universe Default"
                      fill
                      className="object-cover opacity-30 blur-sm brightness-50"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right Side */}
            <motion.div 
              className="relative h-full"
              animate={{ width: battleState === 'result' ? (winner === 2 ? '75%' : '25%') : '50%' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait">
                {universe2 ? (
                  <motion.div
                    key={`uni-right-${universe2}`}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      filter: battleState === 'result' && winner === 1 ? 'grayscale(100%) brightness(0.2)' : 'grayscale(0%) brightness(1)'
                    }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={getUniverseStats(universe2).background}
                      alt={universe2}
                      fill
                      className="object-cover opacity-60 blur-sm scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div 
                      className="absolute inset-0 mix-blend-overlay opacity-60" 
                      style={{ backgroundColor: getUniverseStats(universe2).color }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="uni-right-default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src="https://lsc.org/a360c87dad4512ce6cb6f84fc5978602.jpg"
                      alt="Universe Default"
                      fill
                      className="object-cover opacity-30 blur-sm brightness-50"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.div 
              animate={{ 
                left: battleState === 'result' ? (winner === 1 ? '75%' : '25%') : '50%',
                opacity: battleState === 'result' ? 0 : 1 
              }}
              className="absolute inset-y-0 w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent z-10" 
            />

            {/* Victory Overlay */}
            <AnimatePresence>
              {battleState === 'result' && (
                <motion.div
                  initial={{ scale: 3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                >
                  <div className="text-center px-4">
                    <h2 className="text-4xl md:text-[8rem] font-black uppercase tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(37,99,235,0.8)]">
                      {winner === 1 ? universe1 : universe2}
                    </h2>
                    <h3 className="text-2xl md:text-7xl font-black uppercase tracking-widest text-white mt-[-6px] md:mt-[-10px]">
                      DOMINATES
                    </h3>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
