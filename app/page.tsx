"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { characters } from "@/data/characters";
import { Mode, BattleState, Character } from "@/types";
import { doc, setDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Components
import Header from "@/components/layout/Header";
import LoreModal from "@/components/ui/LoreModal";
import ModifierModal from "@/components/ui/ModifierModal";
import BackgroundLayers from "@/components/visuals/BackgroundLayers";
import CharacterSelection from "@/components/selection/CharacterSelection";
import UniverseSelection from "@/components/selection/UniverseSelection";
import UniverseFilterModal from "@/components/ui/UniverseFilterModal";
import CombatActionBar from "@/components/ui/CombatActionBar";
import CharacterDetailsDrawer from "@/components/displays/CharacterDetailsDrawer";
import { useBattleMusic } from "@/hooks/use-battle-music";
import { universeLoreData } from "@/data/universe-lore";

export default function Home() {
  // State
  const [mode, setMode] = useState<Mode>("single");
  const [char1, setChar1] = useState<Character | null>(null);
  const [char2, setChar2] = useState<Character | null>(null);
  const [universe1, setUniverse1] = useState<string | null>(null);
  const [universe2, setUniverse2] = useState<string | null>(null);
  const [battleState, setBattleState] = useState<BattleState>("idle");
  const [countdown, setCountdown] = useState(3);
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const [selectedLoreChar, setSelectedLoreChar] = useState<Character | null>(
    null,
  );
  const [selectedModifier, setSelectedModifier] = useState<{
    char: Character;
    type: "gear" | "prep";
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeUniverse, setActiveUniverse] = useState<string>("All");
  const [isUniverseFilterOpen, setIsUniverseFilterOpen] = useState(false);
  const [activeDrawerSlot, setActiveDrawerSlot] = useState<1 | 2 | null>(null);
  const [withGear1, setWithGear1] = useState(false);
  const [withPrep1, setWithPrep1] = useState(false);
  const [withGear2, setWithGear2] = useState(false);
  const [withPrep2, setWithPrep2] = useState(false);

  // Audio hook
  const { start: startBattleMusic, stop: stopBattleMusic } = useBattleMusic();

  // Memoized Data
  const filteredCharacters = useMemo(() => {
    return characters.filter(
      (char) =>
        (universeLoreData[char.universe]?.active !== false) &&
        (char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         char.universe.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [searchQuery]);

  const groupedCharacters = useMemo(() => {
    const groups: Record<string, Character[]> = {};
    filteredCharacters.forEach((char) => {
      if (!groups[char.universe]) groups[char.universe] = [];
      groups[char.universe].push(char);
    });
    return groups;
  }, [filteredCharacters]);

  const sortedUniverses = useMemo(
    () => Object.keys(groupedCharacters),
    [groupedCharacters],
  );

  const allUniverses = useMemo(() => {
    const unis = new Set<string>();
    characters.forEach((c) => {
      if (universeLoreData[c.universe]?.active !== false) {
        unis.add(c.universe);
      }
    });
    return Array.from(unis).sort();
  }, []);

  // Helpers
  const getUniverseStats = useMemo(() => (universeName: string) => {
    const chars = characters.filter((c) => c.universe === universeName);
    const totalPower = chars.reduce((acc, c) => acc + c.powerScore, 0);
    const totalGear = chars.reduce((acc, c) => acc + (c.gearBonus || 0), 0);
    const totalPrep = chars.reduce((acc, c) => acc + (c.prepBonus || 0), 0);
    const avgPower = totalPower / (chars.length || 1);
    const avgGear = totalGear / (chars.length || 1);
    const avgPrep = totalPrep / (chars.length || 1);
    return {
      count: chars.length,
      totalPower,
      totalGear,
      totalPrep,
      avgPower: Math.round(avgPower),
      avgGear: Math.round(avgGear),
      avgPrep: Math.round(avgPrep),
      color: chars[0]?.color || "#3f3f46",
      background: chars[0]?.backgroundUrl || "",
    };
  }, []);

  // Handlers
  const selectCharacter = (char: Character) => {
    if (mode === "single") {
      setChar1(char1?.id === char.id ? null : char);
    } else if (mode === "battle") {
      if (battleState !== "idle") return;
      if (char1?.id === char.id) setChar1(null);
      else if (char2?.id === char.id) setChar2(null);
      else if (!char1) setChar1(char);
      else if (!char2) setChar2(char);
      else {
        setChar1(char);
        setChar2(null);
      }
    }
  };

  const selectUniverse = (uni: string) => {
    if (battleState !== "idle") return;
    if (universe1 === uni) setUniverse1(null);
    else if (universe2 === uni) setUniverse2(null);
    else if (!universe1) setUniverse1(uni);
    else if (!universe2) setUniverse2(uni);
    else {
      setUniverse1(uni);
      setUniverse2(null);
    }
  };

  const toggleMode = (newMode: Mode) => {
    stopBattleMusic(true);
    setMode(newMode);
    setChar1(null);
    setChar2(null);
    setUniverse1(null);
    setUniverse2(null);
    setBattleState("idle");
    setWinner(null);
    setWithGear1(false);
    setWithPrep1(false);
    setWithGear2(false);
    setWithPrep2(false);
    setActiveDrawerSlot(null);
  };

  const startBattle = () => {
    if (mode === "battle" && (!char1 || !char2)) return;
    if (mode === "universe" && (!universe1 || !universe2)) return;
    
    // Start music
    startBattleMusic();

    setCountdown(3);
    setBattleState("countdown");
    setWinner(null);
  };

  // Battle Logic
  useEffect(() => {
    if (battleState === "countdown") {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else if (countdown === 0) {
        const timer = setTimeout(() => setCountdown(-1), 1000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          (async () => {
            if (mode === "battle" && char1 && char2) {
              const p1 = char1.powerScore + (withGear1 ? (char1.gearBonus || 0) : 0) + (withPrep1 ? (char1.prepBonus || 0) : 0);
              const p2 = char2.powerScore + (withGear2 ? (char2.gearBonus || 0) : 0) + (withPrep2 ? (char2.prepBonus || 0) : 0);
              const winProb1 = 1 / (1 + Math.pow(10, (p2 - p1) / 200));
              let win: 1 | 2;
              
              if (Math.abs(p1 - p2) >= 500) {
                win = p1 > p2 ? 1 : 2;
              } else {
                win = Math.random() <= winProb1 ? 1 : 2;
              }
              setWinner(win);
              setBattleState("result");

              try {
                const winnerChar = win === 1 ? char1 : char2;
                const loserChar = win === 1 ? char2 : char1;

                const winnerProb = win === 1 ? winProb1 : (1 - winProb1);
                if (Math.abs(p1 - p2) < 500 && winnerProb < 0.25) {
                  const anomalyRef = doc(db, 'anomalies', Date.now().toString());
                  await setDoc(anomalyRef, {
                    winner: winnerChar.name,
                    winnerPower: winnerChar.powerScore,
                    loser: loserChar.name,
                    loserPower: loserChar.powerScore,
                    winProbability: winnerProb,
                    timestamp: new Date().toISOString()
                  });
                }
                
                const globalRef = doc(db, 'globalStats', 'overview');
                await setDoc(globalRef, { totalBattles: increment(1) }, { merge: true });

                const wRef = doc(db, 'characterStats', winnerChar.id);
                await setDoc(wRef, { wins: increment(1), name: winnerChar.name, universe: winnerChar.universe, color: winnerChar.color }, { merge: true });

                const lRef = doc(db, 'characterStats', loserChar.id);
                await setDoc(lRef, { losses: increment(1), name: loserChar.name, universe: loserChar.universe, color: loserChar.color }, { merge: true });
              } catch (e) {
                console.error("Firebase log error:", e);
              }

            } else if (mode === "universe" && universe1 && universe2) {
              const stats1 = getUniverseStats(universe1);
              const stats2 = getUniverseStats(universe2);
              const p1 = stats1.avgPower + (withGear1 ? (stats1.avgGear || 0) : 0) + (withPrep1 ? (stats1.avgPrep || 0) : 0);
              const p2 = stats2.avgPower + (withGear2 ? (stats2.avgGear || 0) : 0) + (withPrep2 ? (stats2.avgPrep || 0) : 0);
              let win: 1 | 2;
              
              if (Math.abs(p1 - p2) >= 500) {
                win = p1 > p2 ? 1 : 2;
              } else {
                const winProb1 = 1 / (1 + Math.pow(10, (p2 - p1) / 200));
                win = Math.random() <= winProb1 ? 1 : 2;
              }
              setWinner(win);
              setBattleState("result");

              try {
                const globalRef = doc(db, 'globalStats', 'overview');
                await setDoc(globalRef, { totalBattles: increment(1) }, { merge: true });
              } catch (e) {
                console.error("Firebase log error:", e);
              }
            }
          })();
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [battleState, countdown, char1, char2, universe1, universe2, mode, withGear1, withGear2, withPrep1, withPrep2, getUniverseStats]);

  // Drawer Context Bindings
  const isSlot2 = mode !== 'single' && activeDrawerSlot === 2;
  const drawerChar = mode === 'single' ? char1 : (activeDrawerSlot === 1 ? char1 : (activeDrawerSlot === 2 ? char2 : null));
  const drawerWithGear = isSlot2 ? withGear2 : withGear1;
  const drawerWithPrep = isSlot2 ? withPrep2 : withPrep1;
  const drawerSetWithGear = isSlot2 ? setWithGear2 : setWithGear1;
  const drawerSetWithPrep = isSlot2 ? setWithPrep2 : setWithPrep1;

  return (
    <main className="relative h-[100dvh] w-full bg-zinc-950 text-white font-sans overflow-hidden selection:bg-white/10">
      <BackgroundLayers
        mode={mode}
        battleState={battleState}
        winner={winner}
        char1={char1}
        char2={char2}
        universe1={universe1}
        universe2={universe2}
        getUniverseStats={getUniverseStats}
      />

      <div className="relative z-10 flex flex-col h-[100dvh] max-w-[1920px] mx-auto">
        <div className="flex-shrink-0 px-4 md:px-8 lg:px-12 pt-4 md:pt-6">
          <Header
            mode={mode}
            toggleMode={toggleMode}
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeUniverse={activeUniverse}
            isUniverseFilterOpen={isUniverseFilterOpen}
            setIsUniverseFilterOpen={setIsUniverseFilterOpen}
          />
        </div>

        {/* Result Overlays */}
        <div className="flex-shrink-0 z-20 relative pointer-events-none">
          {mode === "battle" && battleState === "result" && winner && (
            <div className="absolute inset-0 z-50 overflow-y-auto overflow-x-hidden hide-scrollbar pointer-events-auto bg-black/60 backdrop-blur-sm h-[100dvh]">
              <div className="min-h-full flex flex-col items-center justify-center p-4 py-12 md:py-24">
                <div 
                  className="flex flex-col items-center animate-in zoom-in spin-in-2 duration-700 pointer-events-none drop-shadow-2xl z-40"
                >
                  <div className="relative w-64 h-64 md:w-96 md:h-96">
                      <Image 
                        src={`/data/${winner === 1 ? char1?.universe.toLowerCase().replace(/\s+/g, '-') : char2?.universe.toLowerCase().replace(/\s+/g, '-')}/assets/${winner === 1 ? char1?.id : char2?.id}-preview.webp`}
                        alt="Winner"
                        fill
                        priority
                        sizes="(max-width: 768px) 256px, 384px"
                        className="object-contain filter drop-shadow-[0_20px_50px_rgba(250,204,21,0.6)]"
                      />
                  </div>
                </div>
                <div
                  className="z-50 flex flex-col items-center gap-4 mt-8"
                  style={{ animation: "fadeInUp 0.5s ease 0.5s both" }}
                >
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-[0_10px_30px_rgba(220,38,38,0.8)] text-center leading-none" style={{ WebkitTextStroke: '2px #b91c1c' }}>
                    {winner === 1 ? char1?.name : char2?.name}
                  </h2>
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] mt-[-10px] md:mt-[-15px]">
                     WINS
                  </h3>
                  <p className="text-sm font-mono text-zinc-300 uppercase tracking-widest mt-2 bg-black/60 px-4 py-1.5 rounded-full border border-white/10 text-center">
                    {winner === 1 ? char2?.name : char1?.name} &nbsp;·&nbsp; defeated
                  </p>
                  <button
                    onClick={() => {
                      stopBattleMusic(true);
                      setBattleState("idle");
                      setChar1(null);
                      setChar2(null);
                    }}
                    className="mt-6 px-10 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.4)] text-base md:text-lg pointer-events-auto"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {mode === "universe" && battleState === "result" && winner && (
            <div className="absolute inset-0 z-50 overflow-y-auto overflow-x-hidden hide-scrollbar pointer-events-auto bg-black/60 backdrop-blur-sm h-[100dvh]">
              <div className="min-h-full flex flex-col items-center justify-center p-4 py-12 md:py-24">
                <div 
                  className="flex flex-col items-center animate-in zoom-in spin-in-2 duration-700 pointer-events-none drop-shadow-2xl z-40 mb-4 md:mb-8"
                >
                  <span className="text-[6rem] md:text-[9rem] filter drop-shadow-[0_20px_50px_rgba(96,165,250,0.6)] leading-none text-center">
                    {winner === 1 ? universeLoreData[universe1!]?.emoji : universeLoreData[universe2!]?.emoji}
                  </span>
                </div>
                <div
                  className="z-50 flex flex-col items-center gap-4 mt-2"
                  style={{ animation: "fadeInUp 0.5s ease 0.5s both" }}
                >
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-600 drop-shadow-[0_10px_30px_rgba(37,99,235,0.8)] text-center leading-none" style={{ WebkitTextStroke: '2px #1d4ed8' }}>
                    {winner === 1 ? universe1 : universe2}
                  </h2>
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] mt-[-10px] md:mt-[-15px]">
                     DOMINATES
                  </h3>
                  <p className="text-sm font-mono text-zinc-300 uppercase tracking-widest mt-2 bg-black/60 px-4 py-1.5 rounded-full border border-white/10 text-center">
                    {winner === 1 ? universe2 : universe1} &nbsp;·&nbsp; defeated
                  </p>
                  <button
                    onClick={() => {
                      stopBattleMusic(true);
                      setBattleState("idle");
                      setUniverse1(null);
                      setUniverse2(null);
                    }}
                    className="mt-6 px-10 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.4)] text-base md:text-lg pointer-events-auto"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Selection Section */}
        <div
          className={`flex-grow overflow-y-auto hide-scrollbar relative z-10 px-4 md:px-8 lg:px-12 transition-all duration-500 ${battleState !== "idle" ? "opacity-0 pointer-events-none hidden" : "opacity-100"}`}
        >
          <div className="mb-2 md:mb-4 pt-4 text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest flex justify-between items-center">
            <span>
              {mode === "universe"
                ? !universe1
                  ? "Select Universe 1"
                  : !universe2
                    ? "Select Universe 2"
                    : "Ready to Clash"
                : mode === "single"
                  ? "Select a Character"
                  : !char1
                    ? "Select Player 1"
                    : !char2
                      ? "Select Player 2"
                      : "Ready to Battle"}
            </span>
            {searchQuery && (
              <span className="text-red-500">
                Found{" "}
                {mode === "universe"
                  ? allUniverses.filter((u) =>
                      u.toLowerCase().includes(searchQuery.toLowerCase()),
                    ).length
                  : filteredCharacters.length}{" "}
                results
              </span>
            )}
          </div>

          {mode === "universe" ? (
            <UniverseSelection
              allUniverses={allUniverses}
              searchQuery={searchQuery}
              universe1={universe1}
              universe2={universe2}
              getUniverseStats={getUniverseStats}
              selectUniverse={selectUniverse}
            />
          ) : (
            <CharacterSelection
              mode={mode}
              universes={activeUniverse === 'All' ? sortedUniverses : [activeUniverse]}
              groupedCharacters={groupedCharacters}
              char1={char1}
              char2={char2}
              selectCharacter={selectCharacter}
              onUniverseChange={() => {
                if (mode === "single") {
                  setChar1(null);
                }
              }}
            />
          )}
        </div>
      </div>

      <CombatActionBar
        mode={mode}
        battleState={battleState}
        countdown={countdown}
        char1={char1}
        char2={char2}
        universe1={universe1}
        universe2={universe2}
        withGear1={withGear1}
        withPrep1={withPrep1}
        withGear2={withGear2}
        withPrep2={withPrep2}
        getUniverseStats={getUniverseStats}
        startBattle={startBattle}
        setWithGear1={setWithGear1}
        setWithPrep1={setWithPrep1}
        setWithGear2={setWithGear2}
        setWithPrep2={setWithPrep2}
        onSlotClick={(slot) => {
          if ((slot === 1 && char1) || (slot === 2 && char2)) {
            setActiveDrawerSlot(slot);
          }
        }}
      />

      <CharacterDetailsDrawer
        char={drawerChar}
        onClose={() => {
          if (mode === "single") setChar1(null);
          else setActiveDrawerSlot(null);
        }}
        setSelectedLoreChar={setSelectedLoreChar}
        setSelectedModifier={setSelectedModifier}
        withGear={drawerWithGear}
        setWithGear={drawerSetWithGear}
        withPrep={drawerWithPrep}
        setWithPrep={drawerSetWithPrep}
      />

      <UniverseFilterModal
        isOpen={isUniverseFilterOpen}
        onClose={() => setIsUniverseFilterOpen(false)}
        universes={sortedUniverses}
        activeUniverse={activeUniverse}
        setActiveUniverse={setActiveUniverse}
        groupedCharacters={groupedCharacters}
      />

      <LoreModal
        character={selectedLoreChar}
        onClose={() => setSelectedLoreChar(null)}
      />

      <ModifierModal
        character={selectedModifier?.char || null}
        type={selectedModifier?.type || null}
        onClose={() => setSelectedModifier(null)}
      />

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
