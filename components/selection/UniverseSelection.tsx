'use client';

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
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3 md:gap-4 pt-2">
      {allUniverses
        .filter(u => u.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((uni) => {
          const stats = getUniverseStats(uni);
          const isSelected = uni === universe1 || uni === universe2;
          const hasSelection = universe1 !== null || universe2 !== null;
          const isU1 = uni === universe1;
          const isU2 = uni === universe2;

          return (
            <button
              key={uni}
              onClick={() => selectUniverse(uni)}
              className={`relative flex flex-col items-center group transition-all duration-500 w-full ${
                isSelected ? 'scale-110 z-20 -translate-y-2' : hasSelection ? 'opacity-30 scale-95 hover:opacity-80 hover:scale-100' : 'hover:scale-105 hover:z-10'
              }`}
            >
              <div 
                className={`w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden border-4 transition-all duration-500 relative ${
                  isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                }`}
                style={{
                  borderColor: isSelected ? stats.color : 'transparent',
                  boxShadow: isSelected ? `0 0 40px ${stats.color}` : `0 0 0px transparent`,
                  backgroundColor: 'rgba(0,0,0,0.5)'
                }}
              >
                <Image
                  src={getAssetPath(stats.background)}
                  alt={uni}
                  fill
                  className="object-cover mix-blend-screen opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-x-0 bottom-0 p-2 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity">
                   <Link 
                     href={`/portal?tab=Trivia&category=universe&value=${encodeURIComponent(uni)}`}
                     className="p-1.5 bg-black/60 rounded-lg hover:bg-purple-600/60 transition-colors border border-white/20"
                     onClick={(e) => e.stopPropagation()}
                     title="Play Universe Trivia"
                   >
                     <Brain size={12} className="text-purple-300" />
                   </Link>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 gap-1">
                  <span className="text-xl md:text-2xl drop-shadow-md">
                    {universeLoreData[uni]?.emoji || '🎭'}
                  </span>
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-center leading-tight drop-shadow-lg">
                    {uni}
                  </span>
                </div>
              </div>
              
              {/* Selection Indicators */}
              {(isU1 || isU2) && (
                <div 
                  className="absolute -top-3 -right-3 text-white text-[10px] md:text-xs font-black px-3 py-1.5 rounded-full uppercase z-30 shadow-[0_5px_15px_rgba(0,0,0,0.5)] border border-white/20"
                  style={{ backgroundColor: stats.color || '#3b82f6' }}
                >
                  {isU1 ? 'U1' : 'U2'}
                </div>
              )}

              <div className="mt-2 text-center w-full px-1">
                <div className={`text-[9px] md:text-[10px] font-bold truncate ${isSelected ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                  {universeLoreData[uni]?.emoji} {uni.toUpperCase()}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
