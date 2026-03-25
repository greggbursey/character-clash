'use client';

import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

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
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4 pb-32 px-4 md:px-6 pt-2">
      {allUniverses
        .filter(u => u.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((uni) => {
          const stats = getUniverseStats(uni);
          const isSelected = uni === universe1 || uni === universe2;
          const isU1 = uni === universe1;
          const isU2 = uni === universe2;

          return (
            <button
              key={uni}
              onClick={() => selectUniverse(uni)}
              className={`relative flex flex-col items-center group transition-all duration-300 w-full ${
                isSelected ? 'scale-105 z-10' : 'hover:scale-105 hover:z-10'
              }`}
            >
              <div 
                className={`w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all duration-300 relative ${
                  isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                }`}
                style={{
                  borderColor: isSelected ? stats.color : 'transparent',
                  boxShadow: isSelected ? `0 0 20px ${stats.color}` : `0 0 0px transparent`,
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
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-center leading-tight drop-shadow-lg">
                    {uni}
                  </span>
                </div>
              </div>
              
              {/* Selection Indicators */}
              {(isU1 || isU2) && (
                <div 
                  className="absolute -top-2 -right-2 text-white text-[9px] md:text-[10px] font-black px-2 py-1 rounded-full uppercase z-20 shadow-lg"
                  style={{ backgroundColor: stats.color || '#3b82f6' }}
                >
                  {isU1 ? 'U1' : 'U2'}
                </div>
              )}

              <div className="mt-2 text-center w-full px-1">
                <div className={`text-[9px] md:text-[10px] font-bold truncate ${isSelected ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                  {uni.toUpperCase()}
                </div>
              </div>
            </button>
          );
        })}
    </div>
  );
}
