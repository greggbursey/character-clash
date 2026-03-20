"use client";

import { useState, useEffect, useMemo } from "react";
import { characters } from "@/data/characters";
import { Mode, BattleState, Character } from "@/types";

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
    setBattleState("countdown");
    setCountdown(3);
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
          if (mode === "battle" && char1 && char2) {
            const score1 = char1.powerScore + (Math.random() * 20 - 10);
            const score2 = char2.powerScore + (Math.random() * 20 - 10);
            setWinner(score1 >= score2 ? 1 : 2);
            setBattleState("result");
          } else if (mode === "universe" && universe1 && universe2) {
            const stats1 = getUniverseStats(universe1);
            const stats2 = getUniverseStats(universe2);
            const score1 = stats1.avgPower + (Math.random() * 15 - 7.5);
            const score2 = stats2.avgPower + (Math.random() * 15 - 7.5);
            setWinner(score1 >= score2 ? 1 : 2);
            setBattleState("result");
          }
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [battleState, countdown, char1, char2, universe1, universe2, mode]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-white font-sans">
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

      <div className="relative z-10 flex flex-col min-h-screen p-6 md:p-12">
        <Header
          mode={mode}
          toggleMode={toggleMode}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="flex-1 flex flex-col justify-center items-center py-8">
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
        </div>

        <div
          className={`mt-auto transition-opacity duration-500 ${battleState !== "idle" ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <div className="mb-4 text-xs font-mono text-zinc-500 uppercase tracking-widest flex justify-between items-center">
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
