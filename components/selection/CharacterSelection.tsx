'use client';

import { useState } from 'react';
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
    <div className="flex flex-col h-full min-h-0 relative">
      {/* Tabs Header */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4 pt-1 px-4 flex-shrink-0 snap-x">
        <button
          onClick={() => {
            if (activeTab !== 'All') {
              setActiveTab('All');
              onUniverseChange?.();
            }
          }}
          className={`flex-shrink-0 px-5 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all shadow-sm snap-start ${
            activeTab === 'All' 
              ? 'bg-zinc-100 text-zinc-900 shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
              : 'bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          All Universes
        </button>
        {universes.map(u => {
          const uniColor = groupedCharacters[u]?.[0]?.color || '#ffffff';
          const isSelected = activeTab === u;
          
          // Helper to check if color is light (for text contrast)
          const isLight = (color: string) => {
            const hex = color.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            return brightness > 155;
          };

          const lightMode = isLight(uniColor);

          return (
          <button
            key={u}
            onClick={() => {
              if (activeTab !== u) {
                setActiveTab(u);
                onUniverseChange?.();
              }
            }}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border snap-start`}
            style={{
              backgroundColor: isSelected ? uniColor : `${uniColor}15`,
              color: isSelected ? (lightMode ? '#000000' : '#ffffff') : '#a1a1aa',
              borderColor: isSelected ? uniColor : `${uniColor}30`,
              boxShadow: isSelected ? `0 0 15px ${uniColor}40` : 'none'
            }}
          >
            {u}
          </button>
        )})}
      </div>

      {/* Grid Container */}
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-32 px-4 md:px-6">
        <div className="flex flex-col gap-8 md:gap-12 pt-2">
          {renderUniverses.map(universe => (
            <div key={universe} className="flex flex-col gap-4">
              {/* Universe Header Section */}
              {activeTab === 'All' && (
                <div className="flex items-center gap-4">
                  <h3 
                    className="text-sm md:text-base font-black uppercase tracking-[0.2em]"
                    style={{ color: groupedCharacters[universe]?.[0]?.color || '#f4f4f5' }}
                  >
                    {universe}
                  </h3>
                  <div 
                    className="h-px flex-1" 
                    style={{ background: `linear-gradient(to right, ${groupedCharacters[universe]?.[0]?.color}60, transparent)` }}
                  />
                </div>
              )}
              
              {/* Character Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
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
        </div>
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
