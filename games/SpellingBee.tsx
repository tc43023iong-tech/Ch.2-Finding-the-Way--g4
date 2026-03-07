
import React, { useState, useMemo } from 'react';
import { WORD_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';
import { playSound } from '../utils/sounds';

interface SpellingBeeProps {
  onComplete: () => void;
}

const SpellingBee: React.FC<SpellingBeeProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const currentWord = WORD_LIST[currentIndex].en.toLowerCase();
  
  const letterOptions = useMemo(() => {
    return currentWord.split('')
      .filter(l => l !== ' ')
      .map((char, idx) => ({ char, originalIdx: idx }))
      .sort(() => 0.5 - Math.random());
  }, [currentWord]);

  const handleLetterClick = (char: string, optionIdx: number) => {
    if (usedIndices.includes(optionIdx)) return;

    const targetWithSpaces = currentWord.split('');
    // Calculate current input length including spaces that were auto-filled
    let currentInputText = "";
    let tempUsedCount = 0;
    for (let i = 0; i < targetWithSpaces.length; i++) {
      if (targetWithSpaces[i] === ' ') {
        currentInputText += ' ';
      } else if (tempUsedCount < usedIndices.length) {
        // This is a letter that was already filled
        currentInputText += targetWithSpaces[i];
        tempUsedCount++;
      } else {
        break;
      }
    }

    const nextTargetChar = targetWithSpaces[currentInputText.length];
    
    if (char === nextTargetChar) {
      playSound('correct');
      const nextUsedIndices = [...usedIndices, optionIdx];
      setUsedIndices(nextUsedIndices);

      // Check if complete
      const filledWord = targetWithSpaces.map((c, idx) => {
        if (c === ' ') return ' ';
        // Find if this letter position (nth letter) has been filled
        const letterPos = targetWithSpaces.slice(0, idx + 1).filter(x => x !== ' ').length;
        return nextUsedIndices.length >= letterPos ? c : null;
      });

      if (filledWord.every(c => c !== null)) {
        setTimeout(() => {
          if (currentIndex < WORD_LIST.length - 1) {
            setCurrentIndex(c => c + 1);
            setUsedIndices([]);
          } else {
            onComplete();
          }
        }, 800);
      }
    } else {
      playSound('wrong');
    }
  };

  const handleCancel = (letterIdx: number) => {
    // letterIdx is the index in the full word string
    const targetWithSpaces = currentWord.split('');
    const lettersBefore = targetWithSpaces.slice(0, letterIdx + 1).filter(x => x !== ' ').length;
    setUsedIndices(prev => prev.slice(0, lettersBefore - 1));
  };

  return (
    <div className="text-center p-4">
      <div className="flex justify-between items-center mb-8">
        <img src={POKEMON_SPRITES(POKEMON_IDS.Squirtle)} className="w-20 h-20" alt="Squirtle" />
        <h2 className="text-4xl font-bold text-blue-600">Spelling Bee 🐝</h2>
        <div className="text-2xl font-bold bg-white px-4 py-2 crayon-border">
          {currentIndex + 1} / {WORD_LIST.length}
        </div>
      </div>

      <div className="mb-8">
        <div className="text-4xl font-bold text-gray-700 mb-4">{WORD_LIST[currentIndex].cn}</div>
        <div className="text-6xl mb-4">{WORD_LIST[currentIndex].emoji}</div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12 min-h-[80px]">
        {currentWord.split('').map((char, idx) => {
          const isSpace = char === ' ';
          const lettersBefore = currentWord.slice(0, idx + 1).split('').filter(x => x !== ' ').length;
          const isFilled = !isSpace && usedIndices.length >= lettersBefore;
          
          return (
            <div
              key={idx}
              onClick={() => isFilled && handleCancel(idx)}
              className={`w-12 h-16 flex items-center justify-center text-4xl font-bold crayon-border cursor-pointer transition-all ${
                isSpace ? 'border-none bg-transparent w-6' : 
                isFilled ? 'bg-yellow-200 animate-wiggle' : 'bg-gray-100'
              }`}
            >
              {isFilled ? char : ''}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {letterOptions.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleLetterClick(opt.char, idx)}
            className={`w-16 h-16 bg-white text-3xl font-bold crayon-border transition-all transform active:scale-90 ${
              usedIndices.includes(idx) ? 'opacity-0 pointer-events-none scale-0' : 'hover:bg-blue-100'
            }`}
          >
            {opt.char}
          </button>
        ))}
      </div>
      
      <p className="mt-8 text-gray-500 italic">Click a letter in the word to undo!</p>
    </div>
  );
};

export default SpellingBee;
