"use client";

import { useState, useEffect, useMemo } from "react";
import { characters } from "@/data/characters";
import { Mode, BattleState, Character } from "@/types";
import { doc, setDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Components
import Header from "@/components/layout/Header";
import LoreModal from "@/components/ui/LoreModal";
import BackgroundLayers from "@/components/visuals/BackgroundLayers";
import CharacterSelection from "@/components/selection/CharacterSelection";
import UniverseSelection from "@/components/selection/UniverseSelection";
import SingleView from "@/components/displays/SingleView";
import BattleView from "@/components/displays/BattleView";
import UniverseView from "@/components/displays/UniverseView";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Memoized Data
  const filteredCharacters = useMemo(() => {
    return characters.filter(
      (char) =>
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.universe.toLowerCase().includes(searchQuery.toLowerCase()),
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
    characters.forEach((c) => unis.add(c.universe));
    return Array.from(unis).sort();
  }, []);

  // Helpers
  const getUniverseStats = (universeName: string) => {
    const chars = characters.filter((c) => c.universe === universeName);
    const avgPower =
      chars.reduce((acc, c) => acc + c.powerScore, 0) / chars.length;
    return {
      count: chars.length,
      avgPower: Math.round(avgPower),
      color: chars[0]?.color || "#3f3f46",
      background: chars[0]?.backgroundUrl || "",
    };
  };

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
    setMode(newMode);
    setChar1(null);
    setChar2(null);
    setUniverse1(null);
    setUniverse2(null);
    setBattleState("idle");
    setWinner(null);
  };

  const startBattle = () => {
    if (mode === "battle" && (!char1 || !char2)) return;
    if (mode === "universe" && (!universe1 || !universe2)) return;
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
              const p1 = char1.powerScore;
              const p2 = char2.powerScore;
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

                const upsetChance = win === 1 ? (1 - winProb1) : winProb1;
                if (Math.abs(p1 - p2) < 500 && upsetChance < 0.25) {
                  const anomalyRef = doc(db, 'anomalies', Date.now().toString());
                  await setDoc(anomalyRef, {
                    winner: winnerChar.name,
                    winnerPower: winnerChar.powerScore,
                    loser: loserChar.name,
                    loserPower: loserChar.powerScore,
                    probability: upsetChance,
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
              const p1 = stats1.avgPower;
              const p2 = stats2.avgPower;
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
  }, [battleState, countdown, char1, char2, universe1, universe2, mode]);

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-zinc-950 text-white font-sans">
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

      <div className="relative z-10 flex flex-col h-[100dvh] p-4 md:p-12 overflow-hidden">
        <Header
          mode={mode}
          toggleMode={toggleMode}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

          <div className="flex flex-col justify-center items-center py-2 md:py-4 min-h-[min(35vh,250px)] shrink-0 z-20 relative">
          {mode === "single" && (
            <SingleView
              char1={char1}
              setSelectedLoreChar={setSelectedLoreChar}
            />
          )}

          {mode === "battle" && (
            <BattleView
              char1={char1}
              char2={char2}
              battleState={battleState}
              countdown={countdown}
              winner={winner}
              startBattle={startBattle}
              setBattleState={setBattleState}
              setChar1={setChar1}
              setChar2={setChar2}
              setSelectedLoreChar={setSelectedLoreChar}
            />
          )}

          {/* Battle Result Overlay — anchored to bottom, behind nothing */}
          {mode === "battle" && battleState === "result" && winner && (
            <div
              className="absolute bottom-0 left-0 right-0 z-40 flex flex-col items-center gap-2 pb-6 md:pb-10 pointer-events-none"
              style={{ animation: "fadeInUp 0.5s ease 0.5s both" }}
            >
              {/* Soft scrim so text is readable over any background */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

              <div className="relative pointer-events-auto flex flex-col items-center gap-3">
                {/* Winner badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/20 border border-yellow-400/60 text-yellow-300 font-black text-sm md:text-base uppercase tracking-widest shadow-[0_0_20px_rgba(250,204,21,0.4)] backdrop-blur-sm">
                  🏆&nbsp;{winner === 1 ? char1?.name : char2?.name} Wins!
                </div>
                {/* Loser name */}
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  {winner === 1 ? char2?.name : char1?.name} &nbsp;·&nbsp; defeated
                </p>
                {/* Play Again */}
                <button
                  onClick={() => {
                    setBattleState("idle");
                    setChar1(null);
                    setChar2(null);
                  }}
                  className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)] text-sm"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}


          {mode === "universe" && (
            <UniverseView
              universe1={universe1}
              universe2={universe2}
              battleState={battleState}
              countdown={countdown}
              winner={winner}
              getUniverseStats={getUniverseStats}
              startBattle={startBattle}
              setBattleState={setBattleState}
              setUniverse1={setUniverse1}
              setUniverse2={setUniverse2}
            />
          )}

          {/* Universe Result Overlay — anchored to bottom, never overlaps "DOMINATES" */}
          {mode === "universe" && battleState === "result" && winner && (
            <div
              className="absolute bottom-0 left-0 right-0 z-40 flex flex-col items-center gap-2 pb-6 md:pb-10 pointer-events-none"
              style={{ animation: "fadeInUp 0.5s ease 0.5s both" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
              <div className="relative pointer-events-auto flex flex-col items-center gap-3">
                {/* Dominates badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-400/20 border border-blue-400/60 text-blue-300 font-black text-sm md:text-base uppercase tracking-widest shadow-[0_0_20px_rgba(96,165,250,0.4)] backdrop-blur-sm">
                  ⚡&nbsp;{winner === 1 ? universe1 : universe2} Dominates!
                </div>
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  {winner === 1 ? universe2 : universe1} &nbsp;·&nbsp; defeated
                </p>
                <button
                  onClick={() => {
                    setBattleState("idle");
                    setUniverse1(null);
                    setUniverse2(null);
                  }}
                  className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)] text-sm"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}

        </div>

        <div
          className={`transition-opacity duration-500 flex-1 flex flex-col min-h-0 z-30 relative ${battleState !== "idle" ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <div className="mb-2 md:mb-4 text-xs font-mono text-zinc-500 uppercase tracking-widest flex justify-between items-center flex-shrink-0">
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
              universes={sortedUniverses}
              groupedCharacters={groupedCharacters}
              char1={char1}
              char2={char2}
              selectCharacter={selectCharacter}
              onUniverseChange={() => {
                setChar1(null);
                setChar2(null);
              }}
            />
          )}
        </div>
      </div>

      <LoreModal
        character={selectedLoreChar}
        onClose={() => setSelectedLoreChar(null)}
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
