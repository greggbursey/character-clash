'use client';

import { useState } from 'react';

import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { Brain, X, Zap } from 'lucide-react';
import { Character } from '@/types';
import { getAssetPath } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

interface CharacterDetailsDrawerProps {
  char: Character | null;
  onClose: () => void;
  withGear: boolean;
  setWithGear: (val: boolean) => void;
  withPrep: boolean;
  setWithPrep: (val: boolean) => void;
}

export default function CharacterDetailsDrawer({ 
  char, 
  onClose,
  withGear,
  setWithGear,
  withPrep,
  setWithPrep
}: CharacterDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState<'lore' | 'modifiers'>('lore');
  const [isGearOpen, setIsGearOpen] = useState(false);
  const [isPrepOpen, setIsPrepOpen] = useState(false);

  return (
    <AnimatePresence>
      {char && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-[70] md:inset-y-0 md:right-0 md:left-auto md:w-[450px] bg-zinc-950/95 backdrop-blur-3xl border-t md:border-t-0 md:border-l border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col md:h-full max-h-[90vh] md:max-h-full rounded-t-[2.5rem] md:rounded-none overflow-hidden"
          >
            {/* Header w/ Image */}
            <div className="relative h-48 md:h-64 shrink-0 bg-zinc-900 border-b border-white/10 overflow-hidden">
              <div 
                className="absolute inset-0 opacity-40 mix-blend-color-dodge filter blur-xl"
                style={{ backgroundColor: char.color }}
              />
              <Image 
                src={getAssetPath(char.backgroundUrl) || getAssetPath(char.previewUrl)}
                alt={char.name}
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md transition-colors border border-white/20 z-10"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-none break-words drop-shadow-md">
                  {char.name}
                </h2>
                <div className="flex items-center flex-wrap gap-x-3 gap-y-2 mt-2 pr-6">
                  <div className="flex items-center gap-3">
                    <p className="text-xs font-mono text-zinc-300 uppercase tracking-widest hidden sm:block">
                      {char.universe}
                    </p>
                    <div className="h-3 w-px bg-zinc-500 hidden sm:block" />
                    <p className="text-xs font-mono text-yellow-500 uppercase tracking-widest font-bold flex items-center gap-1 shrink-0">
                      <Zap size={10} /> {(char.powerScore + (withGear ? (char.gearBonus || 0) : 0) + (withPrep ? (char.prepBonus || 0) : 0)).toLocaleString()}
                    </p>
                  </div>
                  
                  {/* Quick Toggles */}
                  <div className="flex items-center gap-1.5 sm:ml-auto">
                    {!!char.gearBonus && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setWithGear(!withGear); }}
                        className={`text-[9px] px-2.5 py-1 rounded-full uppercase font-black border transition-colors shadow-sm ${withGear ? 'bg-blue-500/20 text-blue-400 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'bg-black/40 text-zinc-400 border-white/10 hover:border-white/30 hover:text-zinc-200'}`}
                      >
                        +Gear
                      </button>
                    )}
                    {!!char.prepBonus && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setWithPrep(!withPrep); }}
                        className={`text-[9px] px-2.5 py-1 rounded-full uppercase font-black border transition-colors shadow-sm ${withPrep ? 'bg-purple-500/20 text-purple-400 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'bg-black/40 text-zinc-400 border-white/10 hover:border-white/30 hover:text-zinc-200'}`}
                      >
                        +Prep
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-20 md:pb-6 hide-scrollbar flex flex-col">
              
              {/* Tabs */}
              <div className="flex border-b border-white/10 mb-6 shrink-0">
                <button 
                  onClick={() => setActiveTab('lore')}
                  className={`flex-1 py-3 px-2 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-colors ${
                    activeTab === 'lore' 
                      ? 'text-white border-b-2 border-white' 
                      : 'text-zinc-500 hover:text-zinc-300 border-b-2 border-transparent'
                  }`}
                >
                  Briefing & Lore
                </button>
                <button 
                  onClick={() => setActiveTab('modifiers')}
                  className={`flex-1 py-3 px-2 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-colors ${
                    activeTab === 'modifiers' 
                      ? 'text-white border-b-2 border-white' 
                      : 'text-zinc-500 hover:text-zinc-300 border-b-2 border-transparent'
                  }`}
                >
                  Battle Modifiers
                </button>
              </div>

              <div className="flex-1 space-y-6">
                {activeTab === 'modifiers' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex flex-col gap-4">
                      {/* Gear Accordion */}
                      <div className={`rounded-xl border transition-all overflow-hidden ${
                        withGear 
                          ? 'bg-blue-500/20 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/50' 
                          : 'bg-blue-500/5 border-blue-500/10 hover:border-blue-500/30'
                      }`}>
                        <div 
                          className="flex justify-between items-center p-4 cursor-pointer select-none"
                          onClick={() => setIsGearOpen(!isGearOpen)}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-2 h-2 rounded-full ${withGear ? 'bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'bg-blue-500/30 border border-blue-500/50'}`}></span>
                            <div className="flex flex-col">
                              <span className={`text-xs font-black uppercase tracking-widest ${withGear ? 'text-blue-400' : 'text-blue-300/70'}`}>With Gear</span>
                              <span className={`text-[10px] font-mono font-bold ${withGear ? 'text-blue-300' : 'text-zinc-500'}`}>
                                +{ (char.gearBonus || 0).toLocaleString() } Power
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <button
                              onClick={(e) => { e.stopPropagation(); setWithGear(!withGear); }}
                              className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 shrink-0 ${withGear ? 'bg-blue-500' : 'bg-black/50 border border-white/10'}`}
                            >
                              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${withGear ? 'translate-x-4' : 'translate-x-0'}`} />
                            </button>
                          </div>
                        </div>
                        
                        <AnimatePresence>
                          {isGearOpen && char.gearDescription && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className={`px-4 pb-4 pt-1 text-sm leading-relaxed ${withGear ? 'text-blue-100' : 'text-zinc-400'} [&>p]:mb-2 [&>p:last-child]:mb-0 [&>strong]:text-white`}>
                                <div className="h-px w-full bg-blue-500/20 mb-4" />
                                <ReactMarkdown>{char.gearDescription}</ReactMarkdown>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Prep Accordion */}
                      <div className={`rounded-xl border transition-all overflow-hidden ${
                        withPrep 
                          ? 'bg-purple-500/20 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.15)] ring-1 ring-purple-500/50' 
                          : 'bg-purple-500/5 border-purple-500/10 hover:border-purple-500/30'
                      }`}>
                        <div 
                          className="flex justify-between items-center p-4 cursor-pointer select-none"
                          onClick={() => setIsPrepOpen(!isPrepOpen)}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-2 h-2 rounded-full ${withPrep ? 'bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]' : 'bg-purple-500/30 border border-purple-500/50'}`}></span>
                            <div className="flex flex-col">
                              <span className={`text-xs font-black uppercase tracking-widest ${withPrep ? 'text-purple-400' : 'text-purple-300/70'}`}>With Prep</span>
                              <span className={`text-[10px] font-mono font-bold ${withPrep ? 'text-purple-300' : 'text-zinc-500'}`}>
                                +{ (char.prepBonus || 0).toLocaleString() } Power
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <button
                              onClick={(e) => { e.stopPropagation(); setWithPrep(!withPrep); }}
                              className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 shrink-0 ${withPrep ? 'bg-purple-500' : 'bg-black/50 border border-white/10'}`}
                            >
                              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${withPrep ? 'translate-x-4' : 'translate-x-0'}`} />
                            </button>
                          </div>
                        </div>
                        
                        <AnimatePresence>
                          {isPrepOpen && char.prepDescription && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className={`px-4 pb-4 pt-1 text-sm leading-relaxed ${withPrep ? 'text-purple-100' : 'text-zinc-400'} [&>p]:mb-2 [&>p:last-child]:mb-0 [&>strong]:text-white`}>
                                <div className="h-px w-full bg-purple-500/20 mb-4" />
                                <ReactMarkdown>{char.prepDescription}</ReactMarkdown>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'lore' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="text-sm text-zinc-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 space-y-4">
                      <div className="[&>p]:mb-4 [&>p:last-child]:mb-0 [&>strong]:text-white">
                        <ReactMarkdown>{char.description}</ReactMarkdown>
                      </div>
                      {char.lore && (
                        <>
                          <div className="h-px w-full bg-white/10" />
                          <div className="text-zinc-400 [&>p]:mb-4 [&>p:last-child]:mb-0 [&>strong]:text-zinc-200">
                            <ReactMarkdown>{char.lore}</ReactMarkdown>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-4">
                <Link
                  href={`/portal?tab=Trivia&category=character&value=${char.id}`}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-purple-600/50 to-blue-600/50 hover:from-purple-500/60 hover:to-blue-500/60 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-white/20 shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Brain size={16} />
                  <span>Test Your Knowledge</span>
                </Link>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
