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
    <div className="flex overflow-x-auto pb-6 pt-2 gap-4 snap-x snap-mandatory hide-scrollbar">
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
              className={`relative flex-shrink-0 snap-center group transition-all duration-300 ${
                isSelected ? 'scale-110 z-10' : 'hover:scale-105 hover:z-10'
              }`}
            >
              <div 
                className={`w-32 h-20 md:w-40 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 relative ${
                  isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                }`}
                style={{
                  borderColor: isSelected ? stats.color : '#3f3f46',
                  boxShadow: isSelected ? `0 0 20px ${stats.color}` : `0 0 0px transparent`,
                }}
              >
                <Image
                  src={getAssetPath(stats.background)}
                  alt={uni}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <span className="text-sm font-black uppercase tracking-tighter text-center leading-tight drop-shadow-md">
                    {uni}
                  </span>
                </div>
              </div>
              
              {isU1 && (
                <div className="absolute -top-2 -left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase z-20">
                  U1
                </div>
              )}
              {isU2 && (
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase z-20">
                  U2
                </div>
              )}
            </button>
          );
        })}
    </div>
  );
}
