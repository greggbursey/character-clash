"use client";

import Link from "next/link";
import { ArrowLeft, Trophy, Globe, Activity, Search, X, Brain } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useMemo, Suspense, useCallback } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { characters as allCharactersData } from "@/data/characters";
import dynamic from "next/dynamic";

const MatchupSimulator = dynamic(() => import("@/components/portal/MatchupSimulator").then(m => m.MatchupSimulator), { ssr: false });
const CharacterTrivia = dynamic(() => import("@/components/portal/CharacterTrivia").then(m => m.CharacterTrivia), { ssr: false });
const AnomaliesLog = dynamic(() => import("@/components/portal/AnomaliesLog").then(m => m.AnomaliesLog), { ssr: false });
const WinStreaks = dynamic(() => import("@/components/portal/WinStreaks").then(m => m.WinStreaks), { ssr: false });
const TierListMaker = dynamic(() => import("@/components/portal/TierListMaker").then(m => m.TierListMaker), { ssr: false });
const WhatIfScenarios = dynamic(() => import("@/components/portal/WhatIfScenarios").then(m => m.WhatIfScenarios), { ssr: false });
const RivalryTracker = dynamic(() => import("@/components/portal/RivalryTracker").then(m => m.RivalryTracker), { ssr: false });
const UnderdogOfTheWeek = dynamic(() => import("@/components/portal/UnderdogOfTheWeek").then(m => m.UnderdogOfTheWeek), { ssr: false });
const UniverseArchivesHeader = dynamic(() => import("@/components/portal/UniverseInfo").then(m => m.UniverseArchivesHeader), { ssr: false });
const UniverseLore = dynamic(() => import("@/components/portal/UniverseInfo").then(m => m.UniverseLore), { ssr: false });
const UniverseHierarchy = dynamic(() => import("@/components/portal/UniverseInfo").then(m => m.UniverseHierarchy), { ssr: false });
const TriviaStats = dynamic(() => import("@/components/portal/TriviaStats").then(m => m.TriviaStats), { ssr: false });

interface CharStat {
  id: string;
  name: string;
  wins: number;
  losses: number;
  color: string;
  universe?: string;
  powerScore?: number;
}

type Tab = "Dashboard" | "Universes" | "TierList" | "Simulator" | "Trivia";

export function PortalContent() {
  return (
    <Suspense fallback={<div>Loading Portal...</div>}>
      <PortalInternal />
    </Suspense>
  );
}

