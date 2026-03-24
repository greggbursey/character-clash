"use client";

import Link from "next/link";
import { ArrowLeft, Trophy, Flame, Target } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface CharStat {
  id: string;
  name: string;
  wins: number;
  losses: number;
  color: string;
}

export default function PortalPage() {
  const [totalBattles, setTotalBattles] = useState<number>(0);
  const [topWinners, setTopWinners] = useState<CharStat[]>([]);
  const [topLosers, setTopLosers] = useState<CharStat[]>([]);
  const [isFirebaseLive, setIsFirebaseLive] = useState<boolean>(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch Global Battles
        const globalRef = doc(db, 'globalStats', 'overview');
        const globalSnap = await getDoc(globalRef);
        if (globalSnap.exists()) {
          setTotalBattles(globalSnap.data()?.totalBattles || 0);
          setIsFirebaseLive(true);
        }

        // Fetch Top Winners
        const charsRef = collection(db, 'characterStats');
        const winnersQuery = query(charsRef, orderBy('wins', 'desc'), limit(5));
        const winnersSnap = await getDocs(winnersQuery);
        const wData: CharStat[] = [];
        winnersSnap.forEach(doc => {
          wData.push({ id: doc.id, ...doc.data() } as CharStat);
        });
        setTopWinners(wData);

        // Fetch Most Defeated
        const losersQuery = query(charsRef, orderBy('losses', 'desc'), limit(5));
        const losersSnap = await getDocs(losersQuery);
        const lData: CharStat[] = [];
        losersSnap.forEach(doc => {
          lData.push({ id: doc.id, ...doc.data() } as CharStat);
        });
        setTopLosers(lData);
        
      } catch (e) {
        console.error("Portal fetch error:", e);
      }
    }

    fetchStats();
  }, []);

  return (
    <main className="min-h-[100dvh] w-full bg-zinc-950 text-white font-sans p-4 md:p-12 overflow-y-auto">
      {/* Portal Header */}
      <header className="flex justify-between items-center mb-12">
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 z-10 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all text-sm font-bold tracking-wider uppercase"
        >
          <ArrowLeft size={16} />
          Back to Battles
        </Link>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute left-0 right-0 text-center text-2xl md:text-4xl font-black tracking-tighter uppercase italic select-none pointer-events-none"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            Clash
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-red-400 via-red-600 to-red-800 drop-shadow-[0_0_15px_rgba(220,38,38,0.4)] ml-2">
            Portal
          </span>
        </motion.h1>
      </header>

      {/* Hero Stats */}
      <div className="max-w-6xl mx-auto">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-[2rem] p-8 flex flex-col items-center justify-center min-h-[180px] hover:border-zinc-700 transition-colors">
            <Trophy className="text-yellow-500 mb-3 w-8 h-8 md:w-10 md:h-10 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
              {totalBattles.toLocaleString()}
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-center">Total Global Battles</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-[2rem] p-8 flex flex-col items-center justify-center min-h-[180px] hover:border-zinc-700 transition-colors relative overflow-hidden">
            {isFirebaseLive && <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />}
            {!isFirebaseLive && <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />}
            
            <Flame className={`${isFirebaseLive ? 'text-green-500' : 'text-orange-500'} mb-3 w-8 h-8 md:w-10 md:h-10 opacity-80 transition-colors`} />
            <h2 className={`text-3xl md:text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b ${isFirebaseLive ? 'from-green-200 to-green-500' : 'from-orange-200 to-orange-500'}`}>
              {isFirebaseLive ? "Live" : "Offline"}
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-center">Firebase DB Status</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-[2rem] p-8 flex flex-col items-center justify-center min-h-[180px] hover:border-zinc-700 transition-colors">
            <Target className="text-blue-500 mb-3 w-8 h-8 md:w-10 md:h-10 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
              {/* Could fetch total predictions here, but for now we leave static or just show 'Enabled' */}
              Active
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-center">Player Predictions</p>
          </div>
        </section>

        {/* Leaderboards Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Winners */}
          <div className="bg-zinc-900/30 border border-zinc-800/40 rounded-[2rem] p-6 md:p-10 min-h-[400px]">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-[0.1em] mb-8 text-zinc-100 flex items-center gap-4">
              <span className="w-3 h-10 bg-gradient-to-b from-green-400 to-green-600 rounded-full shadow-[0_0_15px_rgba(74,222,128,0.3)]" />
              Highest Win Rate
            </h3>
            {topWinners.length > 0 ? (
              <div className="flex flex-col gap-4">
                {topWinners.map((char, i) => (
                  <div key={char.id} className="flex items-center gap-4 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
                    <div className="w-8 flex justify-center text-xl font-black text-zinc-600">#{i + 1}</div>
                    <div className="flex-1">
                      <div className="font-black text-white capitalize">{char.name}</div>
                      <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{char.wins} Wins</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-zinc-600 text-center px-4">
                <p className="italic font-mono text-sm">Awaiting battle data...</p>
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
                {topLosers.map((char, i) => (
                  <div key={char.id} className="flex items-center gap-4 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
                    <div className="w-8 flex justify-center text-xl font-black text-zinc-600">#{i + 1}</div>
                    <div className="flex-1">
                      <div className="font-black text-white capitalize">{char.name}</div>
                      <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{char.losses} Losses</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-zinc-600 text-center px-4">
                <p className="italic font-mono text-sm">Awaiting battle data...</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
