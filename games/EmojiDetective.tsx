
import React, { useState } from 'react';
import { WORD_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';
import { playSound } from '../utils/sounds';

interface EmojiDetectiveProps {
  onComplete: () => void;
}

const EmojiDetective: React.FC<EmojiDetectiveProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'none' | 'correct' | 'wrong'>('none');

  const currentWord = WORD_LIST[currentIndex];
  const options = React.useMemo(() => {
    const others = WORD_LIST.filter(w => w.id !== currentWord.id);
    const shuffled = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    return [...shuffled, currentWord].sort(() => 0.5 - Math.random());
  }, [currentWord, currentIndex]);

  const handleSelect = (word: typeof currentWord) => {
    if (word.id === currentWord.id) {
      playSound('correct');
      setShowFeedback('correct');
      setTimeout(() => {
        if (currentIndex < WORD_LIST.length - 1) {
          setCurrentIndex(c => c + 1);
          setShowFeedback('none');
        } else {
          onComplete();
        }
      }, 800);
    } else {
      playSound('wrong');
      setShowFeedback('wrong');
      setTimeout(() => setShowFeedback('none'), 800);
    }
  };

  return (
    <div className="text-center">
      <div className="flex justify-between items-center mb-10 px-4">
        <h2 className="text-4xl font-black text-pink-400">Emoji Detective 🔍</h2>
        <div className="text-2xl font-bold bg-pink-50 text-pink-500 px-6 py-2 rounded-full border-2 border-pink-100">
          {currentIndex + 1} / {WORD_LIST.length}
        </div>
      </div>

      <div className="bg-gray-50 rounded-3xl p-12 mb-10 border-4 border-dashed border-gray-100 inline-block w-full max-w-lg">
          <div className="text-[140px] leading-none mb-6">{currentWord.emoji}</div>
          <div className="text-4xl font-bold text-gray-400 bg-white px-8 py-3 rounded-2xl shadow-sm inline-block">
              {currentWord.cn}
          </div>
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt)}
            className="p-8 text-3xl font-bold text-gray-700 bg-white border-2 border-gray-100 rounded-2xl hover:border-pink-300 hover:text-pink-500 transition-all shadow-sm flex items-center justify-center h-32"
          >
            {opt.en}
          </button>
        ))}
      </div>

      {showFeedback !== 'none' && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className={`text-8xl font-black px-12 py-6 rounded-full shadow-2xl animate-bounce ${showFeedback === 'correct' ? 'bg-green-400 text-white' : 'bg-red-400 text-white'}`}>
            {showFeedback === 'correct' ? 'GREAT!' : 'OOPS!'}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiDetective;
