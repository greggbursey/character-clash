'use client';

import { Search, X, User, Swords, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Mode } from '@/types';

interface HeaderProps {
  mode: Mode;
  toggleMode: (newMode: Mode) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({
  mode,
  toggleMode,
  isSearchOpen,
  setIsSearchOpen,
  searchQuery,
  setSearchQuery
}: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-6 mb-3 md:mb-8 flex-shrink-0">
      <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic text-white/90">
        Character Clash
      </h1>
      
      <div className="flex flex-wrap justify-center items-center gap-4">
        {/* Search Bar */}
        <div className="relative flex items-center">
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 240, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="overflow-hidden mr-2"
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (isSearchOpen) setSearchQuery('');
            }}
            className={`p-2 rounded-full transition-colors ${
              isSearchOpen ? 'bg-red-600 text-white' : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
        </div>

        <div className="flex bg-zinc-900/80 backdrop-blur-md p-1 rounded-full border border-zinc-800 overflow-x-auto max-w-[calc(100vw-2rem)] hide-scrollbar">
          <button
            onClick={() => toggleMode('single')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              mode === 'single' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <User size={14} className="sm:w-4 sm:h-4" />
            Single
          </button>
          <button
            onClick={() => toggleMode('battle')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              mode === 'battle' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Swords size={14} className="sm:w-4 sm:h-4" />
            Battle
          </button>
          <button
            onClick={() => toggleMode('universe')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              mode === 'universe' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Globe size={14} className="sm:w-4 sm:h-4" />
            Universe
          </button>
        </div>
      </div>
    </header>
  );
}
