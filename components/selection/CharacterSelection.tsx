'use client';

import { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState<string>('All');
  
  // Reset tab if active tab gets filtered out by search
  if (activeTab !== 'All' && !universes.includes(activeTab)) {
    setActiveTab('All');
  }

  const renderUniverses = activeTab === 'All' ? universes : [activeTab];

  return (
    <div className="flex flex-col relative w-full">
      {/* Tabs Header - Sticky at the top with a premium glass effect */}
      <div className="flex flex-col gap-4 pb-6 pt-2 px-4 flex-shrink-0 sticky top-0 z-50 bg-white/[0.03] backdrop-blur-3xl rounded-b-[3rem] -mx-4 md:-mx-6 mb-12 px-4 md:px-6 py-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border-b border-white/10 transition-all duration-700 ease-in-out group/nav">
        {/* Subtle top glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        {/* "All" button as a distinct, premium header-like element */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (activeTab !== 'All') {
                setActiveTab('All');
                onUniverseChange?.();
              }
            }}
            className={`group relative flex items-center gap-3 px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden ${
              activeTab === 'All'
                ? 'bg-white text-zinc-950 shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-105'
                : 'bg-zinc-900/40 text-zinc-500 hover:text-white border border-white/5 backdrop-blur-sm'
            }`}
          >
            {activeTab === 'All' && (
              <motion.div 
                layoutId="all-bg-glow"
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-white/5 to-purple-500/10 opacity-50"
              />
            )}
            <span className={`text-lg transition-transform duration-300 ${activeTab === 'All' ? 'scale-110' : 'group-hover:scale-110'}`}>🌍</span>
            <span className="relative z-10">All Universes</span>
            {activeTab === 'All' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-zinc-950/20 rounded-full" />
            )}
          </button>
          
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        {/* Individual Universe Tabs */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {universes.map(u => {
            const uniColor = groupedCharacters[u]?.[0]?.color || '#ffffff';
            const isSelected = activeTab === u;
            


            return (
              <button
                key={u}
                onClick={() => {
                  if (activeTab !== u) {
                    setActiveTab(u);
                    onUniverseChange?.();
                  }
                }}
                className={`relative px-5 py-2.5 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-500 border backdrop-blur-md group overflow-hidden ${
                  isSelected 
                    ? 'scale-110 shadow-[0_0_30px_rgba(255,255,255,0.1)] z-10' 
                    : 'opacity-60 hover:opacity-100 hover:scale-105 bg-white/[0.02] border-white/5 hover:border-white/20'
                }`}
                style={{
                  backgroundColor: isSelected ? `${uniColor}40` : 'transparent',
                  color: isSelected ? '#ffffff' : '#94a3b8',
                  borderColor: isSelected ? `${uniColor}80` : undefined,
                }}
              >
                {isSelected && (
                  <motion.div 
                    layoutId="tab-glow"
                    className="absolute inset-0 opacity-30 blur-xl pointer-events-none"
                    style={{ backgroundColor: uniColor }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <span className={`relative z-10 mr-2 transition-transform duration-500 group-hover:rotate-12 inline-block ${isSelected ? 'rotate-12' : ''}`}>
                  {universeLoreData[u]?.emoji || '🎭'}
                </span>
                <span className="relative z-10 pointer-events-none">{u}</span>
              </button>
            )})}
        </div>
      </div>

      {/* Grid Container */}
      <div className="pb-32 px-1 md:px-2">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8 md:gap-16 pt-2"
          >
            {renderUniverses.map(universe => (
              <div key={universe} className="flex flex-col gap-6">
                {/* Universe Header Section - Sticky below the main tabs */}
                {activeTab === 'All' && (
                  <div 
                    className="sticky top-[148px] md:top-[180px] z-40 -mx-4 md:-mx-6 px-4 md:px-6 py-4 bg-zinc-950/95 backdrop-blur-3xl border-b border-white/5 shadow-2xl overflow-hidden group"
                    style={{ 
                      background: `linear-gradient(90deg, #09090b 0%, ${groupedCharacters[universe]?.[0]?.color}15 100%)`
                    }}
                  >
                    {/* Decorative glow line */}
                    <div 
                      className="absolute bottom-0 left-0 h-[1px] w-48 transition-all duration-500 group-hover:w-full"
                      style={{ background: `linear-gradient(90deg, ${groupedCharacters[universe]?.[0]?.color}, transparent)` }}
                    />

                    <div className="flex items-center gap-4">
                      <h3 
                        className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] flex items-center gap-3 drop-shadow-sm"
                        style={{ color: groupedCharacters[universe]?.[0]?.color || '#f4f4f5' }}
                      >
                        <span className="text-base md:text-lg filter saturate-150 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                          {universeLoreData[universe]?.emoji || '🎭'}
                        </span>
                        {universe}
                      </h3>
                      
                      <div className="w-[1px] h-4 bg-white/10 mx-1" />
                      
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hidden sm:block opacity-60">
                        {groupedCharacters[universe]?.length} Fighters
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Character Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-3 md:gap-4 px-1">
                  {groupedCharacters[universe]?.map(char => {
                    const isSelected = char.id === char1?.id || char.id === char2?.id;
                    const isP1 = char.id === char1?.id;
                    const isP2 = char.id === char2?.id;

                    return (
                      <button
                        key={char.id}
                        onClick={() => selectCharacter(char)}
                        className={`relative flex flex-col items-center group transition-all duration-300 w-full ${
                          isSelected ? 'scale-105 z-10' : 'hover:scale-105 hover:z-10'
                        }`}
                      >
                        <div 
                          className={`w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                            isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                          }`}
                          style={{
                            borderColor: isSelected ? char.color : 'transparent',
                            boxShadow: isSelected ? `0 0 20px ${char.color}` : `0 0 0px transparent`,
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
                        </div>
                        
                        {/* Selection Indicators */}
                        {mode === 'battle' && (isP1 || isP2) && (
                          <div 
                            className="absolute -top-2 -right-2 text-white text-[9px] md:text-[10px] font-black px-2 py-1 rounded-full uppercase z-20 shadow-lg"
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

      {/* Sticky Selected Combatants Tray (Battle Mode only) */}
      {mode === 'battle' && (char1 || char2) && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:w-max bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 p-3 md:p-4 rounded-3xl flex items-center justify-between md:justify-center gap-4 md:gap-8 shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 animate-in slide-in-from-bottom-5">
          {/* P1 Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-zinc-700 overflow-hidden bg-zinc-900 shadow-inner flex items-center justify-center relative">
              {char1 ? (
                <>
                  <Image src={getAssetPath(char1.previewUrl)} alt={char1.name} fill className="object-cover opacity-80" />
                  <div className="absolute inset-0 border-2 rounded-xl" style={{ borderColor: char1.color }} />
                </>
              ) : (
                <span className="text-zinc-700 font-black text-xs">P1</span>
              )}
            </div>
            <div className="hidden sm:block">
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Player 1</div>
              <div className="text-xs font-black text-zinc-200 truncate max-w-[100px]">{char1 ? char1.name : 'Waiting...'}</div>
            </div>
          </div>

          <div className="text-zinc-600 font-black italic text-xl md:text-2xl pt-1">VS</div>

          {/* P2 Section */}
          <div className="flex items-center gap-3 flex-row-reverse sm:flex-row">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-zinc-700 overflow-hidden bg-zinc-900 shadow-inner flex items-center justify-center relative">
              {char2 ? (
                <>
                  <Image src={getAssetPath(char2.previewUrl)} alt={char2.name} fill className="object-cover opacity-80" />
                  <div className="absolute inset-0 border-2 rounded-xl" style={{ borderColor: char2.color }} />
                </>
              ) : (
                <span className="text-zinc-700 font-black text-xs">P2</span>
              )}
            </div>
            <div className="hidden sm:block text-right sm:text-left">
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Player 2</div>
              <div className="text-xs font-black text-zinc-200 truncate max-w-[100px]">{char2 ? char2.name : 'Waiting...'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
