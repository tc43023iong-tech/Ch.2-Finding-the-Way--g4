
import React, { useState, useMemo } from 'react';
import { WORD_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';

const BubblePop: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [rewardHistory, setRewardHistory] = useState<number[]>([]);
  
  const currentWord = WORD_LIST[currentIndex];
  
  const options = useMemo(() => {
    // Exactly 10 options as requested: 1 correct + 9 others
    const others = WORD_LIST.filter(w => w.id !== currentWord.id).sort(() => 0.5 - Math.random()).slice(0, 9);
    return [...others, currentWord].sort(() => 0.5 - Math.random());
  }, [currentWord, currentIndex]);

  const pokemonPool = useMemo(() => Object.values(POKEMON_IDS).sort(() => 0.5 - Math.random()), []);

  const handlePop = (word: typeof currentWord) => {
    if (word.id === currentWord.id) {
      setCorrectCount(c => c + 1);
      setRewardHistory(prev => [...prev, pokemonPool[prev.length % pokemonPool.length]]);
      if (currentIndex < WORD_LIST.length - 1) {
        setCurrentIndex(c => c + 1);
      } else {
        onComplete();
      }
    }
  };

  return (
    <div className="text-center p-8 bg-blue-50/30 rounded-[40px] border-4 border-blue-100 shadow-inner">
      <div className="flex justify-between items-center mb-8 px-4">
        <div className="text-left">
            <h2 className="text-4xl font-black text-blue-500">Bubble Pop! 🫧</h2>
            <div className="text-2xl font-bold text-gray-500 mt-1">Find the bubble for: <span className="text-blue-600 text-3xl font-black">{currentWord.cn}</span></div>
        </div>
        <div className="text-3xl font-black bg-white px-8 py-3 rounded-2xl border-2 border-blue-200 text-blue-500 shadow-sm">
          Pop {currentIndex + 1} / {WORD_LIST.length}
        </div>
      </div>

      {/* 10 Bubbles in a clean 2x5 or responsive grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {options.map((opt, i) => (
          <button
            key={`${currentIndex}-${i}`}
            onClick={() => handlePop(opt)}
            className="group relative aspect-square flex items-center justify-center bg-white rounded-full border-4 border-blue-200 shadow-md hover:border-blue-400 hover:scale-105 active:scale-90 transition-all p-4 overflow-hidden"
          >
            {/* Glossy Bubble Effect */}
            <div className="absolute top-2 left-4 w-4 h-2 bg-white/60 rounded-full rotate-[-45deg]"></div>
            <span className="text-xl font-black text-blue-800 leading-tight z-10 break-words drop-shadow-sm">
              {opt.en}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white/60 p-6 rounded-3xl border-2 border-dashed border-blue-200 flex flex-col items-center">
        <p className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
          Your Collection: {rewardHistory.length} Friends Found! <img src={POKEMON_SPRITES(POKEMON_IDS.Squirtle)} className="w-8 h-8" alt="squirtle" />
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
           {rewardHistory.map((pId, idx) => (
             <img 
               key={idx} 
               src={POKEMON_SPRITES(pId)} 
               className="w-14 h-14 animate-float-slow drop-shadow-sm"
               alt="reward" 
             />
           ))}
           {rewardHistory.length === 0 && <p className="text-gray-400 italic">Pop correct bubbles to win Pokemon stickers!</p>}
        </div>
      </div>
    </div>
  );
};

export default BubblePop;
