
import React, { useState, useMemo } from 'react';
import { WORD_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';

const BubblePop: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [rewardHistory, setRewardHistory] = useState<number[]>([]);
  
  const currentWord = WORD_LIST[currentIndex];
  
  const options = useMemo(() => {
    const others = WORD_LIST.filter(w => w.id !== currentWord.id).sort(() => 0.5 - Math.random()).slice(0, 5);
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
    <div className="text-center p-6 min-h-[700px] relative overflow-hidden bg-blue-50/40 rounded-[60px] border-4 border-dashed border-blue-200 shadow-inner">
      {/* Cuter Ocean Background */}
      <div className="absolute top-10 left-10 text-6xl animate-float">🧸</div>
      <div className="absolute top-20 right-20 text-7xl animate-float" style={{animationDelay: '2s'}}>🐳</div>
      <div className="absolute bottom-40 left-10 text-6xl animate-bounce">🐙</div>
      <div className="absolute bottom-20 right-20 text-7xl animate-bounce" style={{animationDelay: '1s'}}>🦀</div>
      
      {/* Sparkles */}
      <div className="absolute top-1/4 left-1/3 text-3xl animate-pulse text-white">✨</div>
      <div className="absolute bottom-1/3 right-1/4 text-4xl animate-pulse text-white">✨</div>

      <div className="flex justify-between items-center mb-10 relative z-10 px-8">
        <div className="bg-white/80 p-5 rounded-full wobbly-border shadow-lg">
          <img src={POKEMON_SPRITES(POKEMON_IDS.Squirtle)} className="w-20 h-20 sticker-glow" alt="Squirtle" />
        </div>
        <div className="text-center">
            <h2 className="text-6xl font-bold text-blue-400 drop-shadow-sm">Bubble Pop! 🫧</h2>
            <p className="text-2xl text-blue-300 font-bold">Pop the correct bubble!</p>
        </div>
        <div className="text-4xl font-bold bg-white/90 px-10 py-4 wobbly-border text-pink-400 shadow-sm">
          ⭐ {correctCount}
        </div>
      </div>

      <div className="mb-14 relative z-10">
        <div className="inline-block bg-white/90 px-12 py-4 rounded-full border-4 border-blue-100 shadow-xl">
            <p className="text-5xl font-bold text-blue-500">{currentWord.cn}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-12 mb-12 justify-items-center relative z-10 px-10">
        {options.map((opt, i) => (
          <button
            key={`${currentIndex}-${i}`}
            onClick={() => handlePop(opt)}
            className="bubble w-44 h-44 flex items-center justify-center text-3xl font-bold text-blue-600 hover:scale-110 hover:bg-white/80 transition-all active:scale-95 shadow-2xl p-6 text-center leading-tight relative overflow-hidden group"
            style={{ animation: `float ${4 + i * 0.5}s ease-in-out infinite` }}
          >
            <div className="absolute top-2 left-4 text-2xl opacity-20 group-hover:opacity-40">✨</div>
            {opt.en}
          </button>
        ))}
      </div>

      {/* Cuter Shell Rewards Section */}
      <div className="relative z-10 flex flex-col items-center mt-6">
        <div className="relative p-10 bg-white/60 rounded-[100px] border-2 border-dashed border-blue-200">
          <div className="text-[110px] drop-shadow-2xl animate-bounce">🐚</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-wrap gap-2 justify-center max-w-[280px]">
             {rewardHistory.map((pId, idx) => (
               <img 
                 key={idx} 
                 src={POKEMON_SPRITES(pId)} 
                 className="w-14 h-14 animate-float hover:scale-150 transition-transform"
                 style={{ animationDelay: `${idx * 0.2}s` }}
                 alt="reward" 
               />
             ))}
          </div>
        </div>
        <p className="text-3xl font-bold text-blue-400 mt-4 tracking-widest">My Sea Friends Collection 🎀</p>
      </div>
    </div>
  );
};

export default BubblePop;
