
import React, { useState, useMemo } from 'react';
import { WORD_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';
import { WordItem } from '../types';

interface RiddleQuestProps {
  onComplete: () => void;
}

const RiddleQuest: React.FC<RiddleQuestProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'none' | 'correct' | 'wrong'>('none');

  const currentWord = WORD_LIST[currentIndex];
  
  const options = useMemo(() => {
    const others = WORD_LIST.filter(w => w.id !== currentWord.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    return [...others, currentWord].sort(() => 0.5 - Math.random());
  }, [currentWord, currentIndex]);

  const handleSelect = (word: WordItem) => {
    if (word.id === currentWord.id) {
      setShowFeedback('correct');
      setTimeout(() => {
        if (currentIndex < WORD_LIST.length - 1) {
          setCurrentIndex(c => c + 1);
          setShowFeedback('none');
        } else {
          onComplete();
        }
      }, 1000);
    } else {
      setShowFeedback('wrong');
      setTimeout(() => setShowFeedback('none'), 1000);
    }
  };

  return (
    <div className="text-center max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8 px-4">
        <h2 className="text-4xl font-black text-pink-500">Riddle Quest 🧠</h2>
        <div className="text-2xl font-bold bg-pink-50 text-pink-600 px-6 py-2 rounded-full border-2 border-pink-200 shadow-sm">
          Challenge {currentIndex + 1} / {WORD_LIST.length}
        </div>
      </div>

      <div className="flex flex-col items-center mb-10">
        <div className="bg-white rounded-3xl p-10 border-4 border-pink-100 shadow-xl w-full relative mb-6">
          <div className="absolute -top-6 left-10 bg-pink-400 text-white px-4 py-1 rounded-full text-xl font-bold">RIDDLE:</div>
          <p className="text-4xl font-black text-gray-800 leading-snug">
            "{currentWord.riddle || 'Can you guess this word?'}"
          </p>
        </div>
        <img src={POKEMON_SPRITES(POKEMON_IDS.Mew)} className="w-28 h-28 animate-float-slow opacity-80" alt="Mew" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt)}
            className="group p-6 text-3xl font-black text-gray-700 bg-white border-4 border-gray-100 rounded-3xl hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50 transition-all shadow-md flex items-center justify-center gap-6 active:scale-95"
          >
            <span className="text-5xl group-hover:scale-110 transition-transform">{opt.emoji}</span>
            <span className="flex-1 text-left">{opt.en}</span>
          </button>
        ))}
      </div>

      {showFeedback !== 'none' && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[110] bg-white/20 backdrop-blur-[2px]">
          <div className={`text-7xl font-black px-12 py-8 rounded-full shadow-2xl animate-bounce border-8 ${
            showFeedback === 'correct' ? 'bg-green-500 text-white border-green-200' : 'bg-red-500 text-white border-red-200'
          }`}>
            {showFeedback === 'correct' ? 'EXCELLENT! 🌟' : 'TRY AGAIN! 🧩'}
          </div>
        </div>
      )}
    </div>
  );
};

export default RiddleQuest;
