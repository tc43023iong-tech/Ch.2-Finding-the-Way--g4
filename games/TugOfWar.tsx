
import React, { useState, useMemo, useEffect } from 'react';
import { WORD_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';
import { playSound } from '../utils/sounds';

interface TugOfWarProps {
  onComplete: () => void;
}

const TugOfWar: React.FC<TugOfWarProps> = ({ onComplete }) => {
  const [round, setRound] = useState(0);
  const [team1Score, setTeam1Score] = useState(0); 
  const [team2Score, setTeam2Score] = useState(0);
  const [sharedIndex, setSharedIndex] = useState(0); // Both players solve the same index
  const [gameEnded, setGameEnded] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{team: 1 | 2 | 'both', type: 'claimed' | 'too-slow' | 'wrong' | 'none'}>({team: 'both', type: 'none'});

  // Groups of 5 words
  const roundWords = useMemo(() => {
    const start = round * 5;
    return WORD_LIST.slice(start, start + 5);
  }, [round]);

  const currentWord = roundWords[sharedIndex];

  // Options are shared for fairness
  const options = useMemo(() => {
    if (!currentWord) return [];
    const others = WORD_LIST.filter(w => w.id !== currentWord.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    return [...others, currentWord].sort(() => 0.5 - Math.random());
  }, [currentWord, sharedIndex]);

  const checkRoundEnd = (s1: number, s2: number, nextIdx: number) => {
    if (nextIdx >= 5) {
      setGameEnded(true);
      setWinner(s1 > s2 ? 1 : 2);
      setTimeout(() => {
        if ((round + 1) * 5 >= WORD_LIST.length) {
          onComplete();
        } else {
          setRound(r => r + 1);
          setTeam1Score(0);
          setTeam2Score(0);
          setSharedIndex(0);
          setGameEnded(false);
          setWinner(null);
          setFeedback({team: 'both', type: 'none'});
        }
      }, 3000);
    }
  };

  const handleSelect = (wordId: string, team: 1 | 2) => {
    if (gameEnded || feedback.type !== 'none') return;

    if (wordId === currentWord.id) {
      playSound('correct');
      const otherTeam = team === 1 ? 2 : 1;
      
      // Winner of this specific word gets the point
      if (team === 1) setTeam1Score(s => s + 1);
      else setTeam2Score(s => s + 1);

      // Show visual feedback: one claimed, one too slow
      setFeedback({ team, type: 'claimed' });
      
      setTimeout(() => {
        const nextIdx = sharedIndex + 1;
        setSharedIndex(nextIdx);
        setFeedback({team: 'both', type: 'none'});
        checkRoundEnd(team === 1 ? team1Score + 1 : team1Score, team === 2 ? team2Score + 1 : team2Score, nextIdx);
      }, 1200);

    } else {
      playSound('wrong');
      // Visual shake or "Wrong" for the person who clicked
      const prevFeedback = feedback;
      setFeedback({ team, type: 'wrong' });
      setTimeout(() => setFeedback(prevFeedback.type === 'none' ? {team: 'both', type: 'none'} : prevFeedback), 600);
    }
  };

  // Rope position offset (Score difference based)
  const ropeOffset = (team1Score - team2Score) * 50;

  return (
    <div className="flex flex-col h-full select-none relative">
      <div className="text-center mb-4">
        <h2 className="text-5xl font-black text-blue-600 tracking-tight">TUG OF WAR: SYNCHRONIZED RACE! ⚔️</h2>
        <p className="text-2xl text-gray-400 font-bold mt-1">Be the first to click the correct answer to claim the point!</p>
      </div>

      <div className="flex flex-1 gap-6 items-stretch h-[580px]">
        {/* Team 1 Panel (Left) */}
        <div className={`flex-1 rounded-[40px] border-8 flex flex-col items-center p-8 transition-all duration-300 relative shadow-2xl ${
          feedback.team === 1 && feedback.type === 'claimed' ? 'bg-green-100 border-green-500 scale-105' : 
          feedback.team === 2 && feedback.type === 'claimed' ? 'bg-gray-100 border-gray-300 opacity-50' : 
          'bg-blue-50 border-blue-400'
        }`}>
          <div className="bg-blue-600 text-white px-12 py-3 rounded-full font-black text-3xl mb-8 shadow-lg">TEAM 1</div>
          
          <div className="mb-8 text-center w-full">
            <div className="text-7xl font-black text-blue-800 bg-white px-8 py-12 rounded-3xl shadow-xl border-4 border-blue-100 min-h-[180px] flex items-center justify-center mb-4">
              {currentWord?.cn}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full flex-1">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id, 1)}
                className={`p-5 text-3xl font-black rounded-3xl transition-all shadow-md active:scale-90 border-4 ${
                  feedback.team === 1 && feedback.type === 'wrong' ? 'bg-red-200 border-red-500 animate-shake' : 'bg-white border-blue-200 hover:border-blue-500 hover:bg-blue-100'
                }`}
              >
                {opt.en}
              </button>
            ))}
          </div>

          {feedback.team === 2 && feedback.type === 'claimed' && (
            <div className="absolute inset-0 z-10 bg-red-500/20 flex items-center justify-center rounded-[32px] backdrop-blur-[2px]">
              <span className="text-6xl font-black text-red-600 drop-shadow-lg animate-pulse">TOO SLOW! 🐢</span>
            </div>
          )}
          {feedback.team === 1 && feedback.type === 'claimed' && (
            <div className="absolute inset-0 z-10 bg-green-500/20 flex items-center justify-center rounded-[32px]">
              <span className="text-7xl font-black text-green-600 drop-shadow-lg animate-bounce">POINT! ⭐</span>
            </div>
          )}
        </div>

        {/* The Arena (Center) */}
        <div className="w-96 bg-gray-100 rounded-[40px] border-4 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 relative overflow-hidden shadow-inner">
           <div className="absolute top-8 flex justify-between w-full px-10">
              <div className="flex flex-col items-center">
                <span className="text-blue-600 font-black text-5xl">{team1Score}</span>
                <span className="text-blue-400 font-bold">P1</span>
              </div>
              <div className="text-gray-300 font-black text-3xl mt-2 italic">VS</div>
              <div className="flex flex-col items-center">
                <span className="text-red-600 font-black text-5xl">{team2Score}</span>
                <span className="text-red-400 font-bold">P2</span>
              </div>
           </div>

           <div className="absolute top-0 bottom-0 left-1/2 w-2 border-l-4 border-dashed border-gray-300 -translate-x-1/2"></div>

           <div className="relative w-full h-full flex items-center justify-center">
              <div 
                className="absolute w-[250%] h-5 bg-amber-900 rounded-full shadow-2xl z-10 transition-transform duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)" 
                style={{ transform: `translateX(${ropeOffset}px)` }}
              >
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-16 bg-red-600 rounded-md border-4 border-white shadow-md"></div>
              </div>

              <div 
                className="absolute left-[-20px] z-20 transition-transform duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)" 
                style={{ transform: `translateX(${ropeOffset}px)` }}
              >
                <img src={POKEMON_SPRITES(POKEMON_IDS.Squirtle)} className="w-32 h-32 drop-shadow-2xl" alt="t1" />
              </div>

              <div 
                className="absolute right-[-20px] z-20 transition-transform duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)" 
                style={{ transform: `translateX(${ropeOffset}px)` }}
              >
                <img src={POKEMON_SPRITES(POKEMON_IDS.Charmander)} className="w-32 h-32 drop-shadow-2xl scale-x-[-1]" alt="t2" />
              </div>
           </div>
           
           <div className="absolute bottom-6 bg-white px-6 py-2 rounded-full border-2 border-gray-200 text-gray-400 font-bold uppercase tracking-widest text-sm">
             Word {sharedIndex + 1} of 5
           </div>
        </div>

        {/* Team 2 Panel (Right) */}
        <div className={`flex-1 rounded-[40px] border-8 flex flex-col items-center p-8 transition-all duration-300 relative shadow-2xl ${
          feedback.team === 2 && feedback.type === 'claimed' ? 'bg-green-100 border-green-500 scale-105' : 
          feedback.team === 1 && feedback.type === 'claimed' ? 'bg-gray-100 border-gray-300 opacity-50' : 
          'bg-red-50 border-red-400'
        }`}>
          <div className="bg-red-600 text-white px-12 py-3 rounded-full font-black text-3xl mb-8 shadow-lg">TEAM 2</div>
          
          <div className="mb-8 text-center w-full">
            <div className="text-7xl font-black text-red-800 bg-white px-8 py-12 rounded-3xl shadow-xl border-4 border-red-100 min-h-[180px] flex items-center justify-center mb-4">
              {currentWord?.cn}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full flex-1">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id, 2)}
                className={`p-5 text-3xl font-black rounded-3xl transition-all shadow-md active:scale-90 border-4 ${
                  feedback.team === 2 && feedback.type === 'wrong' ? 'bg-red-200 border-red-500 animate-shake' : 'bg-white border-red-200 hover:border-red-500 hover:bg-red-100'
                }`}
              >
                {opt.en}
              </button>
            ))}
          </div>

          {feedback.team === 1 && feedback.type === 'claimed' && (
            <div className="absolute inset-0 z-10 bg-red-500/20 flex items-center justify-center rounded-[32px] backdrop-blur-[2px]">
              <span className="text-6xl font-black text-red-600 drop-shadow-lg animate-pulse">TOO SLOW! 🐢</span>
            </div>
          )}
          {feedback.team === 2 && feedback.type === 'claimed' && (
            <div className="absolute inset-0 z-10 bg-green-500/20 flex items-center justify-center rounded-[32px]">
              <span className="text-7xl font-black text-green-600 drop-shadow-lg animate-bounce">POINT! ⭐</span>
            </div>
          )}
        </div>
      </div>

      {gameEnded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-lg rounded-[40px] animate-in fade-in duration-500">
          <div className="text-center">
            <div className={`text-[120px] font-black leading-none drop-shadow-xl mb-4 ${winner === 1 ? 'text-blue-500' : 'text-red-500'}`}>
              TEAM {winner} WINS! 🏆
            </div>
            <p className="text-5xl font-extrabold text-gray-500">Fantastic Performance!</p>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default TugOfWar;
