
import React, { useState, useEffect } from 'react';
import { WORD_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';
import { playSound } from '../utils/sounds';

interface MatchingGameProps {
  onComplete: () => void;
}

const MatchingGame: React.FC<MatchingGameProps> = ({ onComplete }) => {
  const [rounds, setRounds] = useState(0);
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [selectedCn, setSelectedCn] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  
  const [currentSet, setCurrentSet] = useState<any[]>([]);
  const [enOptions, setEnOptions] = useState<any[]>([]);
  const [cnOptions, setCnOptions] = useState<any[]>([]);

  useEffect(() => {
    const start = rounds * 5;
    const set = WORD_LIST.slice(start, start + 5);
    if (set.length === 0) {
      onComplete();
      return;
    }
    const enSide = [...set].sort(() => 0.5 - Math.random());
    const cnSide = [...set].sort(() => 0.5 - Math.random());
    setCurrentSet(set);
    setEnOptions(enSide);
    setCnOptions(cnSide);
  }, [rounds]);

  useEffect(() => {
    if (selectedEn && selectedCn) {
      if (selectedEn === selectedCn) {
        playSound('correct');
        setMatchedIds(prev => [...prev, selectedEn!]);
        setSelectedEn(null);
        setSelectedCn(null);
      } else {
        playSound('wrong');
        setTimeout(() => {
          setSelectedEn(null);
          setSelectedCn(null);
        }, 500);
      }
    }
  }, [selectedEn, selectedCn]);

  useEffect(() => {
    if (matchedIds.length > 0 && matchedIds.length === currentSet.length) {
      if ((rounds + 1) * 5 >= WORD_LIST.length) {
        onComplete();
      } else {
        setTimeout(() => {
          setRounds(r => r + 1);
          setMatchedIds([]);
        }, 1000);
      }
    }
  }, [matchedIds, currentSet]);

  return (
    <div className="text-center p-4">
      <div className="flex justify-between items-center mb-8">
        <img src={POKEMON_SPRITES(POKEMON_IDS.Charmander)} className="w-20 h-20" alt="Charmander" />
        <h2 className="text-4xl font-bold text-orange-600">Matching Adventure 🎴</h2>
        <div className="text-2xl font-bold bg-white px-4 py-2 crayon-border">
          Set {rounds + 1} / {Math.ceil(WORD_LIST.length / 5)}
        </div>
      </div>

      <div className="flex gap-12 justify-center">
        <div className="flex flex-col gap-4 w-1/2">
          {enOptions.map(w => (
            <button
              key={w.id}
              disabled={matchedIds.includes(w.id)}
              onClick={() => setSelectedEn(w.id)}
              className={`p-4 text-2xl font-bold crayon-border transition-all ${
                matchedIds.includes(w.id) ? 'bg-green-200 opacity-50' : 
                selectedEn === w.id ? 'bg-blue-300 transform scale-105' : 'bg-white hover:bg-blue-50'
              }`}
            >
              {w.en}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-4 w-1/2">
          {cnOptions.map(w => (
            <button
              key={w.id}
              disabled={matchedIds.includes(w.id)}
              onClick={() => setSelectedCn(w.id)}
              className={`p-4 text-2xl font-bold crayon-border transition-all ${
                matchedIds.includes(w.id) ? 'bg-green-200 opacity-50' : 
                selectedCn === w.id ? 'bg-pink-300 transform scale-105' : 'bg-white hover:bg-pink-50'
              }`}
            >
              {w.cn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchingGame;
