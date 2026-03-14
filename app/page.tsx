'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { characters, Character } from '@/data/characters';
import Image from 'next/image';
import { Swords, User, X, Info, Search, Globe } from 'lucide-react';

type Mode = 'single' | 'battle' | 'universe';
type BattleState = 'idle' | 'countdown' | 'result';

export default function Home() {
  const [mode, setMode] = useState<Mode>('single');
  const [char1, setChar1] = useState<Character | null>(null);
  const [char2, setChar2] = useState<Character | null>(null);
  const [universe1, setUniverse1] = useState<string | null>(null);
  const [universe2, setUniverse2] = useState<string | null>(null);
  const [battleState, setBattleState] = useState<BattleState>('idle');
  const [countdown, setCountdown] = useState(3);
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const [selectedLoreChar, setSelectedLoreChar] = useState<Character | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filtered and Grouped characters
  const filteredCharacters = useMemo(() => {
    return characters.filter(char => 
      char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.universe.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const groupedCharacters = useMemo(() => {
    const groups: Record<string, Character[]> = {};
    filteredCharacters.forEach(char => {
      if (!groups[char.universe]) {
        groups[char.universe] = [];
      }
      groups[char.universe].push(char);
    });
    return groups;
  }, [filteredCharacters]);

  const universes = useMemo(() => Object.keys(groupedCharacters), [groupedCharacters]);

  const allUniverses = useMemo(() => {
    const unis = new Set<string>();
    characters.forEach(c => unis.add(c.universe));
    return Array.from(unis).sort();
  }, []);

  const getUniverseStats = (universeName: string) => {
    const chars = characters.filter(c => c.universe === universeName);
    const avgPower = chars.reduce((acc, c) => acc + c.powerScore, 0) / chars.length;
    return {
      count: chars.length,
      avgPower: Math.round(avgPower),
      color: chars[0]?.color || '#3f3f46',
      background: chars[0]?.backgroundUrl || ''
    };
  };

  // Handle character selection
  const selectCharacter = (char: Character) => {
    if (mode === 'single') {
      if (char1?.id === char.id) {
        setChar1(null);
      } else {
        setChar1(char);
      }
    } else if (mode === 'battle') {
      if (battleState !== 'idle') return; // Don't allow selection during battle
      
      if (char1?.id === char.id) {
        setChar1(null);
      } else if (char2?.id === char.id) {
        setChar2(null);
      } else if (!char1) {
        setChar1(char);
      } else if (!char2) {
        setChar2(char);
      } else {
        // If both are selected, replace P1 and clear P2
        setChar1(char);
        setChar2(null);
      }
    }
  };

  const selectUniverse = (uni: string) => {
    if (battleState !== 'idle') return;
    if (universe1 === uni) {
      setUniverse1(null);
    } else if (universe2 === uni) {
      setUniverse2(null);
    } else if (!universe1) {
      setUniverse1(uni);
    } else if (!universe2) {
      setUniverse2(uni);
    } else {
      setUniverse1(uni);
      setUniverse2(null);
    }
  };

  // Handle mode switch
  const toggleMode = (newMode: Mode) => {
    setMode(newMode);
    setChar1(null);
    setChar2(null);
    setUniverse1(null);
    setUniverse2(null);
    setBattleState('idle');
    setWinner(null);
  };

  // Start battle
  const startBattle = () => {
    if (mode === 'battle' && (!char1 || !char2)) return;
    if (mode === 'universe' && (!universe1 || !universe2)) return;
    setBattleState('countdown');
    setCountdown(3);
    setWinner(null);
  };

  // Countdown logic
  useEffect(() => {
    if (battleState === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else if (countdown === 0) {
        // Show FIGHT! for 1 second
        const timer = setTimeout(() => setCountdown(-1), 1000);
        return () => clearTimeout(timer);
      } else {
        // Choose winner based on power score with some randomness
        const timer = setTimeout(() => {
          if (mode === 'battle' && char1 && char2) {
            const score1 = char1.powerScore + (Math.random() * 20 - 10);
            const score2 = char2.powerScore + (Math.random() * 20 - 10);
            const calculatedWinner = score1 >= score2 ? 1 : 2;
            setWinner(calculatedWinner);
            setBattleState('result');
          } else if (mode === 'universe' && universe1 && universe2) {
            const stats1 = getUniverseStats(universe1);
            const stats2 = getUniverseStats(universe2);
            const score1 = stats1.avgPower + (Math.random() * 15 - 7.5);
            const score2 = stats2.avgPower + (Math.random() * 15 - 7.5);
            const calculatedWinner = score1 >= score2 ? 1 : 2;
            setWinner(calculatedWinner);
            setBattleState('result');
          }
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [battleState, countdown, char1, char2, universe1, universe2, mode]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-white font-sans">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 flex">
        {/* Lightning Effect */}
        <AnimatePresence>
          {battleState === 'countdown' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0, 0.9, 0, 0.5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute inset-0 bg-red-900 mix-blend-color-burn z-20 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {mode === 'single' && (
            <motion.div
              key={char1 ? `single-${char1.id}` : 'single-default'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={char1 ? char1.backgroundUrl : "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=1920"}
                alt={char1 ? char1.name : "Superheroes Collage"}
                fill
                className="object-cover opacity-50 blur-sm scale-105"
                referrerPolicy="no-referrer"
              />
              <div 
                className="absolute inset-0 mix-blend-overlay opacity-60" 
                style={{ backgroundColor: char1 ? char1.color : '#3f3f46' }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
            </motion.div>
          )}

          {mode === 'battle' && (
            <motion.div
              key="battle-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex"
            >
              {/* Left Side */}
              <motion.div 
                className="relative h-full"
                animate={{ width: battleState === 'result' ? (winner === 1 ? '75%' : '25%') : '50%' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <AnimatePresence mode="wait">
                  {char1 ? (
                    <motion.div
                      key={`left-${char1.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        filter: battleState === 'result' && winner === 2 ? 'grayscale(100%) brightness(0.2)' : 'grayscale(0%) brightness(1)'
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={char1.backgroundUrl}
                        alt={char1.name}
                        fill
                        className="object-cover opacity-60 blur-sm scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div 
                        className="absolute inset-0 mix-blend-overlay opacity-60" 
                        style={{ backgroundColor: char1.color }} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="left-default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-zinc-900/20"
                    >
                      <Image
                        src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=1920"
                        alt="Default"
                        fill
                        className="object-cover opacity-20 blur-md grayscale"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Right Side */}
              <motion.div 
                className="relative h-full"
                animate={{ width: battleState === 'result' ? (winner === 2 ? '75%' : '25%') : '50%' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <AnimatePresence mode="wait">
                  {char2 ? (
                    <motion.div
                      key={`right-${char2.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        filter: battleState === 'result' && winner === 1 ? 'grayscale(100%) brightness(0.2)' : 'grayscale(0%) brightness(1)'
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={char2.backgroundUrl}
                        alt={char2.name}
                        fill
                        className="object-cover opacity-60 blur-sm scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div 
                        className="absolute inset-0 mix-blend-overlay opacity-60" 
                        style={{ backgroundColor: char2.color }} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="right-default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-zinc-900/20"
                    >
                      <Image
                        src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=1920"
                        alt="Default"
                        fill
                        className="object-cover opacity-20 blur-md grayscale"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Center Divider */}
              <motion.div 
                animate={{ 
                  left: battleState === 'result' ? (winner === 1 ? '75%' : '25%') : '50%',
                  opacity: battleState === 'result' ? 0 : 1 
                }}
                className="absolute inset-y-0 w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-red-500/50 to-transparent z-10" 
              />
              
              {/* Massive Victory Overlay */}
              <AnimatePresence>
                {battleState === 'result' && (
                  <motion.div
                    initial={{ scale: 3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                  >
                    <div className="text-center">
                      <h2 
                        className="text-7xl md:text-[8rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-[0_10px_30px_rgba(220,38,38,0.8)]" 
                        style={{ WebkitTextStroke: '3px #b91c1c' }}
                      >
                        {winner === 1 ? char1?.name : char2?.name}
                      </h2>
                      <h3 className="text-5xl md:text-7xl font-black uppercase tracking-widest text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] mt-[-10px]">
                        WINS
                      </h3>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
          {mode === 'universe' && (
            <motion.div
              key="universe-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex"
            >
              {/* Left Side */}
              <motion.div 
                className="relative h-full"
                animate={{ width: battleState === 'result' ? (winner === 1 ? '75%' : '25%') : '50%' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <AnimatePresence mode="wait">
                  {universe1 ? (
                    <motion.div
                      key={`uni-left-${universe1}`}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        filter: battleState === 'result' && winner === 2 ? 'grayscale(100%) brightness(0.2)' : 'grayscale(0%) brightness(1)'
                      }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={getUniverseStats(universe1).background}
                        alt={universe1}
                        fill
                        className="object-cover opacity-60 blur-sm scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div 
                        className="absolute inset-0 mix-blend-overlay opacity-60" 
                        style={{ backgroundColor: getUniverseStats(universe1).color }} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80" />
                    </motion.div>
                  ) : (
                    <div className="absolute inset-0 bg-zinc-900/20" />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Right Side */}
              <motion.div 
                className="relative h-full"
                animate={{ width: battleState === 'result' ? (winner === 2 ? '75%' : '25%') : '50%' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <AnimatePresence mode="wait">
                  {universe2 ? (
                    <motion.div
                      key={`uni-right-${universe2}`}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        filter: battleState === 'result' && winner === 1 ? 'grayscale(100%) brightness(0.2)' : 'grayscale(0%) brightness(1)'
                      }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={getUniverseStats(universe2).background}
                        alt={universe2}
                        fill
                        className="object-cover opacity-60 blur-sm scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div 
                        className="absolute inset-0 mix-blend-overlay opacity-60" 
                        style={{ backgroundColor: getUniverseStats(universe2).color }} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80" />
                    </motion.div>
                  ) : (
                    <div className="absolute inset-0 bg-zinc-900/20" />
                  )}
                </AnimatePresence>
              </motion.div>
              
              <motion.div 
                animate={{ 
                  left: battleState === 'result' ? (winner === 1 ? '75%' : '25%') : '50%',
                  opacity: battleState === 'result' ? 0 : 1 
                }}
                className="absolute inset-y-0 w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent z-10" 
              />

              {/* Victory Overlay */}
              <AnimatePresence>
                {battleState === 'result' && (
                  <motion.div
                    initial={{ scale: 3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                  >
                    <div className="text-center">
                      <h2 className="text-7xl md:text-[8rem] font-black uppercase tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(37,99,235,0.8)]">
                        {winner === 1 ? universe1 : universe2}
                      </h2>
                      <h3 className="text-5xl md:text-7xl font-black uppercase tracking-widest text-white mt-[-10px]">
                        DOMINATES
                      </h3>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col h-screen p-6 md:p-12">
        {/* Header / Mode Toggle */}
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

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-center items-center">
          {mode === 'single' && (
            <AnimatePresence mode="wait">
              {char1 ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  key={`info-${char1.id}`}
                  className="max-w-2xl text-center space-y-4"
                >
                  <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                    {char1.name}
                  </h2>
                  <div className="flex items-center justify-center gap-4">
                    <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest">
                      Universe: {char1.universe}
                    </p>
                    <div className="h-4 w-px bg-zinc-700" />
                    <p className="text-sm font-mono text-yellow-500 uppercase tracking-widest font-bold">
                      Power: {char1.powerScore}
                    </p>
                  </div>
                  <p className="text-lg text-zinc-300 leading-relaxed max-w-xl mx-auto">
                    {char1.description}
                  </p>
                  <button
                    onClick={() => setSelectedLoreChar(char1)}
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white rounded-full text-sm font-medium transition-colors border border-zinc-700/50"
                  >
                    <Info size={16} />
                    Read More Background
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="single-empty"
                  className="text-center space-y-6"
                >
                  <div className="relative inline-block">
                    <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-full" />
                    <h2 className="relative text-5xl md:text-7xl font-black uppercase tracking-tighter text-white/20">
                      Choose Your<br />Champion
                    </h2>
                  </div>
                  <p className="text-zinc-500 font-mono text-sm uppercase tracking-[0.3em]">
                    Select a character below to begin
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {mode === 'battle' && (
            <div className="w-full max-w-5xl flex justify-between items-center">
              {/* Player 1 Info */}
              <div className="w-1/3 text-center">
                {char1 ? (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className={`space-y-2 transition-opacity duration-1000 ${battleState === 'result' && winner === 2 ? 'opacity-30' : 'opacity-100'}`}
                  >
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                      {char1.name}
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                        {char1.universe}
                      </p>
                      <div className="h-3 w-px bg-zinc-700" />
                      <p className="text-xs font-mono text-yellow-500 uppercase tracking-widest font-bold">
                        PWR: {char1.powerScore}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedLoreChar(char1)}
                      className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white rounded-full text-xs font-medium transition-colors border border-zinc-700/50"
                    >
                      <Info size={12} />
                      Background
                    </button>
                    {battleState === 'result' && winner === 1 && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-yellow-400 font-bold text-2xl uppercase tracking-widest mt-4"
                      >
                        Winner
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <div className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Select Player 1</div>
                )}
              </div>

              {/* VS / Battle Controls */}
              <div className="w-1/3 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {battleState === 'idle' ? (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center"
                    >
                      <div className="text-6xl font-black italic text-zinc-700 mb-6">VS</div>
                      {char1 && char2 && (
                        <button
                          onClick={startBattle}
                          className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                        >
                          Battle
                        </button>
                      )}
                    </motion.div>
                  ) : battleState === 'countdown' ? (
                    <motion.div
                      key={`countdown-${countdown}`}
                      initial={{ scale: 2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-7xl md:text-9xl font-black text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]"
                    >
                      {countdown > 0 ? countdown : 'FIGHT!'}
                    </motion.div>
                  ) : (
                    <motion.button
                      key="result"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      onClick={() => {
                        setBattleState('idle');
                        setChar1(null);
                        setChar2(null);
                      }}
                      className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                      Play Again
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Player 2 Info */}
              <div className="w-1/3 text-center">
                {char2 ? (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className={`space-y-2 transition-opacity duration-1000 ${battleState === 'result' && winner === 1 ? 'opacity-30' : 'opacity-100'}`}
                  >
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                      {char2.name}
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                        {char2.universe}
                      </p>
                      <div className="h-3 w-px bg-zinc-700" />
                      <p className="text-xs font-mono text-yellow-500 uppercase tracking-widest font-bold">
                        PWR: {char2.powerScore}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedLoreChar(char2)}
                      className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white rounded-full text-xs font-medium transition-colors border border-zinc-700/50"
                    >
                      <Info size={12} />
                      Background
                    </button>
                    {battleState === 'result' && winner === 2 && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-yellow-400 font-bold text-2xl uppercase tracking-widest mt-4"
                      >
                        Winner
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <div className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Select Player 2</div>
                )}
              </div>
            </div>
          )}

          {mode === 'universe' && (
            <div className="w-full max-w-5xl flex justify-between items-center">
              {/* Universe 1 Info */}
              <div className="w-1/3 text-center">
                {universe1 ? (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className={`space-y-2 transition-opacity duration-1000 ${battleState === 'result' && winner === 2 ? 'opacity-30' : 'opacity-100'}`}
                  >
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                      {universe1}
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                        {getUniverseStats(universe1).count} Fighters
                      </p>
                      <div className="h-3 w-px bg-zinc-700" />
                      <p className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">
                        AVG PWR: {getUniverseStats(universe1).avgPower}
                      </p>
                    </div>
                    {battleState === 'result' && winner === 1 && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-blue-400 font-bold text-2xl uppercase tracking-widest mt-4"
                      >
                        Dominates
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <div className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Select Universe 1</div>
                )}
              </div>

              {/* VS / Battle Controls */}
              <div className="w-1/3 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {battleState === 'idle' ? (
                    <motion.div
                      key="idle-uni"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center"
                    >
                      <div className="text-6xl font-black italic text-zinc-700 mb-6">VS</div>
                      {universe1 && universe2 && (
                        <button
                          onClick={startBattle}
                          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                        >
                          Clash
                        </button>
                      )}
                    </motion.div>
                  ) : battleState === 'countdown' ? (
                    <motion.div
                      key={`countdown-uni-${countdown}`}
                      initial={{ scale: 2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-7xl md:text-9xl font-black text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                    >
                      {countdown > 0 ? countdown : 'CLASH!'}
                    </motion.div>
                  ) : (
                    <motion.button
                      key="result-uni"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      onClick={() => {
                        setBattleState('idle');
                        setUniverse1(null);
                        setUniverse2(null);
                      }}
                      className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                      Play Again
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Universe 2 Info */}
              <div className="w-1/3 text-center">
                {universe2 ? (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className={`space-y-2 transition-opacity duration-1000 ${battleState === 'result' && winner === 1 ? 'opacity-30' : 'opacity-100'}`}
                  >
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                      {universe2}
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                        {getUniverseStats(universe2).count} Fighters
                      </p>
                      <div className="h-3 w-px bg-zinc-700" />
                      <p className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">
                        AVG PWR: {getUniverseStats(universe2).avgPower}
                      </p>
                    </div>
                    {battleState === 'result' && winner === 2 && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-blue-400 font-bold text-2xl uppercase tracking-widest mt-4"
                      >
                        Dominates
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <div className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Select Universe 2</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Selection Bar */}
        <div className={`mt-auto transition-opacity duration-500 ${battleState !== 'idle' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="mb-4 text-xs font-mono text-zinc-500 uppercase tracking-widest flex justify-between items-center">
            <span>
              {mode === 'universe' 
                ? (!universe1 ? 'Select Universe 1' : (!universe2 ? 'Select Universe 2' : 'Ready to Clash'))
                : (mode === 'single' ? 'Select a Character' : (!char1 ? 'Select Player 1' : (!char2 ? 'Select Player 2' : 'Ready to Battle')))
              }
            </span>
            {searchQuery && (
              <span className="text-red-500">
                Found {mode === 'universe' ? allUniverses.filter(u => u.toLowerCase().includes(searchQuery.toLowerCase())).length : filteredCharacters.length} results
              </span>
            )}
          </div>
          
          {mode === 'universe' ? (
            <div className="flex overflow-x-auto pb-6 pt-2 gap-4 snap-x snap-mandatory hide-scrollbar">
              {allUniverses
                .filter(u => u.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((uni) => {
                  const stats = getUniverseStats(uni);
                  const isSelected = uni === universe1 || uni === universe2;
                  const isU1 = uni === universe1;
                  const isU2 = uni === universe2;

                  return (
                    <button
                      key={uni}
                      onClick={() => selectUniverse(uni)}
                      className={`relative flex-shrink-0 snap-center group transition-all duration-300 ${
                        isSelected ? 'scale-110 z-10' : 'hover:scale-105 hover:z-10'
                      }`}
                    >
                      <div 
                        className={`w-32 h-20 md:w-40 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 relative ${
                          isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                        }`}
                        style={{
                          borderColor: isSelected ? stats.color : '#3f3f46',
                          boxShadow: isSelected ? `0 0 20px ${stats.color}` : `0 0 0px transparent`,
                        }}
                      >
                        <Image
                          src={stats.background}
                          alt={uni}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center p-2">
                          <span className="text-sm font-black uppercase tracking-tighter text-center leading-tight drop-shadow-md">
                            {uni}
                          </span>
                        </div>
                      </div>
                      
                      {isU1 && (
                        <div className="absolute -top-2 -left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase z-20">
                          U1
                        </div>
                      )}
                      {isU2 && (
                        <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase z-20">
                          U2
                        </div>
                      )}
                    </button>
                  );
                })}
            </div>
          ) : (
            <div className="flex overflow-x-auto pb-6 pt-2 gap-8 snap-x snap-mandatory hide-scrollbar">
              {universes.map((universe) => (
                <div key={universe} className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-zinc-800" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap">
                      {universe}
                    </span>
                    <div className="h-px w-8 bg-zinc-800" />
                  </div>
                  
                  <div className="flex gap-4">
                    {groupedCharacters[universe].map((char) => {
                      const isSelected = char.id === char1?.id || char.id === char2?.id;
                      const isP1 = char.id === char1?.id;
                      const isP2 = char.id === char2?.id;

                      return (
                        <button
                          key={char.id}
                          onClick={() => selectCharacter(char)}
                          className={`relative flex-shrink-0 snap-center group transition-all duration-300 ${
                            isSelected ? 'scale-110 z-10' : 'hover:scale-105 hover:z-10'
                          }`}
                        >
                          <div 
                            className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                              isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                            }`}
                            style={{
                              borderColor: char.color,
                              boxShadow: isSelected ? `0 0 20px ${char.color}` : `0 0 0px transparent`,
                            }}
                          >
                            <Image
                              src={char.previewUrl}
                              alt={char.name}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                              style={{ objectPosition: char.imagePosition || 'center' }}
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          
                          {/* Selection Indicators */}
                          {mode === 'battle' && isP1 && (
                            <div 
                              className="absolute -top-2 -left-2 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase z-20"
                              style={{ backgroundColor: char.color }}
                            >
                              P1
                            </div>
                          )}
                          {mode === 'battle' && isP2 && (
                            <div 
                              className="absolute -top-2 -right-2 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase z-20"
                              style={{ backgroundColor: char.color }}
                            >
                              P2
                            </div>
                          )}

                          <div className="mt-2 text-center">
                            <div className={`text-xs font-bold truncate w-20 md:w-24 ${isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                              {char.name}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              {universes.length === 0 && (
                <div className="w-full py-12 text-center text-zinc-600 font-mono text-sm uppercase tracking-widest">
                  No characters found matching &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Lore Modal */}
      <AnimatePresence>
        {selectedLoreChar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedLoreChar(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl"
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setSelectedLoreChar(null)}
                  className="p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="relative h-64 w-full">
                <Image
                  src={selectedLoreChar.backgroundUrl}
                  alt={selectedLoreChar.name}
                  fill
                  className="object-cover blur-sm scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                <div 
                  className="absolute inset-0 mix-blend-overlay opacity-40" 
                  style={{ backgroundColor: selectedLoreChar.color }} 
                />
              </div>
              
              <div className="p-8 -mt-20 relative z-10">
                <div 
                  className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-zinc-900 mb-4 shadow-xl"
                  style={{ backgroundColor: selectedLoreChar.color }}
                >
                  <Image
                    src={selectedLoreChar.previewUrl}
                    alt={selectedLoreChar.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: selectedLoreChar.imagePosition || 'center' }}
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">
                  {selectedLoreChar.name}
                </h2>
                
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {selectedLoreChar.universe}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-yellow-500/20 text-yellow-500 border border-yellow-500/30">
                    Power: {selectedLoreChar.powerScore}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <p className="text-zinc-300 leading-relaxed font-medium">
                    {selectedLoreChar.description}
                  </p>
                  <div className="h-px w-full bg-zinc-800" />
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    {selectedLoreChar.lore}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
