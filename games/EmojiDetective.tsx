
import React, { useState } from 'react';
import { WORD_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';

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
    <div className="text-center p-4">
      <div className="flex justify-between items-center mb-12 px-6">
        <div className="bg-pink-100 p-4 rounded-full animate-float wobbly-border shadow-lg">
           <img src={POKEMON_SPRITES(POKEMON_IDS.Bulbasaur)} className="w-20 h-20" alt="Bulbasaur" />
        </div>
        <div className="text-center">
            <h2 className="text-6xl font-bold text-pink-400 mb-2 drop-shadow-sm">Emoji Detective 🔍</h2>
            <div className="flex justify-center gap-1">
                {Array.from({length: 5}).map((_, i) => <span key={i} className="text-xl animate-pulse">✨</span>)}
            </div>
        </div>
        <div className="text-4xl font-bold bg-white px-8 py-3 wobbly-border text-blue-400">
          {currentIndex + 1} <span className="text-pink-200">/</span> {WORD_LIST.length}
        </div>
      </div>

      <div className="mb-14 relative inline-block">
        <div className="bg-white p-12 rounded-full wobbly-border shadow-xl animate-float relative z-10">
            <div className="text-[140px] leading-none mb-4 filter drop-shadow-xl">{currentWord.emoji}</div>
            <div className="text-5xl font-bold text-purple-400 bg-pink-50/50 px-10 py-3 rounded-full border-2 border-dashed border-pink-200">
                {currentWord.cn}
            </div>
        </div>
        {/* Decorative Blobs */}
        <div className="absolute top-[-20px] left-[-20px] w-12 h-12 bg-pink-200 rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-[-10px] right-[-10px] w-8 h-8 bg-blue-200 rounded-full animate-pulse"></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {options.map((opt, i) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt)}
            className={`p-10 text-3xl font-bold text-pink-600 transition-all crayon-card shadow-xl transform hover:-translate-y-3 active:scale-90 flex items-center justify-center text-center ${
                i % 2 === 0 ? 'bg-pink-50 hover:bg-pink-100' : 'bg-blue-50 hover:bg-blue-100'
            }`}
          >
            {opt.en}
          </button>
        ))}
      </div>

      {showFeedback !== 'none' && (
        <div className={`fixed inset-0 flex items-center justify-center pointer-events-none z-50 bg-white/60 backdrop-blur-md`}>
          <div className={`text-[120px] font-bold ${showFeedback === 'correct' ? 'text-pink-400' : 'text-blue-400'} animate-bounce`}>
            {showFeedback === 'correct' ? '🎀 YAY! 🎀' : '🧸 OOPS 🧸'}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiDetective;
