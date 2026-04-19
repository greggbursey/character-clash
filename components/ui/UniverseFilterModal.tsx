import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { universeLoreData } from '@/data/universe-lore';

interface UniverseFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  universes: string[];
  activeUniverse: string;
  setActiveUniverse: (uni: string) => void;
  groupedCharacters: Record<string, any[]>;
}

export default function UniverseFilterModal({
  isOpen,
  onClose,
  universes,
  activeUniverse,
  setActiveUniverse,
  groupedCharacters
}: UniverseFilterModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-zinc-950/90 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">
                Filter by Universe
              </h2>
              <p className="text-zinc-500 font-mono text-sm uppercase mt-1">
                Select a universe to narrow the roster
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-red-400 transition-colors text-zinc-400 group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Scrollable Grid */}
          <div className="flex-1 overflow-y-auto hide-scrollbar p-2 pb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {/* "All Universes" Option */}
              <button
                onClick={() => {
                  setActiveUniverse('All');
                  onClose();
                }}
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 border ${
                  activeUniverse === 'All'
                    ? 'bg-white/10 border-white/30 scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                    : 'bg-zinc-900/50 border-white/5 hover:bg-zinc-800'
                }`}
              >
                <span className="text-3xl md:text-4xl mb-2 filter drop-shadow-md">🌍</span>
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-center text-white">
                  All Universes
                </span>
              </button>

              {/* Individual Universes */}
              {universes.map((uni) => {
                const isSelected = activeUniverse === uni;
                const uniColor = groupedCharacters[uni]?.[0]?.color || '#ffffff';

                return (
                  <button
                    key={uni}
                    onClick={() => {
                      setActiveUniverse(uni);
                      onClose();
                    }}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 border overflow-hidden group ${
                      isSelected
                        ? 'scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)] z-10'
                        : 'bg-zinc-900/50 border-white/5 hover:scale-105'
                    }`}
                    style={{
                      backgroundColor: isSelected ? `${uniColor}30` : undefined,
                      borderColor: isSelected ? `${uniColor}80` : undefined,
                    }}
                  >
                    {isSelected && (
                      <div 
                        className="absolute inset-0 opacity-40 blur-xl pointer-events-none"
                        style={{ backgroundColor: uniColor }}
                      />
                    )}
                    <span className="relative z-10 text-3xl md:text-4xl mb-2 filter drop-shadow-md transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                      {universeLoreData[uni]?.emoji || '🎭'}
                    </span>
                    <span 
                      className={`relative z-10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center transition-colors ${
                        isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                      }`}
                    >
                      {uni}
                    </span>
                    <span className="relative z-10 text-[9px] font-mono mt-1 opacity-50 text-white">
                      {groupedCharacters[uni]?.length || 0} Fighters
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
