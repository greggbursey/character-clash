'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Character } from '@/data/characters';

interface LoreModalProps {
  character: Character | null;
  onClose: () => void;
}

export default function LoreModal({ character, onClose }: LoreModalProps) {
  return (
    <AnimatePresence>
      {character && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar"
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={onClose}
                className="p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="relative h-64 w-full">
              <Image
                src={character.backgroundUrl}
                alt={character.name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
              <div 
                className="absolute inset-0 mix-blend-overlay opacity-40" 
                style={{ backgroundColor: character.color }} 
              />
            </div>
            
            <div className="p-8 -mt-20 relative z-10">
              <div 
                className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-zinc-900 mb-4 shadow-xl"
                style={{ backgroundColor: character.color }}
              >
                <Image
                  src={character.previewUrl}
                  alt={character.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: character.imagePosition || 'center' }}
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">
                {character.name}
              </h2>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {character.universe}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-yellow-500/20 text-yellow-500 border border-yellow-500/30">
                  Power: {character.powerScore}
                </span>
              </div>
              
              <div className="space-y-4">
                <p className="text-zinc-300 leading-relaxed font-medium">
                  {character.description}
                </p>
                <div className="h-px w-full bg-zinc-800" />
                <p className="text-zinc-400 leading-relaxed text-sm">
                  {character.lore}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