function PortalInternal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab") as Tab;
  const activeTab = useMemo(() => {
    if (tabParam && ["Dashboard", "Universes", "TierList", "Simulator", "Trivia"].includes(tabParam)) {
      return tabParam;
    }
    return "Dashboard";
  }, [tabParam]);

  const catParam = searchParams.get("category");
  const valParam = searchParams.get("value");

  const [totalBattles, setTotalBattles] = useState<number>(0);
  const [allCharacters, setAllCharacters] = useState<CharStat[]>([]);
  const [isFirebaseLive, setIsFirebaseLive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [universeSearchQuery, setUniverseSearchQuery] = useState("");
  const [selectedUniverse, setSelectedUniverse] = useState<string>("DC");

  const setActiveTab = useCallback((tab: Tab, category?: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    if (category && value) {
      params.set("category", category);
      params.set("value", value);
    } else {
      params.delete("category");
      params.delete("value");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch Global Battles
        const globalRef = doc(db, "globalStats", "overview");
        const globalSnap = await getDoc(globalRef);
        if (globalSnap.exists()) {
          setTotalBattles(globalSnap.data()?.totalBattles || 0);
          setIsFirebaseLive(true);
        }

        // Fetch All Character Stats
        const charsRef = collection(db, "characterStats");
        const charsSnap = await getDocs(charsRef);
        const allData: CharStat[] = [];
        charsSnap.forEach((doc) => {
          const data = doc.data();
          const baseChar = allCharactersData.find((c) => c.id === doc.id);
          allData.push({
            id: doc.id,
            ...data,
            wins: data.wins || 0,
            losses: data.losses || 0,
            universe: data.universe || "Unknown",
            powerScore: baseChar?.powerScore || 500,
          } as CharStat);
        });
        setAllCharacters(allData);
      } catch (e) {
        console.error("Portal fetch error:", e);
      }
    }

    fetchStats();
  }, []);

  // Aggregations
  const topWinners = useMemo(() => {
    return [...allCharacters]
      .sort((a, b) => {
        const aTotal = Math.max(a.wins + a.losses, 1);
        const bTotal = Math.max(b.wins + b.losses, 1);
        const aRate = a.wins / aTotal;
        const bRate = b.wins / bTotal;
        if (bRate === aRate) return b.wins + b.losses - (a.wins + a.losses);
        return bRate - aRate;
      })
      .slice(0, 5);
  }, [allCharacters]);

  const topLosers = useMemo(() => {
    return [...allCharacters].sort((a, b) => b.losses - a.losses).slice(0, 5);
  }, [allCharacters]);

  const mostActiveFighter = useMemo(() => {
    if (allCharacters.length === 0) return null;
    return [...allCharacters].sort(
      (a, b) => b.wins + b.losses - (a.wins + a.losses),
    )[0];
  }, [allCharacters]);

  const mostDominantUniverse = useMemo(() => {
    if (allCharacters.length === 0) return null;
    const winsMap: Record<string, number> = {};
    allCharacters.forEach((c) => {
      if (c.universe) {
        winsMap[c.universe] = (winsMap[c.universe] || 0) + c.wins;
      }
    });
    const sorted = Object.entries(winsMap).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0
      ? { name: sorted[0][0], wins: sorted[0][1] }
      : null;
  }, [allCharacters]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allCharacters
      .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);
  }, [allCharacters, searchQuery]);

  const filteredUniverses = useMemo(() => {
    const winsMap: Record<
      string,
      { wins: number; losses: number; count: number }
    > = {};
    allCharacters.forEach((c) => {
      const u = c.universe || "Unknown";
      if (!winsMap[u]) winsMap[u] = { wins: 0, losses: 0, count: 0 };
      winsMap[u].wins += c.wins;
      winsMap[u].losses += c.losses;
      winsMap[u].count += 1;
    });

    let universes = Object.entries(winsMap).map(([name, stats]) => ({
      name,
      ...stats,
    }));

    if (universeSearchQuery.trim()) {
      universes = universes.filter((u) =>
        u.name.toLowerCase().includes(universeSearchQuery.toLowerCase()),
      );
    }

    return universes.sort((a, b) => {
      const aRate = a.wins / Math.max(a.wins + a.losses, 1);
      const bRate = b.wins / Math.max(b.wins + b.losses, 1);
      if (bRate === aRate) return b.wins + b.losses - (a.wins + a.losses);
      return bRate - aRate;
    });
  }, [allCharacters, universeSearchQuery]);

  return (
    <main className="min-h-[100dvh] w-full bg-zinc-950 text-white font-sans p-4 md:p-12 pb-24 overflow-y-auto">
      {/* Portal Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 relative">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 z-10 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all text-sm font-bold tracking-wider uppercase"
        >
          <ArrowLeft size={16} />
          Back to Battles
        </Link>
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute left-0 right-0 top-12 md:top-auto text-center text-2xl md:text-4xl font-black tracking-tighter uppercase italic select-none pointer-events-none hidden md:block"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            Clash
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-red-400 via-red-600 to-red-800 drop-shadow-[0_0_15px_rgba(220,38,38,0.4)] ml-2">
            Portal
          </span>
        </motion.h1>

        {/* Status Pills */}
        <div className="flex gap-3 z-10 w-full md:w-auto justify-center md:justify-end">
          <div className="group relative">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] md:text-xs font-bold tracking-widest uppercase shadow-lg backdrop-blur-sm cursor-help transition-colors ${isFirebaseLive ? "bg-green-500/10 border-green-500/50 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)] hover:bg-green-500/20" : "bg-orange-500/10 border-orange-500/50 text-orange-400 hover:bg-orange-500/20"}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${isFirebaseLive ? "bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,1)]" : "bg-orange-400"}`}
              />
              {isFirebaseLive ? "Database: On" : "Database: Wait"}
            </div>
            <div className="absolute top-full pt-3 right-0 md:right-auto md:-translate-x-1/2 md:left-1/2 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              <div
                className={`bg-zinc-900/95 border backdrop-blur-xl p-3 rounded-xl shadow-2xl ${isFirebaseLive ? "border-green-500/30" : "border-orange-500/30"}`}
              >
                <div
                  className={`font-bold mb-1 uppercase tracking-wider text-[10px] ${isFirebaseLive ? "text-green-400" : "text-orange-400"}`}
                >
                  {isFirebaseLive ? "Live Connection" : "Connecting..."}
                </div>
                <p className="text-zinc-400 text-[10px] leading-relaxed">
                  {isFirebaseLive
                    ? "Global battle statistics and leaderboards are actively synchronizing in real-time."
                    : "Attempting to establish connection with global stats server."}
                </p>
              </div>
            </div>
          </div>


        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="max-w-6xl mx-auto mb-8 bg-zinc-900/50 p-2 border border-zinc-800/80 rounded-[2rem] flex flex-wrap gap-2 justify-center shadow-lg relative z-20">
         {["Dashboard", "Universes", "TierList", "Simulator", "Trivia"].map(tab => (
           <button
             key={tab}
             onClick={() => setActiveTab(tab as Tab)}
             className={`px-6 py-4 rounded-3xl font-black tracking-widest uppercase text-xs md:text-sm transition-all flex-1 md:flex-none text-center ${activeTab === tab ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' : 'bg-transparent text-zinc-500 hover:text-white hover:bg-zinc-800'}`}
           >
             {tab === "TierList" ? "Tier List" : tab}
           </button>
         ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
        
        {activeTab === "Dashboard" && (
        <motion.div key="Dashboard" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="flex flex-col gap-12">
        {/* Hero Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Dominant Universe */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-[2rem] p-8 flex flex-col items-center justify-center min-h-[180px] hover:border-zinc-700 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />
            <Globe className="text-blue-500 mb-3 w-8 h-8 md:w-10 md:h-10 opacity-80" />
            <h2 className="text-2xl md:text-3xl font-black mb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 text-center uppercase tracking-tight">
              {mostDominantUniverse ? mostDominantUniverse.name : "..."}
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-center mb-2">
              Most Dominant Universe
            </p>
            {mostDominantUniverse && (
              <div className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full uppercase tracking-widest border border-blue-500/30">
                {mostDominantUniverse.wins.toLocaleString()} Total Wins
              </div>
            )}
          </div>

          {/* Global Battles */}
          <div className="bg-zinc-900/50 border border-yellow-500/20 rounded-[2rem] p-8 flex flex-col items-center justify-center min-h-[180px] hover:border-yellow-500/40 transition-colors scale-100 md:scale-105 z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all" />
            <Trophy className="text-yellow-500 mb-3 w-8 h-8 md:w-12 md:h-12 opacity-90 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
            <h2 className="text-5xl md:text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {totalBattles.toLocaleString()}
            </h2>
            <p className="text-yellow-500/70 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-center">
              Total Global Battles
            </p>
          </div>

          {/* Most Active Fighter */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-[2rem] p-8 flex flex-col items-center justify-center min-h-[180px] hover:border-zinc-700 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all" />
            <Activity className="text-red-500 mb-3 w-8 h-8 md:w-10 md:h-10 opacity-80" />
            <h2 className="text-2xl md:text-3xl font-black mb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 text-center uppercase tracking-tight line-clamp-1">
              {mostActiveFighter ? mostActiveFighter.name : "..."}
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-center mb-2">
              Most Active Fighter
            </p>
            {mostActiveFighter && (
              <div className="text-[10px] font-mono text-red-400 bg-red-500/10 px-3 py-1 rounded-full uppercase tracking-widest border border-red-500/30">
                {(
                  mostActiveFighter.wins + mostActiveFighter.losses
                ).toLocaleString()}{" "}
                Battles
              </div>
            )}
          </div>
        </section>

        {/* Character Lookup Search */}
        <div className="mb-12 relative w-full max-w-2xl mx-auto flex flex-col z-30">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="LOOKUP FIGHTER STATS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 focus:bg-zinc-900/90 rounded-full py-5 pl-14 pr-12 text-white font-black tracking-widest placeholder:text-zinc-600 outline-none transition-all shadow-lg focus:shadow-[0_0_30px_rgba(220,38,38,0.15)] text-sm md:text-base uppercase"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-6 flex items-center text-zinc-500 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <AnimatePresence>
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-xl"
              >
                {searchResults.length > 0 ? (
                  <div className="flex flex-col p-2">
                    {searchResults.map((char) => {
                      const total = Math.max(char.wins + char.losses, 1);
                      const winRate = Math.round((char.wins / total) * 100);
                      return (
                        <div
                          key={char.id}
                          className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 hover:bg-zinc-800/50 rounded-2xl transition-colors border border-transparent hover:border-zinc-700/50 gap-4"
                        >
                          <div>
                            <div className="font-black text-white text-lg uppercase tracking-tight">
                              {char.name}
                            </div>
                            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                              {char.universe || "Unknown"}
                            </div>
                          </div>

                          <div className="flex items-center gap-6 w-full md:w-auto">
                            <button
                              onClick={() => {
                                setActiveTab("Trivia", 'character', char.id);
                                setSearchQuery("");
                              }}
                              className="p-2 bg-purple-600/20 text-purple-400 hover:bg-purple-600/40 border border-purple-500/30 rounded-full transition-all group"
                              title="Play Character Trivia"
                            >
                              <Brain size={16} className="group-hover:scale-110 transition-transform" />
                            </button>

                            <div className="flex flex-col">
                              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">
                                Record
                              </span>
                              <div className="flex items-center gap-2 font-mono text-sm">
                                <span className="text-green-500 font-bold">
                                  {char.wins}W
                                </span>
                                <span className="text-zinc-600">-</span>
                                <span className="text-red-500 font-bold">
                                  {char.losses}L
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col flex-1 md:w-32">
                              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1 flex justify-between">
                                <span>Win Rate</span>
                                <span className="text-white">{winRate}%</span>
                              </span>
                              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full"
                                  style={{ width: `${winRate}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center text-zinc-500 font-mono text-sm uppercase tracking-widest">
                    No fighters found matching &quot;{searchQuery}&quot;
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Leaderboards Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 z-10 relative">
          {/* Winners */}
          <div className="bg-zinc-900/30 border border-zinc-800/40 rounded-[2rem] p-6 md:p-10 min-h-[400px]">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-[0.1em] mb-8 text-zinc-100 flex items-center gap-4">
              <span className="w-3 h-10 bg-gradient-to-b from-green-400 to-green-600 rounded-full shadow-[0_0_15px_rgba(74,222,128,0.3)]" />
              Highest Win Rate
            </h3>
            {topWinners.length > 0 ? (
              <div className="flex flex-col gap-4">
                {topWinners.map((char, i) => {
                  const total = Math.max(char.wins + char.losses, 1);
                  const winRate = Math.round((char.wins / total) * 100);
                  return (
                    <div
                      key={char.id}
                      className="flex relative items-center gap-4 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 overflow-hidden group hover:border-green-500/30 transition-colors"
                    >
                      <div className="absolute left-0 bottom-0 top-0 w-1 bg-green-500/50" />
                      <div className="w-8 flex justify-center text-xl font-black text-zinc-600">
                        #{i + 1}
                      </div>
                      <div className="flex-1 z-10">
                        <div className="font-black text-white uppercase tracking-tight text-lg">
                          {char.name}
                        </div>
                        <div className="flex items-center gap-4 mt-1 w-full max-w-[200px]">
                          <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${winRate}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest font-bold">
                            {winRate}% ({char.wins}W)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-zinc-600 text-center px-4">
                <p className="italic font-mono text-sm">
                  Awaiting battle data...
                </p>
              </div>
            )}
          </div>

          {/* Losers */}
          <div className="bg-zinc-900/30 border border-zinc-800/40 rounded-[2rem] p-6 md:p-10 min-h-[400px]">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-[0.1em] mb-8 text-zinc-100 flex items-center gap-4">
              <span className="w-3 h-10 bg-gradient-to-b from-red-400 to-red-600 rounded-full shadow-[0_0_15px_rgba(248,113,113,0.3)]" />
              Most Defeated
            </h3>
            {topLosers.length > 0 ? (
              <div className="flex flex-col gap-4">
                {topLosers.map((char, i) => {
                  const total = Math.max(char.wins + char.losses, 1);
                  const lossRate = Math.round((char.losses / total) * 100);
                  return (
                    <div
                      key={char.id}
                      className="flex relative items-center gap-4 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 overflow-hidden group hover:border-red-500/30 transition-colors"
                    >
                      <div className="absolute left-0 bottom-0 top-0 w-1 bg-red-500/50" />
                      <div className="w-8 flex justify-center text-xl font-black text-zinc-600">
                        #{i + 1}
                      </div>
                      <div className="flex-1 z-10">
                        <div className="font-black text-white uppercase tracking-tight text-lg">
                          {char.name}
                        </div>
                        <div className="flex items-center gap-4 mt-1 w-full max-w-[200px]">
                          <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500 rounded-full"
                              style={{ width: `${lossRate}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-bold">
                            {char.losses}L
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-zinc-600 text-center px-4">
                <p className="italic font-mono text-sm">
                  Awaiting battle data...
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Dashboard Analytics & Anomalies */}
        <section>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[0.1em] text-white flex items-center gap-4 mb-2">
            <span className="w-12 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
            Live Analytics
          </h2>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-8">
            Monitoring Multiverse Disturbances
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
             <div><AnomaliesLog /></div>
             <div><WinStreaks characters={allCharacters} /></div>
             <div><UnderdogOfTheWeek characters={allCharacters} /></div>
             <div className="lg:col-span-3"><WhatIfScenarios /></div>
          </div>
        </section>

        {/* Global Universe Standings - MOVED FROM UNIVERSES TAB */}
        <section className="mt-12 z-10 relative bg-zinc-900/30 border border-zinc-800/40 rounded-[2rem] p-6 md:p-10 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-[0.1em] text-zinc-100 flex items-center gap-4">
              <span className="w-3 h-10 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
              Universe Standings
            </h3>

            <div className="relative w-full md:w-64 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="FILTER UNIVERSES..."
                value={universeSearchQuery}
                onChange={(e) => setUniverseSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-blue-500 focus:bg-zinc-900 rounded-full py-2 pl-10 pr-4 text-white font-bold tracking-widest placeholder:text-zinc-600 outline-none transition-all shadow-inner text-xs uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUniverses.length > 0 ? (
              filteredUniverses.map((uni, i) => {
                const total = Math.max(uni.wins + uni.losses, 1);
                const winRate = Math.round((uni.wins / total) * 100);
                
                const getUniverseTheme = (u: string) => {
                  switch (u) {
                    case "DC": return { border: "hover:border-blue-500/50", fill: "bg-blue-500", text: "text-blue-400" };
                    case "Marvel": return { border: "hover:border-red-500/50", fill: "bg-red-500", text: "text-red-400" };
                    case "Mortal Kombat": return { border: "hover:border-yellow-500/50", fill: "bg-yellow-500", text: "text-yellow-400" };
                    case "Street Fighter": return { border: "hover:border-orange-500/50", fill: "bg-orange-500", text: "text-orange-400" };
                    case "TMNT": return { border: "hover:border-emerald-500/50", fill: "bg-emerald-500", text: "text-emerald-400" };
                    case "Star Wars": return { border: "hover:border-purple-500/50", fill: "bg-purple-500", text: "text-purple-400" };
                    case "Godzilla": return { border: "hover:border-cyan-500/50", fill: "bg-cyan-500", text: "text-cyan-400" };
                    case "X-Men": return { border: "hover:border-yellow-400/50", fill: "bg-yellow-400", text: "text-yellow-400" };
                    case "Mario": return { border: "hover:border-red-500/50", fill: "bg-red-500", text: "text-red-400" };
                    case "Harry Potter": return { border: "hover:border-blue-400/50", fill: "bg-blue-400", text: "text-blue-400" };
                    default: return { border: "hover:border-zinc-500/50", fill: "bg-zinc-500", text: "text-zinc-400" };
                  }
                };
                const theme = getUniverseTheme(uni.name);

                return (
                  <div
                    key={uni.name}
                    className={`flex flex-col relative bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 overflow-hidden group transition-colors ${theme.border}`}
                  >
                    <div className={`absolute left-0 bottom-0 top-0 w-1 ${theme.fill} opacity-50`} />

                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-black text-zinc-600">
                          #{i + 1}
                        </div>
                        <div
                          className="font-black text-white uppercase tracking-tight text-lg line-clamp-1"
                          title={uni.name}
                        >
                          {uni.name}
                        </div>
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-800 px-2 py-1 rounded-md">
                        {uni.count} Fighters
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full">
                      <div className="flex flex-col gap-1 flex-1">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                          <span className="text-zinc-500">
                            Record:{" "}
                            <span className="text-green-500">{uni.wins}W</span>{" "}
                            -{" "}
                            <span className="text-red-500">{uni.losses}L</span>
                          </span>
                          <span className={`${theme.text}`}>{winRate}% WIN</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${theme.fill}`}
                            style={{ width: `${winRate}%` }}
                          />
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setActiveTab("Trivia", 'universe', uni.name);
                        }}
                        className={`p-2 rounded-full border border-zinc-700/50 bg-zinc-800/50 ${theme.text} hover:scale-110 transition-transform`}
                        title="Play Universe Trivia"
                      >
                        <Brain size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-8 text-center text-zinc-600 italic font-mono text-sm">
                No universes found.
              </div>
            )}
          </div>
        </section>
        </motion.div>
        )}

        {activeTab === "Universes" && (
        <motion.div key="Universes" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="flex flex-col gap-8 mt-4">
          <UniverseArchivesHeader selectedUniverse={selectedUniverse} onUniverseChange={setSelectedUniverse} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative">
             {/* Left Column: Lore & Rivalries (Span 2) */}
             <div className="lg:col-span-2 flex flex-col gap-12 order-2 lg:order-1">
                <UniverseLore selectedUniverse={selectedUniverse} />
                
                <section>
                  <h2 className="text-2xl font-black uppercase tracking-[0.1em] text-white flex items-center gap-4 mb-6">
                    <span className="w-12 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                    In-Universe Rivalries
                  </h2>
                  <RivalryTracker selectedUniverse={selectedUniverse} />
                </section>
             </div>

             {/* Right Column: Sticky Hierarchy (Span 1) */}
             <div className="lg:col-span-1 lg:sticky lg:top-24 self-start order-1 lg:order-2">
                <UniverseHierarchy selectedUniverse={selectedUniverse} />
             </div>
          </div>
        </motion.div>
        )}

        {activeTab === "TierList" && (
          <motion.div key="TierList" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="max-w-6xl mx-auto">
            <TierListMaker />
          </motion.div>
        )}

        {activeTab === "Simulator" && (
          <motion.div key="Simulator" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}}>
            <MatchupSimulator />
          </motion.div>
        )}

        {activeTab === "Trivia" && (
          <motion.div key="Trivia" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="max-w-3xl mx-auto flex flex-col gap-8">
             <CharacterTrivia 
               key={`${catParam}-${valParam}`}
               initialCategory={(catParam as any) || undefined} 
               initialValue={valParam || undefined} 
             />
             <TriviaStats />
          </motion.div>
        )}

        </AnimatePresence>
      </div>
    </main>
  );
}
