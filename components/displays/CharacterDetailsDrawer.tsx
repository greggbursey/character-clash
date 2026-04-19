'use client';

import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { Info, Brain, X, Zap } from 'lucide-react';
import { Character } from '@/types';
import { getAssetPath } from '@/lib/utils';

interface CharacterDetailsDrawerProps {
  char: Character | null;
  onClose: () => void;
  setSelectedLoreChar: (char: Character) => void;
  setSelectedModifier: (val: { char: Character; type: 'gear' | 'prep' } | null) => void;
  withGear: boolean;
  setWithGear: (val: boolean) => void;
  withPrep: boolean;
  setWithPrep: (val: boolean) => void;
}

export default function CharacterDetailsDrawer({ 
  char, 
  onClose,
  setSelectedLoreChar,
  setSelectedModifier,
  withGear,
  setWithGear,
  withPrep,
  setWithPrep
}: CharacterDetailsDrawerProps) {
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
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-xs font-mono text-zinc-300 uppercase tracking-widest hidden sm:block">
                    {char.universe}
                  </p>
                  <div className="h-3 w-px bg-zinc-500 hidden sm:block" />
                  <p className="text-xs font-mono text-yellow-500 uppercase tracking-widest font-bold flex items-center gap-1">
                    <Zap size={10} /> {(char.powerScore + (withGear ? (char.gearBonus || 0) : 0) + (withPrep ? (char.prepBonus || 0) : 0)).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-20 md:pb-6 hide-scrollbar space-y-6">
              
              {/* Modifiers */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">Battle Modifiers</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setWithGear(!withGear)}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all border flex justify-between items-center ${
                        withGear 
                          ? 'bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                          : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <span>With Gear</span>
                      <span className="text-[10px] font-mono opacity-80">
                        {withGear ? 'ENABLEd' : `+${(char.gearBonus || 0).toLocaleString()}`}
                      </span>
                    </button>
                    <button 
                      onClick={() => setSelectedModifier({ char, type: 'gear' })}
                      className="p-3 rounded-xl border border-white/5 text-zinc-400 hover:text-blue-400 hover:border-blue-500/30 transition-colors bg-zinc-900/50"
                    >
                      <Info size={16} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setWithPrep(!withPrep)}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all border flex justify-between items-center ${
                        withPrep 
                          ? 'bg-purple-500/10 border-purple-500/50 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)]' 
                          : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <span>With Prep</span>
                      <span className="text-[10px] font-mono opacity-80">
                        {withPrep ? 'ENABLEd' : `+${(char.prepBonus || 0).toLocaleString()}`}
                      </span>
                    </button>
                    <button 
                      onClick={() => setSelectedModifier({ char, type: 'prep' })}
                      className="p-3 rounded-xl border border-white/5 text-zinc-400 hover:text-purple-400 hover:border-purple-500/30 transition-colors bg-zinc-900/50"
                    >
                      <Info size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 pt-2">
                <h3 className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">Briefing</h3>
                <p className="text-sm text-zinc-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                  {char.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={() => { setSelectedLoreChar(char); onClose(); }}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors border border-white/10"
                >
                  <Info size={16} />
                  <span>Full Lore Background</span>
                </button>
                <Link
                  href={`/portal?tab=Trivia&category=character&value=${char.id}`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-600/50 to-blue-600/50 hover:from-purple-500/60 hover:to-blue-500/60 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-white/20 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
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
