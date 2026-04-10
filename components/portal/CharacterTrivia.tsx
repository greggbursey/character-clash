"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { HelpCircle, Brain, RefreshCw, ArrowLeft, Search as SearchIcon } from "lucide-react";
import { characters as allCharactersData } from "@/data/characters";
import { universeLoreData } from "@/data/universe-lore";
import { getAssetPath } from "@/lib/utils";
import { Character } from "@/types";
import { saveTriviaSession } from "@/lib/trivia-service";

interface TriviaQuestion {
  question: string;
  options: (Character | string)[];
  answer: Character | string;
  sourceType: 'origin' | 'battles' | 'abilities' | 'secret' | 'lore' | 'universe';
  isFactQuiz?: boolean;
}

type QuizCategory = 'all' | 'universe' | 'character';

function maskName(text: string, name: string): string {
  if (!text || !name) return text;
  
  // Create a regex that matches the name case-insensitively
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapedName, 'gi');
  
  return text.replace(regex, "________________");
}

function generateQuestions(
  category: QuizCategory, 
  filterValue: string = ""
): TriviaQuestion[] {
  let initialPool = allCharactersData.filter(c => universeLoreData[c.universe]?.active !== false);
  let primaryChar: Character | null = null;
  
  if (category === 'universe' && filterValue) {
    initialPool = initialPool.filter(c => c.universe === filterValue);
  } else if (category === 'character' && filterValue) {
    primaryChar = allCharactersData.find(c => c.id === filterValue) || null;
    if (primaryChar) {
      initialPool = [primaryChar];
    }
  }

  if (initialPool.length === 0) return [];
  
  const questionCount = category === 'character' ? 8 : 10;
  const questions: TriviaQuestion[] = [];
  
  // Track used facts/questions to prevent duplication in a single session
  const usedFacts = new Set<string>();

  for (let i = 0; i < questionCount; i++) {
    const correctChar = category === 'character' ? primaryChar! : initialPool[Math.floor(Math.random() * initialPool.length)];
    
    // For character mode, we have a specific pool of possible facts
    let availablePoolFacts = correctChar.triviaPool || [];
    let availableLoreTypes = ['origin', 'battles', 'abilities', 'secret'];

    // If we're in character mode, we want to exhaust the triviaPool first, then lore
    // but we should still randomize the order
    
    let questionText = "";
    let answerText = "";
    let finalSourceType: any = 'lore';
    let isFactQuiz = true;

    // Decide what kind of question to generate
    // Priority: 1. Unused Pool Fact, 2. Unused Lore Section, 3. Random fallback
    
    const unusedPoolFacts = availablePoolFacts.filter(f => !usedFacts.has(f));
    const unusedLoreTypes = availableLoreTypes.filter(t => !usedFacts.has(`${correctChar.id}-${t}`));

    if (unusedPoolFacts.length > 0 && (category === 'character' || Math.random() > 0.4)) {
      // Use a Pool Fact
      const fact = unusedPoolFacts[Math.floor(Math.random() * unusedPoolFacts.length)];
      usedFacts.add(fact);
      answerText = fact;
      finalSourceType = 'lore';
      
      if (category === 'character') {
         questionText = `Which of these is a verified fact regarding the legend of ${correctChar.name}?`;
      } else {
         const templates = [
           `Which ${correctChar.universe} legend matches this record: "${fact}"?`,
           `Whose history contains this specific detail: "${fact}"?`,
           `Which character's file lists this entry: "${fact}"?`
         ];
         questionText = templates[Math.floor(Math.random() * templates.length)];
      }
    } else if (unusedLoreTypes.length > 0) {
      // Use a Lore Section
      const type = unusedLoreTypes[Math.floor(Math.random() * unusedLoreTypes.length)];
      usedFacts.add(`${correctChar.id}-${type}`);
      finalSourceType = type;

      const triviaParts = correctChar.triviaInfo?.split('\n\n') || [];
      const section = triviaParts.find(p => p.toLowerCase().startsWith(type.slice(0, 4)));
      const content = section 
        ? section.split(': ').slice(1).join(': ')
        : correctChar.description;

      const maskedContent = maskName(content, correctChar.name);
      answerText = content;
      
      if (category === 'character') {
        const typeLabels: Record<string, string> = {
          origin: "origin and backstory",
          battles: "legendary battles",
          abilities: "special abilities and gear",
          secret: "hidden secrets or trivia"
        };
        questionText = `Which of these is the correct ${typeLabels[type] || type} for ${correctChar.name}?`;
      } else {
        const templates = [
          `Which ${correctChar.universe} legend is described here: "${maskedContent}"?`,
          `Based on these logs, identify the character: "${maskedContent}"`,
          `In the ${correctChar.universe} archives, who is associated with: "${maskedContent}"?`
        ];
        questionText = templates[Math.floor(Math.random() * templates.length)];
      }
    } else if (category !== 'character' && Math.random() > 0.7) {
      // Universe check fallback (rare)
      questionText = `Which universe does ________________ belong to?`;
      answerText = correctChar.universe;
      finalSourceType = 'universe';
      isFactQuiz = false;
    } else {
      // Emergency random pool fact (repetition allowed if exhausted)
      const fact = availablePoolFacts.length > 0 
        ? availablePoolFacts[Math.floor(Math.random() * availablePoolFacts.length)]
        : correctChar.description;
      answerText = fact;
      finalSourceType = 'lore';
      questionText = category === 'character' 
        ? `Which of these details is associated with ${correctChar.name}?`
        : `Which character matches this detail: "${fact}"?`;
    }

    // Options generation
    const options: (Character | string)[] = [];
    
    if (isFactQuiz) {
      options.push(answerText);
      
      // Distractors
      const distractorPool = allCharactersData.filter(c => c.id !== correctChar.id);
      const sameUniDistractors = distractorPool.filter(c => c.universe === correctChar.universe).sort(() => 0.5 - Math.random());
      const otherDistractors = distractorPool.filter(c => c.universe !== correctChar.universe).sort(() => 0.5 - Math.random());
      const prioritizedDistractors = [...sameUniDistractors, ...otherDistractors];

      for (const dist of prioritizedDistractors) {
        if (options.length >= 4) break;
        
        let dContent = "";
        // Preference for pool facts from distractors
        if (dist.triviaPool && dist.triviaPool.length > 0) {
          dContent = dist.triviaPool[Math.floor(Math.random() * dist.triviaPool.length)];
        } else {
          dContent = dist.description;
        }

        if (dContent && !options.includes(dContent) && dContent !== answerText) {
          options.push(dContent);
        }
      }
      
      while (options.length < 4) {
        options.push(`Historical Data Fragment #${Math.floor(Math.random() * 9999)} (Classified)`);
      }
    } else {
      // Universe check options
      const otherUniverses = Array.from(new Set(allCharactersData.map(c => c.universe)))
        .filter(u => u !== correctChar.universe)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      options.push(correctChar); 
      for (const uni of otherUniverses) {
         const charFromUni = allCharactersData.find(c => c.universe === uni);
         if (charFromUni) options.push(charFromUni);
      }
    }

    questions.push({
      question: questionText,
      options: options.sort(() => 0.5 - Math.random()),
      answer: isFactQuiz ? answerText : correctChar,
      sourceType: finalSourceType,
      isFactQuiz
    });
  }

  return questions;
}

