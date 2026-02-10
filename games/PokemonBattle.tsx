
import React, { useState, useMemo } from 'react';
import { WORD_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';

const PokemonBattle: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [isAttacking, setIsAttacking] = useState(false);

  const currentWord = WORD_LIST[currentIndex];
  
  const options = useMemo(() => {
    const others = WORD_LIST.filter(w => w.id !== currentWord.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    return [...others, currentWord].sort(() => 0.5 - Math.random());
  }, [currentWord]);

  const handleAttack = (word: typeof currentWord) => {
    if (word.id === currentWord.id) {
      setIsAttacking(true);
      setEnemyHP(prev => Math.max(0, prev - 20));
      setTimeout(() => {
        setIsAttacking(false);
        if (enemyHP <= 20) {
          onComplete();
        } else if (currentIndex < WORD_LIST.length - 1) {
          setCurrentIndex(c => c + 1);
        } else {
          onComplete();
        }
      }, 1000);
    } else {
      setPlayerHP(prev => Math.max(0, prev - 10));
    }
  };

  return (
    <div className="text-center p-4 min-h-[500px] flex flex-col justify-between">
      <h2 className="text-4xl font-bold text-red-600 mb-4">Pokemon Battle! ⚔️</h2>

      <div className="flex justify-between items-center mb-12">
        {/* Player Side */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-4 bg-gray-200 crayon-border mb-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${playerHP > 50 ? 'bg-green-500' : playerHP > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${playerHP}%` }}
            ></div>
          </div>
          <img 
            src={POKEMON_SPRITES(POKEMON_IDS.Pikachu)} 
            className={`w-32 h-32 ${isAttacking ? 'animate-bounce' : ''}`} 
            alt="Pikachu" 
          />
          <p className="font-bold text-xl">Pikachu (You)</p>
        </div>

        <div className="text-4xl font-bold text-gray-400">VS</div>

        {/* Enemy Side */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-4 bg-gray-200 crayon-border mb-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${enemyHP > 50 ? 'bg-green-500' : enemyHP > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${enemyHP}%` }}
            ></div>
          </div>
          <img 
            src={POKEMON_SPRITES(POKEMON_IDS.Gengar)} 
            className="w-32 h-32 transform scale-x-[-1]" 
            alt="Enemy" 
          />
          <p className="font-bold text-xl">Gengar (Enemy)</p>
        </div>
      </div>

      <div className="bg-white p-6 crayon-border mb-8 shadow-inner">
        <p className="text-3xl font-bold mb-4">Select the correct word for:</p>
        <p className="text-4xl text-blue-600 font-bold mb-6">{currentWord.cn}</p>
        
        <div className="grid grid-cols-2 gap-4">
          {options.map(opt => (
            <button
              key={opt.id}
              onClick={() => handleAttack(opt)}
              className="p-4 text-2xl font-bold bg-gray-50 hover:bg-red-100 crayon-border transition-all"
            >
              {opt.en}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonBattle;
