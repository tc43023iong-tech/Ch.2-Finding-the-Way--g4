
import React, { useState, useEffect } from 'react';
import { WORD_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';

const MindMemory: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'memorize' | 'ask'>('memorize');
  const [timeLeft, setTimeLeft] = useState(10);
  const [missingWord, setMissingWord] = useState<any>(null);
  const [currentSet, setCurrentSet] = useState<any[]>([]);

  useEffect(() => {
    const set = [...WORD_LIST].sort(() => 0.5 - Math.random()).slice(0, 8);
    setCurrentSet(set);
    setMissingWord(set[Math.floor(Math.random() * set.length)]);
  }, []);

  useEffect(() => {
    if (phase === 'memorize' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'memorize' && timeLeft === 0) {
      setPhase('ask');
    }
  }, [timeLeft, phase]);

  const handleSelect = (word: any) => {
    if (word.id === missingWord.id) {
      onComplete();
    }
  };

  return (
    <div className="text-center p-4">
      <div className="flex justify-between items-center mb-8">
        <img src={POKEMON_SPRITES(POKEMON_IDS.Mew)} className="w-20 h-20" alt="Mew" />
        <h2 className="text-4xl font-bold text-purple-600">Mind Memory 🧠</h2>
        <div className="text-2xl font-bold bg-white px-4 py-2 crayon-border text-red-500">
          {phase === 'memorize' ? `Time: ${timeLeft}s` : 'Who is missing?'}
        </div>
      </div>

      {phase === 'memorize' ? (
        <div className="grid grid-cols-4 gap-4">
          {currentSet.map(w => (
            <div key={w.id} className="p-4 bg-purple-50 crayon-border flex flex-col items-center">
              <span className="text-4xl">{w.emoji}</span>
              <span className="text-xl font-bold">{w.en}</span>
              <span className="text-sm text-gray-500">({w.cn})</span>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 mb-12 opacity-30 grayscale">
            {currentSet.filter(w => w.id !== missingWord.id).map(w => (
              <div key={w.id} className="p-4 bg-gray-100 crayon-border flex flex-col items-center">
                <span className="text-4xl">{w.emoji}</span>
                <span className="text-xl font-bold">{w.en}</span>
              </div>
            ))}
            <div className="p-4 bg-white crayon-border border-dashed flex flex-col items-center justify-center">
              <span className="text-6xl text-purple-400">?</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {currentSet.map(w => (
              <button
                key={w.id}
                onClick={() => handleSelect(w)}
                className="p-4 bg-white hover:bg-purple-100 crayon-border text-xl font-bold"
              >
                {w.en}
                <div className="text-sm font-normal text-gray-500">({w.cn})</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MindMemory;
