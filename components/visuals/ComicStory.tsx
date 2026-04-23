import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { StoryPanel } from '@/lib/story-generator';
import { useNarration } from '@/hooks/use-narration';

import { getAssetPath } from '@/lib/utils';

interface ComicStoryProps {
  panels: StoryPanel[];
  img1: string; // Fallback
  img2: string; // Fallback
  name1: string;
  name2: string;
  color1: string;
  color2: string;
  onStoryComplete: () => void;
  onSkip: () => void;
}

/** Extract the first word and the rest of the text */
function splitFirstWord(text: string): [string, string] {
  const trimmed = text.trim();
  const spaceIndex = trimmed.indexOf(' ');
  if (spaceIndex === -1) return [trimmed, ''];
  return [trimmed.slice(0, spaceIndex), trimmed.slice(spaceIndex)];
}

const ImageLayout = ({ 
  images, 
  type, 
  effectClass 
}: { 
  images: { url: string; name: string; type?: 'preview' | 'background' }[], 
  type: 'preview' | 'background',
  effectClass: string
}) => {
  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className={`w-full h-full relative ${effectClass}`}>
        <Image 
          src={getAssetPath(images[0].url)} 
          alt={images[0].name} 
          fill 
          className={type === 'background' ? "object-cover" : "object-contain filter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] md:p-8 p-4"} 
          priority
        />
      </div>
    );
  }

  // Dynamic Comic Panel Layout (Classic Spread Style)
  const getPanelStyles = (index: number, total: number) => {
    // Define some classic layout "slots" based on total image count
    const layouts: Record<number, { w: string, h: string, t: string, l: string, rotate: number }[]> = {
      1: [{ w: '100%', h: '100%', t: '0%', l: '0%', rotate: 0 }],
      2: [
        { w: '60%', h: '90%', t: '5%', l: '2%', rotate: -0.5 },
        { w: '45%', h: '70%', t: '15%', l: '53%', rotate: 0.5 }
      ],
      3: [
        { w: '96%', h: '55%', t: '2%', l: '2%', rotate: 0 },
        { w: '46%', h: '38%', t: '60%', l: '2%', rotate: -1 },
        { w: '48%', h: '38%', t: '60%', l: '50%', rotate: 1 }
      ],
      4: [
        { w: '48%', h: '96%', t: '2%', l: '2%', rotate: -0.5 },
        { w: '48%', h: '46%', t: '2%', l: '52%', rotate: 0.5 },
        { w: '23%', h: '46%', t: '52%', l: '52%', rotate: 0 },
        { w: '23%', h: '46%', t: '52%', l: '77%', rotate: 0 }
      ],
      5: [
        { w: '38%', h: '60%', t: '2%', l: '2%', rotate: -0.5 },
        { w: '58%', h: '30%', t: '2%', l: '42%', rotate: 0.5 },
        { w: '58%', h: '30%', t: '34%', l: '42%', rotate: 0 },
        { w: '48%', h: '30%', t: '68%', l: '2%', rotate: 0 },
        { w: '48%', h: '30%', t: '68%', l: '52%', rotate: -0.5 }
      ],
      6: [
        { w: '31%', h: '46%', t: '2%', l: '2%', rotate: -0.5 },
        { w: '31%', h: '46%', t: '2%', l: '34.5%', rotate: 0 },
        { w: '31%', h: '46%', t: '2%', l: '67%', rotate: 0.5 },
        { w: '48%', h: '46%', t: '52%', l: '2%', rotate: 0.5 },
        { w: '23%', h: '46%', t: '52%', l: '52%', rotate: -0.5 },
        { w: '23%', h: '46%', t: '52%', l: '77%', rotate: 0 }
      ]
    };

    const count = Math.min(total, 6);
    const layout = layouts[count] || layouts[6];
    return layout[index % layout.length];
  };

  return (
    <div className={`relative w-full h-full p-2 overflow-hidden bg-zinc-950 ${effectClass}`}>
      {images.slice(0, 6).map((img, i) => {
        const style = getPanelStyles(i, images.slice(0, 6).length);
        const isBg = img.type === 'background' || type === 'background';

        return (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { delay: 0.1 * i, duration: 0.5, ease: "easeOut" }
            }}
            whileHover={{ 
              scale: 1.02, 
              zIndex: 50,
              transition: { duration: 0.2 }
            }}
            className="absolute border-[3px] border-zinc-900 shadow-[inset_0_0_20px_rgba(0,0,0,0.8),10px_10px_25px_rgba(0,0,0,0.5)] overflow-hidden bg-black"
            style={{ 
              zIndex: i + 10,
              width: style.w,
              height: style.h,
              top: style.t,
              left: style.l,
              rotate: `${style.rotate}deg`,
            }}
          >
             <motion.div 
              className="relative w-full h-full"
              animate={{ 
                scale: [1, i % 2 === 0 ? 1.15 : 0.95, 1],
                x: [0, i % 3 === 0 ? 5 : -5, 0],
                y: [0, i % 2 === 0 ? -5 : 5, 0]
              }}
              transition={{ 
                duration: 12 + i * 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Image 
                src={getAssetPath(img.url)} 
                alt={img.name} 
                fill 
                className={`${isBg ? "object-cover" : "object-contain p-4"} filter brightness-110 contrast-110 grayscale-[0.2] hover:grayscale-0 transition-all duration-500`} 
                priority
              />
            </motion.div>
            
            {/* Authentic Comic Gutter Effect */}
            <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.1] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:3px_3px]" />

            {/* Subtle floating effect for the panel container itself */}
            <motion.div 
              className="absolute inset-0 pointer-events-none"
              animate={{ 
                x: [0, 1, 0],
                y: [0, -1, 0]
              }}
              transition={{ 
                duration: 5 + i, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default function ComicStory({
  panels,
  img1,
  img2,
  name1,
  name2,
  color1,
  color2,
  onStoryComplete,
  onSkip,
}: ComicStoryProps) {
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const { speak, stop } = useNarration();
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const advancePanel = useCallback(() => {
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    stop();
    if (currentPanelIndex < panels.length - 1) {
      setCurrentPanelIndex(prev => prev + 1);
    } else {
      onStoryComplete();
    }
  }, [currentPanelIndex, panels, stop, onStoryComplete]);

  useEffect(() => {
    if (currentPanelIndex < panels.length) {
      const panel = panels[currentPanelIndex];
      let narrationStarted = false;
      let cancelled = false;

      // Primary path: narration finishes → wait 1s → advance
      speak(panel.text, () => {
        narrationStarted = true;
        if (cancelled) return;
        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = setTimeout(() => {
          if (!cancelled) advancePanel();
        }, 1000);
      });

      // Safety fallback: if narration never started (no voice / unsupported),
      // auto-advance after a generous reading time so the story doesn't get stuck.
      // This only fires if narration hasn't already triggered advancement.
      const fallbackMs = Math.max(5000, (panel.text.length / 10) * 1000);
      const fallbackTimer = setTimeout(() => {
        if (!narrationStarted && !cancelled) {
          if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
          transitionTimeoutRef.current = setTimeout(() => {
            if (!cancelled) advancePanel();
          }, 1000);
        }
      }, fallbackMs);

      return () => {
        cancelled = true;
        clearTimeout(fallbackTimer);
        stop();
        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      };
    }
  }, [currentPanelIndex, panels, speak, stop, advancePanel]);


  useEffect(() => {
    return () => stop();
  }, [stop]);

  const currentPanel = panels[currentPanelIndex];
  if (!currentPanel) return null;

  const effectClasses = {
    pan: 'animate-[panImage_10s_ease-in-out_infinite]',
    zoom: 'animate-[zoomImage_10s_ease-in-out_infinite]',
    shake: 'animate-[shakeImage_0.5s_ease-in-out]',
    flash: 'animate-[flashImage_1s_ease-in-out]',
    none: ''
  };

  const getContainerStyle = (focus: 1 | 2 | 'split') => {
    if (focus === 1) return { background: `linear-gradient(to right, ${color1}33, transparent)` };
    if (focus === 2) return { background: `linear-gradient(to left, ${color2}33, transparent)` };
    return { background: `linear-gradient(to right, ${color1}33, transparent, ${color2}33)` };
  };

  const [firstWord, restText] = splitFirstWord(currentPanel.text);

  return (
    <div className="fixed inset-0 z-[100] bg-black pointer-events-auto flex flex-col">
      <button 
        onClick={() => {
          stop();
          onSkip();
        }}
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-widest uppercase rounded-full backdrop-blur transition-all"
      >
        Skip Story
      </button>

      {/* Main Panel: split into image zone + caption zone */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-2 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPanel.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-5xl flex flex-col border-4 border-zinc-900 bg-zinc-950 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            style={getContainerStyle(currentPanel.focus)}
          >
            {/* ── Image Zone ── */}
            <div className="relative w-full aspect-video min-h-[180px] overflow-hidden bg-zinc-900">
              {/* Halftone + paper texture overlays */}
              <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.12] mix-blend-overlay" 
                   style={{ backgroundImage: 'radial-gradient(circle, #000 1.2px, transparent 1.2px)', backgroundSize: '6px 6px' }} />
              <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.05] animate-pulse" 
                   style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }} />

              {currentPanel.focus === 'split' && (
                <div className="absolute inset-0 z-10 w-full h-full flex justify-center pointer-events-none">
                  <div className="w-1 md:w-2 h-[150%] bg-zinc-900 shadow-[0_0_20px_rgba(0,0,0,0.5)] transform -rotate-12 translate-y-[-10%]" />
                </div>
              )}

              {(currentPanel.focus === 1 || currentPanel.focus === 'split') && (
                <div 
                  className={`absolute inset-0 z-0 ${currentPanel.focus === 'split' ? 'w-[55%] left-0' : 'w-full'}`}
                  style={{ 
                    clipPath: currentPanel.focus === 'split' ? 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' : 'none'
                  }}
                >
                  <ImageLayout 
                    images={currentPanel.images1 || [{ url: img1, name: name1 }]} 
                    type={currentPanel.imageType1 || 'preview'}
                    effectClass={effectClasses[currentPanel.effect]}
                  />
                </div>
              )}

              {(currentPanel.focus === 2 || currentPanel.focus === 'split') && (
                <div 
                  className={`absolute inset-0 z-0 ${currentPanel.focus === 'split' ? 'w-[60%] right-0 left-auto' : 'w-full'}`}
                  style={{ 
                    clipPath: currentPanel.focus === 'split' ? 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' : 'none'
                  }}
                >
                  <ImageLayout 
                    images={currentPanel.images2 || [{ url: img2, name: name2 }]} 
                    type={currentPanel.imageType2 || 'preview'}
                    effectClass={effectClasses[currentPanel.effect]}
                  />
                </div>
              )}
            </div>

            {/* ── Caption Zone ── */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", damping: 15 }}
              className="relative z-30 px-3 py-3 md:px-8 md:py-5"
            >
              <div className="bg-yellow-400 border-4 border-black p-3 md:p-6 shadow-[6px_6px_0px_#000000] relative transform -rotate-[0.5deg] hover:rotate-0 transition-transform">
                <div className="absolute -top-3 -left-3 w-5 h-5 md:w-6 md:h-6 bg-yellow-600 border-b-4 border-r-4 border-black" />
                <div className="absolute top-2 right-2 flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                   <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                </div>
                <p className="font-sans text-sm md:text-xl lg:text-2xl font-black text-black uppercase leading-tight tracking-tighter drop-shadow-sm">
                  <span className="comic-first-word">{firstWord}</span>
                  {restText}
                </p>
              </div>
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next/Finish button */}
      <div className="flex-shrink-0 flex justify-end px-4 pb-4 md:px-12 md:pb-8">
        <button 
          onClick={advancePanel}
          className="z-[110] flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-black uppercase tracking-widest text-sm border-4 border-black shadow-[8px_8px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-1 hover:translate-y-1 active:scale-95 transition-all group"
        >
          <span className="drop-shadow-sm">
            {currentPanelIndex < panels.length - 1 ? 'Next' : 'Finish'}
          </span>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform stroke-[3px]" />
        </button>
      </div>

      <style jsx global>{`
        .comic-first-word {
          font-size: 1.75rem;
          line-height: 1.1;
          float: left;
          margin-right: 0.5rem;
          margin-top: 0.1rem;
          background: #000;
          color: #facc15;
          padding: 0.1em 0.4em;
          border: 2px solid #000;
          box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
          text-transform: uppercase;
          font-weight: 900;
          letter-spacing: -0.03em;
        }
        @media (min-width: 768px) {
          .comic-first-word {
            font-size: 2.75rem;
            padding: 0.05em 0.45em;
            margin-right: 0.6rem;
          }
        }
        @keyframes panImage {
          0% { transform: scale(1.1) translateX(0); }
          50% { transform: scale(1.1) translateX(2%); }
          100% { transform: scale(1.1) translateX(0); }
        }
        @keyframes zoomImage {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes shakeImage {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px) rotate(-1deg); }
          75% { transform: translateX(10px) rotate(1deg); }
        }
        @keyframes flashImage {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(2) contrast(1.5); }
        }
      `}</style>
    </div>
  );
}
