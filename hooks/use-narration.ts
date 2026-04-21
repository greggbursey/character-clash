import { useEffect, useCallback, useRef, useSyncExternalStore } from 'react';

export function useNarration() {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

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
      return () => synth.removeEventListener('voiceschanged', callback);
    }, []),
    () => typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.getVoices().length > 0,
    () => false
  );

  useEffect(() => {
    if (isReady && typeof window !== 'undefined' && 'speechSynthesis' in window) {
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
    };
  }, [isReady]);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!synthRef.current || !isReady) {
      if (onEnd) onEnd();
      return;
    }

    // Explicitly nullify previous listeners before cancelling
    if (currentUtteranceRef.current) {
      currentUtteranceRef.current.onend = null;
      currentUtteranceRef.current.onerror = null;
    }
    synthRef.current.cancel(); 
    
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtteranceRef.current = utterance;

    if (voiceRef.current) {
      utterance.voice = voiceRef.current;
    }
    
    utterance.rate = 0.95;
    utterance.pitch = 0.9;

    utterance.onend = () => {
      currentUtteranceRef.current = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      // Don't trigger onEnd if it was a manual cancellation
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      currentUtteranceRef.current = null;
      if (onEnd) onEnd();
    };

    synthRef.current.speak(utterance);
  }, [isReady]);

  const stop = useCallback(() => {
    if (currentUtteranceRef.current) {
      currentUtteranceRef.current.onend = null;
      currentUtteranceRef.current.onerror = null;
      currentUtteranceRef.current = null;
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  }, []);

  return { speak, stop, isReady, supported };
}
