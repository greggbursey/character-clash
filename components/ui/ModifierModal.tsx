'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Sword, Shield } from 'lucide-react';
import { Character } from '@/types';
import ReactMarkdown from 'react-markdown';

interface ModifierModalProps {
  character: Character | null;
  type: 'gear' | 'prep' | null;
  onClose: () => void;
}

export default function ModifierModal({ character, type, onClose }: ModifierModalProps) {
  if (!character || !type) return null;

  const isGear = type === 'gear';
  const description = isGear ? character.gearDescription : character.prepDescription;
  const title = isGear ? 'Gear & Equipment' : 'Strategy & Preparation';
  const Icon = isGear ? Sword : Shield;
  const themeColor = isGear ? 'text-blue-400' : 'text-purple-400';
  const bgColor = isGear ? 'bg-blue-500/10' : 'bg-purple-500/10';
  const borderColor = isGear ? 'border-blue-500/20' : 'border-purple-500/20';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl overflow-y-auto max-h-[80vh] hide-scrollbar"
        >
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className={`p-8 ${bgColor} border-b ${borderColor}`}>
            <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center mb-4 border ${borderColor}`}>
              <Icon className={themeColor} size={24} />
            </div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">
              {character.name}
            </h2>
            <h3 className={`text-2xl font-black uppercase tracking-tight text-white`}>
              {title}
            </h3>
          </div>

          <div className="p-8">
            <div className="prose prose-invert prose-zinc max-w-none">
              <div className="text-zinc-300 leading-relaxed font-medium [&>h3]:text-white [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>p]:mb-4">
                <ReactMarkdown>{description || 'No detailed tactical data available for this modifier.'}</ReactMarkdown>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-full mt-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-colors border border-zinc-700"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
