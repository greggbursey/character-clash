"use client";

import { useRef, useCallback, useEffect } from "react";
import { BATTLE_TRACKS } from "@/data/audio";
import { getAssetPath } from "@/lib/utils";

interface UseBattleMusicOptions {
  volume?: number;
  fadeDuration?: number;
}

export function useBattleMusic(options: UseBattleMusicOptions = {}) {
  const { volume = 0.5, fadeDuration = 2_000 } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    // Clear any existing fade-out intervals
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    // Pick a random track
    const randomTrack = BATTLE_TRACKS[Math.floor(Math.random() * BATTLE_TRACKS.length)];
    const trackPath = getAssetPath(randomTrack);
    
    if (!audioRef.current) {
      audioRef.current = new Audio(trackPath);
    } else {
      audioRef.current.src = trackPath;
    }

    audioRef.current.volume = volume;
    audioRef.current.loop = true;
    audioRef.current.play().catch(err => console.log("Audio play blocked by browser:", err));
  }, [volume]);

  const stop = useCallback(() => {
    if (!audioRef.current) return;

    // Smooth fade out
    const fadeIntervalTime = 100; // ms
    const fadeSteps = Math.ceil(fadeDuration / fadeIntervalTime);
    const fadeStepAmount = audioRef.current.volume / fadeSteps;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    fadeIntervalRef.current = setInterval(() => {
      if (audioRef.current && audioRef.current.volume > fadeStepAmount) {
        audioRef.current.volume -= fadeStepAmount;
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current.volume = volume; // Reset for next play
        }
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }
    }, fadeIntervalTime);
  }, [volume, fadeDuration]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return { start, stop };
}
