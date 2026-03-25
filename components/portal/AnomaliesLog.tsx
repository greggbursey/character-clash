"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Clock } from "lucide-react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "motion/react";

interface Anomaly {
  id: string;
  winner: string;
  loser: string;
  winnerPower: number;
  loserPower: number;
  winProbability: number;
  timestamp: string;
}

export function AnomaliesLog() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnomalies() {
      try {
        const q = query(collection(db, "anomalies"), orderBy("timestamp", "desc"), limit(5));
        const snap = await getDocs(q);
        const data: Anomaly[] = [];
        snap.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() } as Anomaly);
        });
        setAnomalies(data);
      } catch(e) {
        console.error("error fetching anomalies", e);
      } finally {
        setLoading(false);
      }
    }
    fetchAnomalies();
  }, []);

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/40 rounded-[2rem] p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="text-orange-500" />
        <h3 className="text-xl font-black uppercase tracking-wider text-white">Power Anomalies</h3>
      </div>
      <p className="text-xs text-zinc-500 mb-6 uppercase tracking-widest leading-relaxed">
        Recent battles where the winner had less than a 25% probabilistic chance of victory. A true upset.
      </p>

      <div className="flex-1 flex flex-col gap-3">
        {loading ? (
           <div className="flex items-center justify-center h-full text-zinc-600 font-mono text-sm">
             Scanning spacetime...
           </div>
        ) : anomalies.length === 0 ? (
          <div className="flex items-center justify-center p-8 border border-dashed border-zinc-800 rounded-xl text-zinc-600 font-mono text-xs uppercase tracking-widest text-center">
            No massive upsets detected yet.
          </div>
        ) : (
          anomalies.map((a, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={a.id} 
              className="bg-zinc-900/80 p-4 border border-orange-500/20 rounded-xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded uppercase font-bold">
                  {(a.winProbability * 100).toFixed(1)}% Chance
                </span>
                <span className="text-[10px] text-zinc-600 flex items-center gap-1 font-mono">
                  <Clock size={10} />
                  {new Date(a.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm font-black uppercase tracking-tight">
                <span className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{a.winner} <span className="text-zinc-600 text-[10px]">({a.winnerPower})</span></span>
                <span className="text-zinc-700 px-2 text-[10px]">DEFEATED</span>
                <span className="text-zinc-500 line-through decoration-red-500">{a.loser} <span className="text-zinc-700 text-[10px]">({a.loserPower})</span></span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
