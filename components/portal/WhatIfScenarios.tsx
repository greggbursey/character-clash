"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const scenarios = [
  {
    title: "The Billionaire Brawl",
    description: "What happens if Batman and Iron Man cross paths? Technology vs Strategy. While Iron Man boasts overwhelming firepower and flight, Batman's tactical genius and EMP weaponry could ground the Avenger. According to the Elo logic, Iron Man (500) has a massive advantage over Batman (280) in a straight fight, leaving Bruce heavily reliant on prep-time to avoid a <10% win probability.",
    winner: "Iron Man",
    loser: "Batman",
    probability: 78
  },
  {
    title: "Gods of Thunder",
    description: "Thor vs Raiden. Two deities who command the skies. Thor's Asgardian physiology and Mjolnir make him a planetary threat (890), while Raiden (680) is an Elder God restricted by Earthrealm's rules. Raiden's teleportation gives him extreme mobility, but Thor's raw durability would likely shrug off most lightning strikes.",
    winner: "Thor",
    loser: "Raiden",
    probability: 76
  },
  {
    title: "The Ultimate Hunter",
    description: "Scorpion vs Boba Fett. The Netherrealm specter against the galaxy's deadliest bounty hunter. Boba Fett sits at a low Tier 3, relying on his jetpack and blaster. Scorpion (500) wields hellfire and teleportation. Fett's Mandalorian armor is tough, but it's not meant to withstand supernatural pyromancy.",
    winner: "Scorpion",
    loser: "Boba Fett",
    probability: 85
  }
];

export function WhatIfScenarios() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % scenarios.length);
    }, 15000); // Rotate every 15s
    return () => clearInterval(interval);
  }, []);

  const current = scenarios[currentIndex];

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/40 rounded-[2rem] p-6 relative overflow-hidden flex flex-col items-center text-center">
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <Sparkles className="text-purple-500 mb-4 w-10 h-10" />
      <h3 className="text-xl font-black uppercase tracking-[0.2em] text-white mb-2">What If?</h3>
      <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-8">Theoretical Multiverse Matchups</p>

      <div className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-full"
          >
            <h4 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              {current.title}
            </h4>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6 text-left">
              {current.description}
            </p>
            
            <div className="mt-auto bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex justify-between items-center text-left">
              <div>
                 <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Estimated Favorite</p>
                 <p className="font-black text-white">{current.winner}</p>
              </div>
              <div className="text-right">
                 <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Win Probability</p>
                 <p className="font-mono text-purple-400">{current.probability}%</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Dots */}
      <div className="flex gap-2 mt-6">
        {scenarios.map((_, i) => (
          <button 
             key={i}
             onClick={() => setCurrentIndex(i)}
             className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-purple-500 w-4' : 'bg-zinc-700'}`}
          />
        ))}
      </div>
    </div>
  );
}
