"use client";

import Image from "next/image";
import { useState } from "react";
import { HelpCircle, Brain, RefreshCw } from "lucide-react";
import { characters as allCharactersData } from "@/data/characters";
import { getAssetPath } from "@/lib/utils";
import { Character } from "@/types";

interface TriviaQuestion {
  question: string;
  options: Character[];
  answer: Character;
}

function generateQuestions(): TriviaQuestion[] {
  if (allCharactersData.length < 4) return [];
  
  const shuffledChars = [...allCharactersData].sort(() => 0.5 - Math.random()).slice(0, 10);
  return shuffledChars.map(correctChar => {
    
    const isLoreQuestion = Math.random() > 0.5;

    // Ensure options are from distinct universes to avoid ambiguity if asked about Universe
    const incorrectOptions: Character[] = [];
    const distinctChars = allCharactersData.filter(c => c.id !== correctChar.id && c.universe !== correctChar.universe);
    const shuffledOptions = distinctChars.sort(() => 0.5 - Math.random());
    
    for (const char of shuffledOptions) {
       if (incorrectOptions.length >= 3) break;
       if (!incorrectOptions.find(c => c.universe === char.universe)) {
           incorrectOptions.push(char);
       }
    }
      
    const options = [...incorrectOptions, correctChar].sort(() => 0.5 - Math.random());
    
    let questionText = "";
    if (isLoreQuestion) {
      // use description snippet to form question
      questionText = `Whose lore states: "${correctChar.description}"?`;
    } else {
      questionText = `Which fighter belongs to the ${correctChar.universe} universe?`;
    }

    return {
      question: questionText,
      options,
      answer: correctChar,
    };
  });
}

export function CharacterTrivia() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<Character | null>(null);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);

  const startQuiz = () => {
    setQuestions(generateQuestions());
    setIsPlaying(true);
  };

  const handleAnswer = (opt: Character) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(opt);
    
    if (opt.id === questions[currentIdx].answer.id) {
      setScore(s => s + 1);
    }
    
    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(i => i + 1);
        setSelectedAnswer(null);
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  const reset = () => {
    setIsPlaying(false);
    setGameOver(false);
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuestions([]);
  };

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/40 rounded-[2rem] p-6 text-center relative overflow-hidden h-full min-h-[300px] flex flex-col items-center justify-center">
      {!isPlaying ? (
        <div className="flex flex-col items-center">
          <Brain className="text-purple-500 mb-4 w-12 h-12 opacity-80" />
          <h3 className="text-2xl font-black uppercase tracking-wider text-white mb-2">Character Trivia</h3>
          <p className="text-zinc-500 text-sm mb-6 max-w-[250px]">Test your knowledge of the multiverse fighters.</p>
          <button 
            onClick={startQuiz}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 rounded-full transition-all uppercase tracking-widest text-sm"
          >
            Start Quiz
          </button>
        </div>
      ) : gameOver ? (
         <div className="flex flex-col items-center z-10">
          <h3 className="text-3xl font-black uppercase tracking-wider text-white mb-2">Quiz Complete</h3>
          <p className="text-purple-400 text-xl font-mono mb-6 pb-6 border-b border-zinc-800 w-full">Score: {score}/{questions.length}</p>
          <button 
            onClick={reset}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-6 py-2 rounded-full transition-all uppercase tracking-widest text-sm"
          >
            <RefreshCw size={16} /> Play Again
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col z-10">
          <div className="flex justify-between text-xs font-mono text-zinc-500 mb-4 uppercase tracking-widest">
            <span>Q: {currentIdx + 1}/{questions.length}</span>
            <span>Score: {score}</span>
          </div>
          
          <h4 className="text-lg font-bold text-white mb-6">
            {questions[currentIdx]?.question}
          </h4>
 
          <div className="grid grid-cols-1 gap-3">
             {questions[currentIdx]?.options.map((opt) => (
               <button
                  key={opt.id}
                  onClick={() => handleAnswer(opt)}
                  disabled={selectedAnswer !== null}
                  className={`p-3 rounded-xl border text-sm font-bold transition-all flex items-center gap-4 text-left
                    ${selectedAnswer === null ? 'border-zinc-800 bg-zinc-800/50 hover:bg-zinc-700 text-zinc-300 hover:text-white' : ''}
                    ${selectedAnswer !== null && opt.id === questions[currentIdx].answer.id ? 'border-green-500 bg-green-500/20 text-green-400' : ''}
                    ${selectedAnswer?.id === opt.id && opt.id !== questions[currentIdx].answer.id ? 'border-red-500 bg-red-500/20 text-red-400' : ''}
                    ${selectedAnswer !== null && opt.id !== questions[currentIdx].answer.id && selectedAnswer?.id !== opt.id ? 'border-zinc-800 bg-zinc-900 text-zinc-600 opacity-50' : ''}
                  `}
               >
                 <div className="relative w-8 h-8 flex-shrink-0">
                   <Image src={getAssetPath(opt.previewUrl)} alt={opt.name} fill className="rounded-full border border-zinc-700 object-cover bg-zinc-800" />
                 </div>
                 {opt.name}
               </button>
             ))}
          </div>
        </div>
      )}
      
      {/* Background decoration */}
      <HelpCircle className="absolute -bottom-10 -right-10 w-48 h-48 text-zinc-800/20 rotate-12 pointer-events-none" />
    </div>
  );
}
