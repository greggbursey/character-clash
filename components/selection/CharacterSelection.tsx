'use client';

import Image from 'next/image';
import { Character, Mode } from '@/types';
import { getAssetPath } from '@/lib/utils';

interface CharacterSelectionProps {
  mode: Mode;
  universes: string[];
  groupedCharacters: Record<string, Character[]>;
  char1: Character | null;
  char2: Character | null;
  selectCharacter: (char: Character) => void;
}

export default function CharacterSelection({
  mode,
  universes,
  groupedCharacters,
  char1,
  char2,
  selectCharacter
}: CharacterSelectionProps) {
  return (
    <div className="flex overflow-x-auto overflow-y-hidden pb-3 pt-1 gap-6 md:gap-8 snap-x snap-mandatory hide-scrollbar min-h-0">
      {universes.map((universe) => (
        <div key={universe} className="flex flex-col gap-2 md:gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap">
              {universe}
            </span>
            <div className="h-px w-8 bg-zinc-800" />
          </div>
          
          <div className="flex gap-3 md:gap-4">
            {groupedCharacters[universe].map((char) => {
              const isSelected = char.id === char1?.id || char.id === char2?.id;
              const isP1 = char.id === char1?.id;
              const isP2 = char.id === char2?.id;

              return (
                <button
                  key={char.id}
                  onClick={() => selectCharacter(char)}
                  className={`relative flex-shrink-0 snap-center group transition-all duration-300 ${
                    isSelected ? 'scale-110 z-10' : 'hover:scale-105 hover:z-10'
                  }`}
                >
                  <div 
                    className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                    }`}
                    style={{
                      borderColor: char.color,
                      boxShadow: isSelected ? `0 0 20px ${char.color}` : `0 0 0px transparent`,
                    }}
                  >
                    <Image
                      src={getAssetPath(char.previewUrl)}
                      alt={char.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: char.imagePosition || 'center' }}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Selection Indicators */}
                  {mode === 'battle' && isP1 && (
                    <div 
                      className="absolute -top-2 -left-2 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase z-20"
                      style={{ backgroundColor: char.color }}
                    >
                      P1
                    </div>
                  )}
                  {mode === 'battle' && isP2 && (
                    <div 
                      className="absolute -top-2 -right-2 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase z-20"
                      style={{ backgroundColor: char.color }}
                    >
                      P2
                    </div>
                  )}

                  <div className="mt-1 md:mt-2 text-center">
                    <div className={`text-[10px] md:text-xs font-bold whitespace-normal leading-tight w-16 md:w-24 ${isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                      {char.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
      
      {universes.length === 0 && (
        <div className="w-full py-12 text-center text-zinc-600 font-mono text-sm uppercase tracking-widest">
          No characters found matching search terms
        </div>
      )}
    </div>
  );
}
