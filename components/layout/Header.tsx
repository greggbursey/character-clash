'use client';

import { Search, X, User, Swords, Globe, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
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
      <motion.h1 
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none select-none py-1"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          Character
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-red-400 via-red-600 to-red-800 drop-shadow-[0_0_15px_rgba(220,38,38,0.6)] ml-2">
          Clash
        </span>
      </motion.h1>
      
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

        <Link
          href="/portal"
          className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-500"
        >
          <BarChart3 size={14} className="sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Portal</span>
        </Link>
      </div>
    </header>
  );
}
