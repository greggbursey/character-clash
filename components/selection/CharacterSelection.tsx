'use client';


import Image from 'next/image';
import Link from 'next/link';
import { Brain } from 'lucide-react';
import { Character, Mode } from '@/types';
import { getAssetPath } from '@/lib/utils';
import { universeLoreData } from '@/data/universe-lore';
import { motion, AnimatePresence } from 'motion/react';

interface CharacterSelectionProps {
  mode: Mode;
  universes: string[];
  groupedCharacters: Record<string, Character[]>;
  char1: Character | null;
  char2: Character | null;
  selectCharacter: (char: Character) => void;
  onUniverseChange?: () => void;
}

export default function CharacterSelection({
  mode,
  universes,
  groupedCharacters,
  char1,
  char2,
  selectCharacter,
  onUniverseChange
}: CharacterSelectionProps) {

  return (
    <div className="flex flex-col relative w-full">
      {/* Grid Container */}
      <div className="pb-32 px-1 md:px-2 pt-2 md:pt-4">
        <AnimatePresence mode="wait">
          <motion.div 
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8 md:gap-16 pt-2"
          >
            {universes.map(universe => (
              <div key={universe} className="flex flex-col gap-6">
                {/* Universe Header Section */}
                <div className="flex items-center py-2 md:py-4 relative w-full mt-4 md:mt-8 mb-2">
                  <div className="flex items-center gap-3 relative z-10 pr-4">
                    <span className="text-2xl md:text-3xl filter drop-shadow-md select-none transform hover:scale-110 transition-transform">
                      {universeLoreData[universe]?.emoji || '🎭'}
                    </span>
                    <h2 
                      className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] bg-clip-text text-transparent"
                      style={{ 
                        backgroundImage: `linear-gradient(to right, #ffffff, ${groupedCharacters[universe]?.[0]?.color || '#a1a1aa'} 150%)` 
                      }}
                    >
                      {universe}
                    </h2>
                    <span className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest pl-3 md:pl-4 border-l border-zinc-800 flex-shrink-0">
                      {groupedCharacters[universe]?.length} Fighters
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent opacity-50" />
                </div>
                
                {/* Character Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4 md:gap-6 px-1">
                  {groupedCharacters[universe]?.map(char => {
                    const isSelected = char.id === char1?.id || char.id === char2?.id;
                    const hasSelection = char1 !== null || (mode === 'battle' && char2 !== null);
                    const isP1 = char.id === char1?.id;
                    const isP2 = char.id === char2?.id;

                    return (
                      <button
                        key={char.id}
                        onClick={() => selectCharacter(char)}
                        className={`relative flex flex-col items-center group transition-all duration-500 w-full ${
                          isSelected ? 'scale-110 z-20 -translate-y-2' : 'hover:z-10'
                        } ${hasSelection && !isSelected ? 'opacity-60 grayscale-[30%]' : 'opacity-100'}`}
                      >
                        <motion.div 
                          className={`w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 relative ${
                            isSelected ? 'opacity-100 z-10 border-4' : 'opacity-60 group-hover:opacity-100 border-2 border-transparent'
                          }`}
                          animate={isSelected ? {
                            boxShadow: [
                              `0 0 25px ${char.color}, inset 0 0 25px ${char.color}`, 
                              `0 0 60px ${char.color}, inset 0 0 40px ${char.color}`, 
                              `0 0 25px ${char.color}, inset 0 0 25px ${char.color}`
                            ],
                            borderColor: [
                              '#ffffff', 
                              char.color, 
                              '#ffffff'
                            ]
                          } : {
                            boxShadow: `0 0 0px transparent, inset 0 0 0px transparent`,
                          }}
                          transition={isSelected ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
                          style={{
                            backgroundColor: 'rgba(0,0,0,0.5)'
                          }}
                        >
                          <div className="absolute inset-x-0 bottom-0 p-2 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <Link 
                              href={`/portal?tab=Trivia&category=character&value=${char.id}`}
                              className="p-1.5 bg-black/60 rounded-lg hover:bg-purple-600/60 transition-colors border border-white/20"
                              onClick={(e) => e.stopPropagation()}
                              title="Play Character Trivia"
                            >
                              <Brain size={12} className="text-purple-300" />
                            </Link>
                          </div>
                          <Image
                            src={getAssetPath(char.previewUrl)}
                            alt={char.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover mix-blend-screen"
                            style={{ objectPosition: char.imagePosition || 'center' }}
                            referrerPolicy="no-referrer"
                          />
                        </motion.div>
                        
                        {/* Selection Indicators */}
                        {mode === 'battle' && (isP1 || isP2) && (
                          <div 
                            className="absolute -top-3 -right-3 text-white text-[10px] md:text-xs font-black px-3 py-1.5 rounded-full uppercase z-30 shadow-[0_5px_15px_rgba(0,0,0,0.5)] border border-white/20"
                            style={{ backgroundColor: char.color }}
                          >
                            {isP1 ? 'P1' : 'P2'}
                          </div>
                        )}

                        <div className="mt-2 text-center w-full px-1">
                          <div className={`text-[9px] md:text-[10px] font-bold truncate ${isSelected ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                            {char.name.toUpperCase()}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {universes.length === 0 && (
        <div className="w-full py-20 flex flex-col items-center justify-center text-zinc-600">
          <span className="text-4xl mb-4">🦇</span>
          <span className="font-mono text-sm uppercase tracking-widest">No characters found</span>
        </div>
      )}


    </div>
  );
}