function getScoreMessage(score: number, total: number): string {
  const percentage = (score / total) * 100;
  if (percentage === 100) return "Perfect! You're a True Multiverse Sage! 🏆";
  if (percentage >= 80) return "Impressive! You really know your stuff! 🔥";
  if (percentage >= 50) return "Not bad! You've got a solid grasp of the lore. 👍";
  if (percentage >= 20) return "Getting there! A little more study and you'll be a pro. 📚";
  return "Ouch! Time to hit the archives and try again. 😅";
}

interface CharacterTriviaProps {
  initialCategory?: QuizCategory;
  initialValue?: string;
}

export function CharacterTrivia({ initialCategory, initialValue }: CharacterTriviaProps) {
  const [isPlaying, setIsPlaying] = useState(!!(initialCategory && initialValue));
  const [selectionStep, setSelectionStep] = useState<'mode' | 'universe' | 'character'>(
    initialCategory === 'universe' ? 'universe' : 
    initialCategory === 'character' ? 'character' : 'mode'
  );
  const [charSearchQuery, setCharSearchQuery] = useState("");
  const [category, setCategory] = useState<QuizCategory>(initialCategory || 'all');
  const [filterValue, setFilterValue] = useState(initialValue || "");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<Character | string | null>(null);
  const [questions, setQuestions] = useState<TriviaQuestion[]>(() => {
    if (initialCategory && initialValue) {
      return generateQuestions(initialCategory, initialValue);
    }
    return [];
  });

  const startQuiz = useCallback((cat: QuizCategory, val: string = "") => {
    const q = generateQuestions(cat, val);
    if (q.length === 0) return;
    setQuestions(q);
    setCategory(cat);
    setFilterValue(val);
    setIsPlaying(true);
    setGameOver(false);
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
  }, []);

  const handleAnswer = (opt: Character | string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(opt);
    
    // Check if correct
    const currentQuestion = questions[currentIdx];
    const isCorrect = typeof opt === 'string' 
      ? opt === currentQuestion.answer 
      : opt.id === (currentQuestion.answer as Character).id;

    if (isCorrect) {
      setScore(s => s + 1);
    }

    
    const isLastQuestion = currentIdx === questions.length - 1;
    
    if (isLastQuestion) {
      // Calculate final score accurately (React state might not be updated yet)
      const finalScore = isCorrect ? score + 1 : score;
      saveTriviaSession({
        category,
        filterValue,
        score: finalScore,
        total: questions.length
      });
    }

    setTimeout(() => {
      if (!isLastQuestion) {
        setCurrentIdx(i => i + 1);
        setSelectedAnswer(null);
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  const reset = () => {
    setIsPlaying(false);
    setSelectionStep('mode');
    setCharSearchQuery("");
    setGameOver(false);
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuestions([]);
    setCategory('all');
    setFilterValue("");
  };

  const getResultsTitle = () => {
    if (category === 'universe') return `Master of ${filterValue}`;
    if (category === 'character') {
      const char = allCharactersData.find(c => c.id === filterValue);
      return `${char?.name || 'Specialist'} Fanatic`;
    }
    return "Multiverse Sage";
  };

  const universes = Array.from(new Set(allCharactersData.map(c => c.universe)))
    .filter(u => universeLoreData[u]?.active !== false);

  const filteredCharacters = allCharactersData.filter(c => 
    (universeLoreData[c.universe]?.active !== false) &&
    (c.name.toLowerCase().includes(charSearchQuery.toLowerCase()) ||
     c.universe.toLowerCase().includes(charSearchQuery.toLowerCase()))
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/40 rounded-[2rem] p-6 text-center relative overflow-hidden h-full min-h-[480px] flex flex-col items-center justify-center">
      {!isPlaying ? (
        <div className="flex flex-col items-center w-full max-w-md animate-in fade-in zoom-in duration-300">
          {selectionStep === 'mode' ? (
            <>
              <Brain className="text-purple-500 mb-4 w-12 h-12 opacity-80" />
              <h3 className="text-2xl font-black uppercase tracking-wider text-white mb-2">Character Trivia</h3>
              <p className="text-zinc-500 text-sm mb-6 pb-6 border-b border-zinc-800/50 w-full">Choose your challenge mode.</p>
              
              <div className="grid grid-cols-1 gap-3 w-full">
                <button 
                  onClick={() => startQuiz('all')}
                  className="group relative overflow-hidden bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 p-5 rounded-2xl transition-all text-left"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-purple-400 font-bold uppercase tracking-tight text-sm">The Ultimate Gauntlet</h4>
                      <p className="text-zinc-500 text-[10px] mt-1">Random characters from all universes.</p>
                    </div>
                    <div className="bg-purple-900/40 p-2 rounded-full text-purple-400 group-hover:scale-110 transition-transform">
                      <Brain size={16} />
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => setSelectionStep('universe')}
                  className="group relative overflow-hidden bg-zinc-800/20 hover:bg-zinc-800/40 border border-zinc-800/50 p-5 rounded-2xl transition-all text-left"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-zinc-300 font-bold uppercase tracking-tight text-sm">Universe Mastery</h4>
                      <p className="text-zinc-500 text-[10px] mt-1">Test your knowledge of a specific world.</p>
                    </div>
                    <RefreshCw className="text-zinc-600 group-hover:rotate-180 transition-transform duration-500" size={16} />
                  </div>
                </button>

                <button 
                  onClick={() => setSelectionStep('character')}
                  className="group relative overflow-hidden bg-zinc-800/20 hover:bg-zinc-800/40 border border-zinc-800/50 p-5 rounded-2xl transition-all text-left"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-zinc-300 font-bold uppercase tracking-tight text-sm">Character Specialist</h4>
                      <p className="text-zinc-500 text-[10px] mt-1">5 elite questions about any fighter.</p>
                    </div>
                    <div className="flex -space-x-2">
                       {allCharactersData.slice(0, 3).map(c => (
                         <div key={c.id} className="w-6 h-6 rounded-full border border-zinc-900 overflow-hidden relative">
                           <Image src={getAssetPath(c.previewUrl)} alt="" fill className="object-cover" />
                         </div>
                       ))}
                    </div>
                  </div>
                </button>
              </div>
            </>
          ) : selectionStep === 'universe' ? (
            <div className="w-full flex flex-col h-[350px]">
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setSelectionStep('mode')} className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-white">
                  <ArrowLeft size={18} />
                </button>
                <h4 className="text-white font-bold uppercase tracking-widest text-sm text-left">Select Universe</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1 no-scrollbar pb-4">
                {universes.map(uni => (
                  <button 
                    key={uni}
                    onClick={() => startQuiz('universe', uni)}
                    className="bg-zinc-800/30 hover:bg-zinc-700 border border-zinc-800 p-4 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-all text-center"
                  >
                    {uni}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col h-[350px]">
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setSelectionStep('mode')} className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-white">
                  <ArrowLeft size={18} />
                </button>
                <div className="relative flex-1 group">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-purple-500 transition-colors" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search characters..." 
                    value={charSearchQuery}
                    onChange={(e) => setCharSearchQuery(e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-purple-500/50 rounded-xl py-2 pl-9 pr-4 text-xs text-white outline-none focus:bg-zinc-900 transition-all font-bold placeholder:text-zinc-700 placeholder:font-normal"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-1.5 overflow-y-auto pr-1 no-scrollbar pb-4">
                {filteredCharacters.length > 0 ? filteredCharacters.map(char => (
                  <button 
                    key={char.id}
                    onClick={() => startQuiz('character', char.id)}
                    className="flex items-center gap-3 bg-zinc-800/10 hover:bg-zinc-800/40 border border-transparent hover:border-zinc-800 p-2 rounded-xl transition-all group"
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                      <Image src={getAssetPath(char.previewUrl)} alt={char.name} fill className="object-cover" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">{char.name}</p>
                      <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-tight">{char.universe}</p>
                    </div>
                  </button>
                )) : (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-600 italic text-xs">
                    No characters found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
       ) : gameOver ? (
         <div className="flex flex-col items-center z-10 w-full animate-in fade-in zoom-in duration-500">
          <div className="bg-purple-600/20 p-4 rounded-full mb-4">
            <Brain className="text-purple-400 w-12 h-12" />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-wider text-white mb-1 leading-tight">{getResultsTitle()}</h3>
          <p className="text-purple-400 text-xl font-mono mb-6">Score: {score}/{questions.length}</p>
          
          <div className="text-zinc-400 text-sm italic mb-8 p-4 bg-zinc-800/20 border border-zinc-800/50 rounded-2xl w-full max-w-[320px]">
            {getScoreMessage(score, questions.length)}
          </div>

          <div className="flex flex-col gap-3 w-full max-w-[240px]">
            <button 
              onClick={() => startQuiz(category, filterValue)}
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all uppercase tracking-widest text-xs"
            >
              <RefreshCw size={14} /> Play Again
            </button>
            <button 
              onClick={reset}
              className="text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
            >
              Change Mode
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col z-10">
          <div className="flex justify-between text-xs font-mono text-zinc-500 mb-4 uppercase tracking-widest">
            <span>Q: {currentIdx + 1}/{questions.length}</span>
            <span>Score: {score}</span>
          </div>
          
          <div className="flex flex-col mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-500 mb-1">
              {questions[currentIdx]?.sourceType === 'universe' ? 'Universe Check' : 'Trivia Archive'}
            </span>
            <h4 className="text-lg font-bold text-white leading-tight min-h-[4rem] flex items-center justify-center px-4">
              {questions[currentIdx]?.question}
            </h4>
          </div>
 
          <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-[350px] pr-1 no-scrollbar pb-4">
             {questions[currentIdx]?.options.map((opt, idx) => {
               const isString = typeof opt === 'string';
               const currentQuestion = questions[currentIdx];
               const isCorrect = isString 
                 ? opt === currentQuestion.answer 
                 : opt.id === (currentQuestion.answer as Character).id;
               const isSelected = isString
                 ? selectedAnswer === opt
                 : selectedAnswer && typeof selectedAnswer !== 'string' && selectedAnswer.id === opt.id;

               return (
                 <button
                    key={isString ? `${idx}-${opt.slice(0, 10)}` : opt.id}
                    onClick={() => handleAnswer(opt)}
                    disabled={selectedAnswer !== null}
                    className={`p-3 rounded-xl border text-sm font-bold transition-all flex items-center gap-4 text-left
                      ${selectedAnswer === null ? 'border-zinc-800 bg-zinc-800/50 hover:bg-zinc-700 text-zinc-300 hover:text-white' : ''}
                      ${selectedAnswer !== null && isCorrect ? 'border-green-500 bg-green-500/20 text-green-400' : ''}
                      ${isSelected && !isCorrect ? 'border-red-500 bg-red-500/20 text-red-400' : ''}
                      ${selectedAnswer !== null && !isCorrect && !isSelected ? 'border-zinc-800 bg-zinc-900 text-zinc-600 opacity-50' : ''}
                    `}
                 >
                   {!isString && (
                     <div className="relative w-10 h-10 flex-shrink-0">
                       <Image src={getAssetPath(opt.previewUrl)} alt={opt.name} fill className="rounded-full border-2 border-zinc-700 object-cover bg-zinc-800 shadow-lg" />
                     </div>
                   )}
                   <span className="flex-1">{isString ? opt : opt.name}</span>
                 </button>
               );
             })}
          </div>
        </div>
      )}
      
      <HelpCircle className="absolute -bottom-10 -right-10 w-48 h-48 text-zinc-800/20 rotate-12 pointer-events-none" />
    </div>
  );
}
