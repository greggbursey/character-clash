'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import Image from 'next/image';
import { Character, Mode, BattleState } from '@/types';
import { getAssetPath } from '@/lib/utils';

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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      // gamma is left-to-right (-90 to 90)
      // beta is front-to-back (-180 to 180)
      if (e.gamma !== null && e.beta !== null) {
        const x = Math.min(Math.max(e.gamma / 45, -1), 1);
        const y = Math.min(Math.max((e.beta - 45) / 45, -1), 1);
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    let orientationAdded = false;

    const enableOrientation = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted' && !orientationAdded) {
            window.addEventListener('deviceorientation', handleDeviceOrientation, false);
            orientationAdded = true;
          }
        } catch (error) {
          // Ignore errors
        }
      } else if (!orientationAdded) {
        window.addEventListener('deviceorientation', handleDeviceOrientation, false);
        orientationAdded = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Try immediately for non-iOS
    if (typeof (DeviceOrientationEvent as any).requestPermission !== 'function') {
      enableOrientation();
    }

    // iOS requires user interaction to request permissions
    window.addEventListener('click', enableOrientation, { once: true });
    window.addEventListener('touchstart', enableOrientation, { once: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (orientationAdded) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
      window.removeEventListener('click', enableOrientation);
      window.removeEventListener('touchstart', enableOrientation);
    };
  }, [mouseX, mouseY]);

  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothX, [-1, 1], [-30, 30]);
  const parallaxY = useTransform(smoothY, [-1, 1], [-30, 30]);

  return (
    <div className="fixed inset-0 z-0 flex overflow-hidden">
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
            className="absolute inset-[-5%] overflow-hidden"
            style={{ x: parallaxX, y: parallaxY }}
          >
            <Image
              src={char1 ? getAssetPath(char1.backgroundUrl) : "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=1920"}
              alt={char1 ? char1.name : "Superheroes Collage"}
              fill
              className="object-cover opacity-50 blur-sm scale-110"
              referrerPolicy="no-referrer"
            />
            <div 
              className="absolute inset-0 mix-blend-overlay opacity-60" 
              style={{ backgroundColor: char1 ? char1.color : '#3f3f46' }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          </motion.div>
        )}

        {(mode === 'battle' || mode === 'universe') && (battleState === 'story' || battleState === 'countdown') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0, 0.4, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-red-500/10 mix-blend-overlay z-10 pointer-events-none"
          />
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
              animate={{ width: battleState === 'result' ? (winner === 1 ? '75%' : '25%') : (battleState === 'story' ? '50%' : '50%') }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait">
                {char1 ? (
                  <motion.div
                    key={`left-${char1.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      filter: (battleState === 'result' && winner === 2) ? 'grayscale(100%) brightness(0.2)' : (battleState === 'story' ? 'blur(8px) brightness(0.4)' : 'grayscale(0%) brightness(1)')
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-[-5%] overflow-hidden"
                    style={{ x: parallaxX, y: parallaxY }}
                  >
                    <Image
                      src={getAssetPath(char1.backgroundUrl)}
                      alt={char1.name}
                      fill
                      className={`object-cover ${battleState === 'result' && winner === 1 ? 'opacity-100 blur-none scale-100' : 'opacity-60 blur-sm scale-110'}`}
                      referrerPolicy="no-referrer"
                    />
                    <div 
                      className={`absolute inset-0 mix-blend-overlay ${battleState === 'result' && winner === 1 ? 'opacity-30' : 'opacity-60'}`}
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
                    className="absolute inset-[-5%] overflow-hidden bg-zinc-900/20"
                    style={{ x: parallaxX, y: parallaxY }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=1920"
                      alt="Default"
                      fill
                      className="object-cover opacity-20 blur-md grayscale scale-110"
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
                      filter: (battleState === 'result' && winner === 1) ? 'grayscale(100%) brightness(0.2)' : (battleState === 'story' ? 'blur(8px) brightness(0.4)' : 'grayscale(0%) brightness(1)')
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-[-5%] overflow-hidden"
                    style={{ x: parallaxX, y: parallaxY }}
                  >
                    <Image
                      src={getAssetPath(char2.backgroundUrl)}
                      alt={char2.name}
                      fill
                      className={`object-cover ${battleState === 'result' && winner === 2 ? 'opacity-100 blur-none scale-100' : 'opacity-60 blur-sm scale-110'}`}
                      referrerPolicy="no-referrer"
                    />
                    <div 
                      className={`absolute inset-0 mix-blend-overlay ${battleState === 'result' && winner === 2 ? 'opacity-30' : 'opacity-60'}`}
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
                    className="absolute inset-[-5%] overflow-hidden bg-zinc-900/20"
                    style={{ x: parallaxX, y: parallaxY }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=1920"
                      alt="Default"
                      fill
                      className="object-cover opacity-20 blur-md grayscale scale-110"
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
            
            {/* Victory Overlay moved to page.tsx */}
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
                      filter: (battleState === 'result' && winner === 2) ? 'grayscale(100%) brightness(0.2)' : (battleState === 'story' ? 'blur(8px) brightness(0.4)' : 'grayscale(0%) brightness(1)')
                    }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-[-5%] overflow-hidden"
                    style={{ x: parallaxX, y: parallaxY }}
                  >
                    <Image
                      src={getAssetPath(getUniverseStats(universe1).background)}
                      alt={universe1}
                      fill
                      className={`object-cover ${battleState === 'result' && winner === 1 ? 'opacity-100 blur-none scale-100' : 'opacity-60 blur-sm scale-110'}`}
                      referrerPolicy="no-referrer"
                    />
                    <div 
                      className={`absolute inset-0 mix-blend-overlay ${battleState === 'result' && winner === 1 ? 'opacity-30' : 'opacity-60'}`}
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
                    className="absolute inset-[-5%] overflow-hidden"
                    style={{ x: parallaxX, y: parallaxY }}
                  >
                    <Image
                      src="https://miro.medium.com/v2/resize:fit:1400/1*A3q00aZNYvh5qoJNiorEeg.jpeg"
                      alt="Universe Default"
                      fill
                      className="object-cover opacity-30 blur-sm brightness-50 scale-110"
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
                      filter: (battleState === 'result' && winner === 1) ? 'grayscale(100%) brightness(0.2)' : (battleState === 'story' ? 'blur(8px) brightness(0.4)' : 'grayscale(0%) brightness(1)')
                    }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-[-5%] overflow-hidden"
                    style={{ x: parallaxX, y: parallaxY }}
                  >
                    <Image
                      src={getAssetPath(getUniverseStats(universe2).background)}
                      alt={universe2}
                      fill
                      className={`object-cover ${battleState === 'result' && winner === 2 ? 'opacity-100 blur-none scale-100' : 'opacity-60 blur-sm scale-110'}`}
                      referrerPolicy="no-referrer"
                    />
                    <div 
                      className={`absolute inset-0 mix-blend-overlay ${battleState === 'result' && winner === 2 ? 'opacity-30' : 'opacity-60'}`}
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
                    className="absolute inset-[-5%] overflow-hidden"
                    style={{ x: parallaxX, y: parallaxY }}
                  >
                    <Image
                      src="https://lsc.org/a360c87dad4512ce6cb6f84fc5978602.jpg"
                      alt="Universe Default"
                      fill
                      className="object-cover opacity-30 blur-sm brightness-50 scale-110"
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

            {/* Victory Overlay moved to page.tsx */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
