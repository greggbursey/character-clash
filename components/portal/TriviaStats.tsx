"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Award, Target, Hash, ChevronRight } from "lucide-react";
import { getTriviaStats } from "@/lib/trivia-service";

export function TriviaStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    const data = await getTriviaStats();
    setStats(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
    // Refresh stats every 30 seconds if page is active
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !stats) {
    return (
      <div className="bg-zinc-900/30 border border-zinc-800/40 rounded-[2rem] p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Accessing Archives...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-zinc-900/30 border border-zinc-800/40 rounded-[2rem] p-8 flex flex-col items-center justify-center min-h-[400px]">
        <Target className="text-zinc-700 mb-4 w-12 h-12" />
        <h3 className="text-zinc-400 font-black uppercase tracking-widest">No Data Recorded</h3>
        <p className="text-zinc-600 text-xs mt-2 text-center max-w-[200px]">Complete your first trivia challenge to see your performance metrics here.</p>
      </div>
    );
  }

  const bestUniverse = Object.entries(stats.universeStats as Record<string, any>)
    .reduce((a, b) => (a[1].total/a[1].count > b[1].total/b[1].count ? a : b), ["None", { total: 0, count: 1 }]);

  const bestCharacter = Object.entries(stats.characterStats as Record<string, any>)
    .reduce((a, b) => (a[1].total/a[1].count > b[1].total/b[1].count ? a : b), ["None", { total: 0, count: 1 }]);

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/40 rounded-[2rem] p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black uppercase tracking-wider text-white flex items-center gap-2">
            <TrendingUp className="text-purple-500" size={20} />
            Global Analytics
          </h3>
          <p className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase mt-1">Real-time performance metrics</p>
        </div>
        <div className="bg-zinc-800/50 px-3 py-1 rounded-full border border-zinc-700/50">
          <span className="text-purple-400 font-black text-xs">{stats.totalCompletions} CHALLENGES</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-zinc-800/20 border border-zinc-800/50 rounded-2xl p-4 flex flex-col items-center text-center">
          <Award className="text-yellow-500 mb-2" size={20} />
          <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Top Universe</span>
          <span className="text-white font-bold text-sm truncate w-full px-2">{bestUniverse[0]}</span>
          <span className="text-zinc-500 text-[10px] font-mono mt-1">Avg: {((bestUniverse[1].total / bestUniverse[1].count / 10) * 100).toFixed(0)}%</span>
        </div>
        <div className="bg-zinc-800/20 border border-zinc-800/50 rounded-2xl p-4 flex flex-col items-center text-center">
          <Award className="text-purple-500 mb-2" size={20} />
          <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Top Specialist</span>
          <span className="text-white font-bold text-sm truncate w-full px-2">{bestCharacter[0]}</span>
          <span className="text-zinc-500 text-[10px] font-mono mt-1">Avg: {((bestCharacter[1].total / bestCharacter[1].count / 5) * 100).toFixed(0)}%</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
        <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-2 px-1">Performance by Universe</h4>
        {Object.entries(stats.universeStats).map(([name, data]: [string, any]) => (
          <div key={name} className="group flex items-center justify-between bg-zinc-800/10 hover:bg-zinc-800/30 border border-transparent hover:border-zinc-700/30 p-3 rounded-xl transition-all">
            <div className="flex items-center gap-3">
              <div className="bg-zinc-900 w-8 h-8 rounded-lg flex items-center justify-center border border-zinc-800 text-purple-500 group-hover:scale-110 transition-transform">
                <Hash size={14} />
              </div>
              <div>
                <span className="text-zinc-300 font-bold text-xs uppercase">{name}</span>
                <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-tighter">{data.count} sessions completed</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-purple-400 font-mono font-bold text-sm">
                {((data.total / data.count / 10) * 100).toFixed(0)}%
              </span>
              <div className="w-16 h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-purple-500" 
                  style={{ width: `${(data.total / data.count / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={fetchStats}
        className="mt-6 flex items-center justify-center gap-1 text-zinc-600 hover:text-white transition-colors py-2"
      >
        <span className="text-[10px] font-black uppercase tracking-widest">Sync Archives</span>
        <ChevronRight size={12} />
      </button>
    </div>
  );
}
