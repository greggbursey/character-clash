"use client";

import { useRef, useCallback, useEffect } from "react";
import { BATTLE_TRACKS } from "@/data/audio";
import { getAssetPath } from "@/lib/utils";

interface UseBattleMusicOptions {
  volume?: number;
  fadeDuration?: number;
}

export function useBattleMusic(options: UseBattleMusicOptions = {}) {
  const { volume = 0.15, fadeDuration = 2_000 } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearFade = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const start = useCallback(() => {
    clearFade();

    // Pick a random track
    const randomTrack = BATTLE_TRACKS[Math.floor(Math.random() * BATTLE_TRACKS.length)];
    const trackPath = getAssetPath(randomTrack);

    if (!audioRef.current) {
      audioRef.current = new Audio(trackPath);
    } else {
      audioRef.current.src = trackPath;
    }

    audioRef.current.volume = 0; // Start at 0 for fade in
    audioRef.current.loop = true;

    audioRef.current.play().then(() => {
      // Fade in logic
      const fadeIntervalTime = 50;
      const steps = Math.ceil(fadeDuration / fadeIntervalTime);
      const stepAmount = volume / steps;

      fadeIntervalRef.current = setInterval(() => {
        if (!audioRef.current) {
          clearFade();
          return;
        }

        if (audioRef.current.volume + stepAmount < volume) {
          audioRef.current.volume += stepAmount;
        } else {
          audioRef.current.volume = volume;
          clearFade();
        }
      }, fadeIntervalTime);
    }).catch(err => console.log("Audio play blocked by browser:", err));
  }, [volume, fadeDuration]);

  const stop = useCallback((immediate = false) => {
    if (!audioRef.current) return;

    clearFade();

    if (immediate) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      return;
    }

    // Smooth fade out
    const fadeIntervalTime = 50;
    const steps = Math.ceil(fadeDuration / fadeIntervalTime);
    const stepAmount = audioRef.current.volume / steps;

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) {
        clearFade();
        return;
      }

      if (audioRef.current.volume - stepAmount > 0) {
        audioRef.current.volume -= stepAmount;
      } else {
        audioRef.current.volume = 0;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        clearFade();
      }
    }, fadeIntervalTime);
  }, [fadeDuration]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearFade();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { start, stop };
}
