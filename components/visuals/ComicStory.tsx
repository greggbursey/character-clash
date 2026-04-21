import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
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

const ImageLayout = ({ 
  images, 
  type, 
  effectClass 
}: { 
  images: { url: string; name: string }[], 
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

  return (
    <div className={`grid grid-cols-2 grid-rows-2 w-full h-full p-2 gap-2 ${effectClass}`}>
      {images.slice(0, 4).map((img, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 * i }}
          className="relative w-full h-full overflow-hidden border-2 border-black/50 shadow-lg rounded-sm bg-zinc-900/40 backdrop-blur-sm"
        >
           <Image 
            src={getAssetPath(img.url)} 
            alt={img.name} 
            fill 
            className="object-contain p-2 hover:scale-110 transition-transform duration-500" 
            priority
          />
        </motion.div>
      ))}
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
  const { speak, stop, isReady, supported } = useNarration();
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (supported && !isReady && currentPanelIndex === 0) return;

    if (currentPanelIndex < panels.length) {
      const panel = panels[currentPanelIndex];
      speak(panel.text, () => {
        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        
        transitionTimeoutRef.current = setTimeout(() => {
          if (currentPanelIndex < panels.length - 1) {
            setCurrentPanelIndex(prev => prev + 1);
          } else {
            onStoryComplete();
          }
        }, 800); 
      });
    }

    return () => {
      stop();
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, [currentPanelIndex, panels, speak, stop, onStoryComplete, isReady, supported]);

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

      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPanel.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-5xl aspect-video md:aspect-[21/9] border-4 border-zinc-900 bg-zinc-950 relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            style={getContainerStyle(currentPanel.focus)}
          >
            <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.08] mix-blend-overlay" 
                 style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
            <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] animate-pulse" 
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

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, type: "spring", damping: 15 }}
              className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-30"
            >
              <div className="bg-yellow-400 border-4 border-black p-4 md:p-8 shadow-[8px_8px_0px_#000000] relative max-w-2xl transform -rotate-1 hover:rotate-0 transition-transform">
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-600 border-b-4 border-r-4 border-black" />
                <div className="absolute top-2 right-2 flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                   <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                </div>
                <p className="font-sans text-sm md:text-2xl font-black text-black uppercase leading-tight tracking-tighter drop-shadow-sm comic-caption">
                  {currentPanel.text}
                </p>
              </div>
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .comic-caption::first-letter {
          font-size: 3.5rem;
          line-height: 1;
          float: left;
          margin-right: 0.5rem;
          margin-top: 0.25rem;
          background: #000;
          color: #facc15;
          padding: 0 0.5rem;
          border: 2px solid #000;
          box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
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

