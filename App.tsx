
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
import RiddleQuest from './games/RiddleQuest';
import TugOfWar from './games/TugOfWar';
import TreeHouse from './games/TreeHouse';

const FloatingDecor = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-40">
    <div className="absolute top-[5%] left-[5%] text-7xl animate-float-slow">☁️</div>
    <div className="absolute top-[15%] right-[10%] text-8xl animate-float-slow" style={{animationDelay: '1s'}}>☁️</div>
    <div className="absolute bottom-[20%] left-[5%] text-4xl animate-bounce" style={{animationDuration: '4s'}}>🎀</div>
    <div className="absolute top-[40%] right-[5%] text-5xl animate-bounce" style={{animationDuration: '5s'}}>🍭</div>
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
      case GameType.RIDDLE_QUEST:
        return <RiddleQuest onComplete={() => completeGame(GameType.RIDDLE_QUEST)} />;
      case GameType.TUG_OF_WAR:
        return <TugOfWar onComplete={() => completeGame(GameType.TUG_OF_WAR)} />;
      case GameType.TREE_HOUSE:
        return (
          <TreeHouse
            unlockedIds={gameState.unlockedFurnitureIds}
            onNextGame={() => {
              const gameOrder = [
                GameType.EMOJI_DETECTIVE, GameType.MATCHING, GameType.SPELLING_BEE,
                GameType.FILL_BLANKS, GameType.BUBBLE_POP, GameType.WORD_SEARCH,
                GameType.MIND_MEMORY, GameType.RIDDLE_QUEST, GameType.TUG_OF_WAR
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
      
      <header className="mb-8 text-center">
        <h1 className="text-6xl font-black text-pink-400 tracking-wider">
          Pikachu Adventure 🐾
        </h1>
        <p className="text-2xl text-blue-400 font-bold mt-2">Level 4 Vocabulary Quest</p>
      </header>

      <main className="w-full max-w-7xl bg-white p-8 md:p-12 wobbly-border relative mb-12 shadow-2xl h-[800px] overflow-hidden">
        {renderCurrentGame()}
      </main>

      <footer className="mt-auto flex gap-3 overflow-x-auto p-4 w-full max-w-7xl justify-center no-scrollbar">
        {Object.values(GameType).filter(t => t !== GameType.TREE_HOUSE).map((type) => (
          <button
            key={type}
            onClick={() => setGameState(prev => ({ ...prev, currentView: type }))}
            className={`px-5 py-2 text-lg font-bold rounded-full transition-all border-2 ${
              gameState.completedGames.includes(type) 
                ? 'bg-pink-100 text-pink-600 border-pink-300' 
                : 'bg-white text-gray-400 border-gray-200'
            } hover:border-pink-300 hover:text-pink-500`}
          >
            {type.toLowerCase().split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
          </button>
        ))}
      </footer>
    </div>
  );
};

export default App;
