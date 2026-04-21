import { useEffect, useCallback, useRef, useSyncExternalStore } from 'react';

export function useNarration() {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const supported = useSyncExternalStore(
    useCallback(() => () => {}, []),
    () => typeof window !== 'undefined' && 'speechSynthesis' in window,
    () => false
  );

  const isReady = useSyncExternalStore(
    useCallback((callback: () => void) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return () => {};
      const synth = window.speechSynthesis;
      synth.addEventListener('voiceschanged', callback);
      
      // Some browsers don't fire voiceschanged if voices are already loaded
      if (synth.getVoices().length > 0) {
        callback();
      }

      return () => synth.removeEventListener('voiceschanged', callback);
    }, []),
    () => typeof window !== 'undefined' && 'speechSynthesis' in window && (window.speechSynthesis.getVoices().length > 0 || !!synthRef.current),
    () => false
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      const voices = synthRef.current.getVoices();
      const preferredVoice = 
        voices.find(v => v.name.includes('Google UK English Male')) || 
        voices.find(v => v.name.includes('Microsoft Mark')) || 
        voices.find(v => v.lang === 'en-GB') ||
        voices.find(v => v.lang === 'en-US');
        
      if (preferredVoice) {
        voiceRef.current = preferredVoice;
      }
    }

    return () => {
      if (synthRef.current) synthRef.current.cancel();
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    };
  }, [isReady]);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!synthRef.current) {
      if (onEnd) onEnd();
      return;
    }

    // Clear any existing safety timeout
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);

    // Explicitly nullify previous listeners before cancelling
    if (currentUtteranceRef.current) {
      currentUtteranceRef.current.onend = null;
      currentUtteranceRef.current.onerror = null;
    }
    
    // On some mobile browsers, cancel() can be slow or hanging
    try {
      synthRef.current.cancel(); 
    } catch (e) {
      console.warn("Speech synthesis cancel failed", e);
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtteranceRef.current = utterance;

    if (voiceRef.current) {
      utterance.voice = voiceRef.current;
    } else {
      // Try to get voices one more time if not set
      const voices = synthRef.current.getVoices();
      if (voices.length > 0) {
        voiceRef.current = voices.find(v => v.lang.startsWith('en')) || voices[0];
        utterance.voice = voiceRef.current;
      }
    }
    
    utterance.rate = 0.95;
    utterance.pitch = 0.9;

    const handleEnd = () => {
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      currentUtteranceRef.current = null;
      if (onEnd) onEnd();
    };

    utterance.onend = handleEnd;

    utterance.onerror = (e) => {
      // Don't trigger onEnd if it was a manual cancellation
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      console.warn("Speech synthesis error:", e);
      handleEnd();
    };

    // Safety timeout: calculate based on text length (approx 100ms per char + 4s buffer)
    const timeoutMs = Math.max(5000, (text.length * 100) + 4000);
    safetyTimeoutRef.current = setTimeout(() => {
      console.warn("Speech synthesis safety timeout triggered for text:", text.substring(0, 30) + "...");
      handleEnd();
    }, timeoutMs);

    try {
      synthRef.current.speak(utterance);
      // On some mobile browsers, we need to resume if it was auto-paused
      if (synthRef.current.paused) {
        synthRef.current.resume();
      }
    } catch (e) {
      console.error("Speech synthesis speak failed", e);
      handleEnd();
    }
  }, []); // Removed isReady dependency to avoid unnecessary recreations

  const stop = useCallback(() => {
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    if (currentUtteranceRef.current) {
      currentUtteranceRef.current.onend = null;
      currentUtteranceRef.current.onerror = null;
      currentUtteranceRef.current = null;
    }
    if (synthRef.current) {
      try {
        synthRef.current.cancel();
      } catch (e) {}
    }
  }, []);

  return { speak, stop, isReady, supported };
}

