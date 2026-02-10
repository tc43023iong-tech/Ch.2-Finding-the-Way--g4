
import React, { useState, useMemo } from 'react';
import { WORD_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';

interface SpellingBeeProps {
  onComplete: () => void;
}

const SpellingBee: React.FC<SpellingBeeProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState<string[]>([]);
  const currentWord = WORD_LIST[currentIndex].en.toLowerCase();
  
  const letterOptions = useMemo(() => {
    // Collect letters, include spaces but treat spaces specially
    const letters = currentWord.split('').filter(l => l !== ' ');
    // Add some random letters
    const extras = 'abcdefghijklmnopqrstuvwxyz'.split('').sort(() => 0.5 - Math.random()).slice(0, 4);
    return [...letters, ...extras].sort(() => 0.5 - Math.random());
  }, [currentWord]);

  const handleLetterClick = (char: string) => {
    // If the next expected character in currentWord is a space, add it automatically
    let nextInput = [...input];
    const targetWithSpaces = currentWord.split('');
    
    // Check if we need to auto-insert space
    if (targetWithSpaces[nextInput.length] === ' ') {
      nextInput.push(' ');
    }
    
    nextInput.push(char);
    setInput(nextInput);

    // Check if correct so far
    const currentAttempt = nextInput.join('');
    if (currentAttempt === currentWord) {
      setTimeout(() => {
        if (currentIndex < WORD_LIST.length - 1) {
          setCurrentIndex(c => c + 1);
          setInput([]);
        } else {
          onComplete();
        }
      }, 800);
    }
  };

  const handleCancel = (index: number) => {
    // If we cancel, just remove from that index onwards
    setInput(prev => prev.slice(0, index));
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
          const filled = input[idx];
          return (
            <div
              key={idx}
              onClick={() => filled && handleCancel(idx)}
              className={`w-12 h-16 flex items-center justify-center text-4xl font-bold crayon-border cursor-pointer transition-all ${
                isSpace ? 'border-none bg-transparent w-6' : 
                filled ? 'bg-yellow-200 animate-wiggle' : 'bg-gray-100'
              }`}
            >
              {filled !== ' ' ? filled : ''}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {letterOptions.map((l, idx) => (
          <button
            key={idx}
            onClick={() => handleLetterClick(l)}
            className="w-16 h-16 bg-white text-3xl font-bold crayon-border hover:bg-blue-100 transform active:scale-90"
          >
            {l}
          </button>
        ))}
      </div>
      
      <p className="mt-8 text-gray-500 italic">Click a letter in the word to undo!</p>
    </div>
  );
};

export default SpellingBee;
