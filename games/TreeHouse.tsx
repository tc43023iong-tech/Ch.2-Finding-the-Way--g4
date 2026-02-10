
import React from 'react';
import { FURNITURE_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';

interface TreeHouseProps {
  unlockedIds: string[];
  onNextGame: () => void;
}

const TreeHouse: React.FC<TreeHouseProps> = ({ unlockedIds, onNextGame }) => {
  const furniture = FURNITURE_LIST.filter(f => unlockedIds.includes(f.id));

  return (
    <div className="text-center p-4">
      <h2 className="text-5xl font-bold text-green-700 mb-8 animate-bounce">Your Tree House 🏠✨</h2>
      
      <div className="relative w-full h-[400px] bg-sky-50 crayon-border overflow-hidden mb-8">
        {/* Simple Treehouse Visual */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-96 h-96 bg-amber-900 rounded-lg"></div>
        </div>
        
        <div className="relative z-10 flex flex-wrap gap-8 p-12 justify-center">
          {furniture.map((f, i) => (
            <div key={f.id} className="flex flex-col items-center animate-wiggle" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="text-7xl mb-2">{f.emoji}</span>
              <span className="font-bold text-green-800">{f.name}</span>
            </div>
          ))}
          {furniture.length === 0 && (
            <p className="text-2xl text-gray-400 mt-20">Win games to unlock furniture!</p>
          )}
        </div>

        {/* Mascot */}
        <img 
          src={POKEMON_SPRITES(POKEMON_IDS.Pikachu)} 
          className="absolute bottom-4 right-4 w-24 h-24" 
          alt="Pikachu" 
        />
      </div>

      <div className="mb-8 p-4 bg-yellow-100 crayon-border">
        <p className="text-2xl font-bold">You've unlocked {furniture.length} items!</p>
        <p className="text-gray-600">Great job! Keep going to fill your house.</p>
      </div>

      <button
        onClick={onNextGame}
        className="px-12 py-4 bg-green-500 text-white text-3xl font-bold crayon-border hover:bg-green-600 transition-all shadow-lg"
      >
        NEXT CHALLENGE! 🚀
      </button>
    </div>
  );
};

export default TreeHouse;
