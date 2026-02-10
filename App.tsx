
import React, { useState } from 'react';
import { GameType, GameState } from './types';
import { WORD_LIST, FURNITURE_LIST } from './constants';
import WordListView from './games/WordListView';
import EmojiDetective from './games/EmojiDetective';
import MatchingGame from './games/MatchingGame';
import SpellingBee from './games/SpellingBee';
import FillBlanks from './games/FillBlanks';
import BubblePop from './games/BubblePop';
import WordSearch from './games/WordSearch';
import MindMemory from './games/MindMemory';
import TreeHouse from './games/TreeHouse';

const FloatingDecor = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
    {/* Animated Clouds */}
    <div className="absolute top-[5%] left-[5%] text-8xl opacity-30 animate-float" style={{animationDuration: '8s'}}>☁️</div>
    <div className="absolute top-[15%] right-[10%] text-9xl opacity-20 animate-float" style={{animationDuration: '10s', animationDelay: '1s'}}>☁️</div>
    <div className="absolute top-[40%] left-[-5%] text-7xl opacity-25 animate-float" style={{animationDuration: '7s'}}>☁️</div>

    {/* Whimsical Stickers */}
    <div className="absolute top-[10%] left-[20%] text-4xl animate-bounce" style={{animationDuration: '3s'}}>🎀</div>
    <div className="absolute bottom-[10%] right-[15%] text-5xl animate-bounce" style={{animationDuration: '4s', animationDelay: '0.5s'}}>🍭</div>
    <div className="absolute top-[50%] right-[5%] text-4xl animate-pulse">✨</div>
    <div className="absolute bottom-[20%] left-[10%] text-6xl animate-float">🦋</div>
    <div className="absolute top-[30%] right-[25%] text-3xl animate-float" style={{animationDelay: '2s'}}>🦋</div>
    
    {/* Flowers at bottom */}
    <div className="absolute bottom-0 left-0 w-full flex justify-around opacity-40">
      <div className="text-6xl translate-y-4">🌷</div>
      <div className="text-5xl translate-y-6">🌸</div>
      <div className="text-7xl translate-y-2">🌼</div>
      <div className="text-5xl translate-y-8">🌸</div>
      <div className="text-6xl translate-y-4">🌷</div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentView: GameType.WORD_LIST,
    completedGames: [],
    unlockedFurnitureIds: [],
  });

  const completeGame = (type: GameType) => {
    if (!gameState.completedGames.includes(type)) {
      setGameState(prev => ({
        ...prev,
        completedGames: [...prev.completedGames, type],
        unlockedFurnitureIds: [
          ...prev.unlockedFurnitureIds,
          FURNITURE_LIST[prev.unlockedFurnitureIds.length]?.id || 'f_extra',
          FURNITURE_LIST[prev.unlockedFurnitureIds.length + 1]?.id || 'f_extra2',
        ].filter(Boolean)
      }));
    }
    setGameState(prev => ({ ...prev, currentView: GameType.TREE_HOUSE }));
  };

  const renderCurrentGame = () => {
    switch (gameState.currentView) {
      case GameType.WORD_LIST:
        return <WordListView onStart={() => setGameState(prev => ({ ...prev, currentView: GameType.EMOJI_DETECTIVE }))} />;
      case GameType.EMOJI_DETECTIVE:
        return <EmojiDetective onComplete={() => completeGame(GameType.EMOJI_DETECTIVE)} />;
      case GameType.MATCHING:
        return <MatchingGame onComplete={() => completeGame(GameType.MATCHING)} />;
      case GameType.SPELLING_BEE:
        return <SpellingBee onComplete={() => completeGame(GameType.SPELLING_BEE)} />;
      case GameType.FILL_BLANKS:
        return <FillBlanks onComplete={() => completeGame(GameType.FILL_BLANKS)} />;
      case GameType.BUBBLE_POP:
        return <BubblePop onComplete={() => completeGame(GameType.BUBBLE_POP)} />;
      case GameType.WORD_SEARCH:
        return <WordSearch onComplete={() => completeGame(GameType.WORD_SEARCH)} />;
      case GameType.MIND_MEMORY:
        return <MindMemory onComplete={() => completeGame(GameType.MIND_MEMORY)} />;
      case GameType.TREE_HOUSE:
        return (
          <TreeHouse
            unlockedIds={gameState.unlockedFurnitureIds}
            onNextGame={() => {
              const gameOrder = [
                GameType.EMOJI_DETECTIVE, GameType.MATCHING, GameType.SPELLING_BEE,
                GameType.FILL_BLANKS, GameType.BUBBLE_POP, GameType.WORD_SEARCH,
                GameType.MIND_MEMORY
              ];
              const currentIndex = gameOrder.indexOf(gameState.completedGames[gameState.completedGames.length - 1]);
              const nextGame = gameOrder[currentIndex + 1] || GameType.WORD_LIST;
              setGameState(prev => ({ ...prev, currentView: nextGame }));
            }}
          />
        );
      default:
        return <WordListView onStart={() => setGameState(prev => ({ ...prev, currentView: GameType.EMOJI_DETECTIVE }))} />;
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center relative">
      <FloatingDecor />
      
      <header className="mb-6 text-center animate-float">
        <h1 className="text-7xl font-bold text-pink-400 drop-shadow-[0_2px_2px_rgba(255,255,255,1)] tracking-widest relative">
          Pikachu Adventure 🐾
          <span className="absolute -top-4 -right-8 text-4xl">✨</span>
        </h1>
        <div className="flex items-center justify-center gap-4 mt-2">
           <span className="text-3xl text-yellow-400">🧸</span>
           <p className="text-3xl text-blue-400 font-bold underline decoration-wavy decoration-pink-300">Finding the Way</p>
           <span className="text-3xl text-pink-400">🎀</span>
        </div>
      </header>

      <main className="w-full max-w-6xl bg-white/70 p-10 wobbly-border relative mb-12 backdrop-blur-md">
        <div className="absolute -top-10 -left-10 text-6xl animate-bounce">🎈</div>
        <div className="absolute -bottom-10 -right-10 text-6xl animate-bounce" style={{animationDelay: '1s'}}>🧁</div>
        {renderCurrentGame()}
      </main>

      <footer className="mt-auto flex gap-4 overflow-x-auto p-6 w-full max-w-7xl justify-center no-scrollbar">
        {Object.values(GameType).filter(t => t !== GameType.TREE_HOUSE).map((type) => (
          <button
            key={type}
            onClick={() => setGameState(prev => ({ ...prev, currentView: type }))}
            className={`px-6 py-3 text-xl font-bold crayon-card whitespace-nowrap transition-all ${
              gameState.completedGames.includes(type) ? 'bg-pink-100 text-pink-600 border-pink-300' : 'bg-white text-blue-300'
            } hover:scale-110 active:scale-95`}
          >
            {type.toLowerCase().split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
          </button>
        ))}
      </footer>
    </div>
  );
};

export default App;
