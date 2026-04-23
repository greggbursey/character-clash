'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Brain } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';
import { universeLoreData } from '@/data/universe-lore';

interface UniverseSelectionProps {
  allUniverses: string[];
  searchQuery: string;
  universe1: string | null;
  universe2: string | null;
  getUniverseStats: (uni: string) => { color: string; background: string };
  selectUniverse: (uni: string) => void;
}

export default function UniverseSelection({
  allUniverses,
  searchQuery,
  universe1,
  universe2,
  getUniverseStats,
  selectUniverse
}: UniverseSelectionProps) {
  return (
    <div className="pb-32 px-4 md:px-6">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4 md:gap-6 pt-8">
      {allUniverses
        .filter(u => u.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((uni) => {
          const stats = getUniverseStats(uni);
          const isSelected = uni === universe1 || uni === universe2;
          const hasSelection = universe1 !== null || universe2 !== null;
          const isU1 = uni === universe1;

          return (
            <button
              key={uni}
              onClick={() => selectUniverse(uni)}
              className={`relative flex flex-col items-center group transition-all duration-500 w-full ${
                isSelected ? 'scale-110 z-20 -translate-y-2' : 'hover:z-10'
              } ${hasSelection && !isSelected ? 'opacity-60 grayscale-[40%]' : 'opacity-100'}`}
            >
              <motion.div 
                className={`w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 relative ${
                  isSelected ? 'border-4' : 'border-2 border-white/5 hover:border-white/20'
                }`}
                animate={isSelected ? {
                  boxShadow: [
                    `0 0 20px ${stats.color}66, inset 0 0 20px ${stats.color}66`,
                    `0 0 50px ${stats.color}aa, inset 0 0 40px ${stats.color}aa`,
                    `0 0 20px ${stats.color}66, inset 0 0 20px ${stats.color}66`
                  ],
                  borderColor: ['#ffffff', stats.color, '#ffffff']
                } : {
                  boxShadow: '0 0 0px transparent',
                  borderColor: 'rgba(255,255,255,0.05)'
                }}
                transition={isSelected ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
                whileHover={!isSelected ? { scale: 1.05, y: -5 } : {}}
                style={{
                  backgroundColor: 'rgba(0,0,0,0.8)'
                }}
              >
                <Image
                  src={getAssetPath(stats.background)}
                  alt={uni}
                  fill
                  className={`object-cover transition-all duration-700 ${
                    isSelected ? 'scale-110 opacity-100' : 'opacity-40 group-hover:opacity-80 group-hover:scale-105'
                  }`}
                  referrerPolicy="no-referrer"
                />
                
                {/* Halftone Overlay for selected */}
                {isSelected && (
                  <div className="absolute inset-0 z-10 opacity-20 pointer-events-none mix-blend-overlay" 
                       style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '6px 6px' }} />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60" />
                
                <div className="absolute inset-x-0 bottom-0 p-3 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity z-20">
                   <Link 
                     href={`/portal?tab=Trivia&category=universe&value=${encodeURIComponent(uni)}`}
                     className="p-2 bg-black/80 rounded-xl hover:bg-purple-600 transition-all border border-white/20 hover:scale-110"
                     onClick={(e) => e.stopPropagation()}
                     title="Play Universe Trivia"
                   >
                     <Brain size={16} className="text-purple-300" />
                   </Link>
                </div>
              </motion.div>
              
              {/* Selection Indicators */}
              {isSelected && (
                <motion.div 
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute -top-4 -right-4 text-white text-xs md:text-sm font-black px-4 py-2 rounded-2xl uppercase z-30 shadow-[0_10px_25px_rgba(0,0,0,0.6)] border-2 border-white/30"
                  style={{ backgroundColor: stats.color || '#3b82f6' }}
                >
                  {isU1 ? 'U1' : 'U2'}
                </motion.div>
              )}

              <div className="mt-4 text-center w-full px-2">
                <div className={`text-xs md:text-sm font-black tracking-tighter transition-all duration-300 ${
                  isSelected ? 'text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-zinc-500 group-hover:text-zinc-200'
                }`}>
                  <span className="mr-2 text-lg">{universeLoreData[uni]?.emoji}</span>
                  {uni.toUpperCase()}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
