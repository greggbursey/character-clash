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
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold tracking-tighter uppercase italic text-white/90">
        Character Clash
      </h1>
      
      <div className="flex items-center gap-4">
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
                  placeholder="Search character or universe..."
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

        <div className="flex bg-zinc-900/80 backdrop-blur-md p-1 rounded-full border border-zinc-800">
          <button
            onClick={() => toggleMode('single')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === 'single' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <User size={16} />
            Single
          </button>
          <button
            onClick={() => toggleMode('battle')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === 'battle' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Swords size={16} />
            Battle
          </button>
          <button
            onClick={() => toggleMode('universe')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === 'universe' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Globe size={16} />
            Universe
          </button>
        </div>
      </div>
    </header>
  );
}
