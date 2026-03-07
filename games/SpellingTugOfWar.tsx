
import React, { useState, useMemo, useEffect } from 'react';
import { WORD_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';
import { playSound } from '../utils/sounds';

interface SpellingTugOfWarProps {
  onComplete: () => void;
}

const SpellingTugOfWar: React.FC<SpellingTugOfWarProps> = ({ onComplete }) => {
  const [round, setRound] = useState(0);
  const [team1Score, setTeam1Score] = useState(0); 
  const [team2Score, setTeam2Score] = useState(0);
  const [sharedIndex, setSharedIndex] = useState(0); 
  const [gameEnded, setGameEnded] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);
  
  // Spelling states for each team (tracking indices of options used)
  const [team1UsedIndices, setTeam1UsedIndices] = useState<number[]>([]);
  const [team2UsedIndices, setTeam2UsedIndices] = useState<number[]>([]);

  const [feedback, setFeedback] = useState<{team: 1 | 2 | 'both', type: 'claimed' | 'too-slow' | 'wrong' | 'none'}>({team: 'both', type: 'none'});

  // Groups of 3 words
  const roundWords = useMemo(() => {
    const start = round * 3;
    return WORD_LIST.slice(start, start + 3);
  }, [round]);

  const currentWord = roundWords[sharedIndex];
  const targetEn = currentWord?.en.toLowerCase() || "";

  // Letter options for each team (shuffled independently, only word letters)
  const team1Options = useMemo(() => {
    if (!targetEn) return [];
    return targetEn.split('').filter(l => l !== ' ').map((char, idx) => ({ char, id: idx })).sort(() => 0.5 - Math.random());
  }, [targetEn, sharedIndex]);

  const team2Options = useMemo(() => {
    if (!targetEn) return [];
    return targetEn.split('').filter(l => l !== ' ').map((char, idx) => ({ char, id: idx })).sort(() => 0.5 - Math.random());
  }, [targetEn, sharedIndex]);

  const checkRoundEnd = (s1: number, s2: number, nextIdx: number) => {
    if (nextIdx >= 3) {
      setGameEnded(true);
      setWinner(s1 > s2 ? 1 : 2);
      setTimeout(() => {
        if ((round + 1) * 3 >= WORD_LIST.length) {
          onComplete();
        } else {
          setRound(r => r + 1);
          setTeam1Score(0);
          setTeam2Score(0);
          setSharedIndex(0);
          setTeam1UsedIndices([]);
          setTeam2UsedIndices([]);
          setGameEnded(false);
          setWinner(null);
          setFeedback({team: 'both', type: 'none'});
        }
      }, 3000);
    }
  };

  const handleLetterClick = (char: string, optionIdx: number, team: 1 | 2) => {
    if (gameEnded || feedback.type !== 'none') return;

    const usedIndices = team === 1 ? team1UsedIndices : team2UsedIndices;
    const setUsedIndices = team === 1 ? setTeam1UsedIndices : setTeam2UsedIndices;
    
    if (usedIndices.includes(optionIdx)) return;

    const targetWithSpaces = targetEn.split('');
    
    // Calculate current progress for this team
    let currentInputText = "";
    let tempUsedCount = 0;
    for (let i = 0; i < targetWithSpaces.length; i++) {
      if (targetWithSpaces[i] === ' ') {
        currentInputText += ' ';
      } else if (tempUsedCount < usedIndices.length) {
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

      if (nextUsedIndices.length === targetEn.split('').filter(c => c !== ' ').length) {
        // This team finished first!
        if (team === 1) setTeam1Score(s => s + 1);
        else setTeam2Score(s => s + 1);

        setFeedback({ team, type: 'claimed' });
        
        setTimeout(() => {
          const nextIdx = sharedIndex + 1;
          setSharedIndex(nextIdx);
          setTeam1UsedIndices([]);
          setTeam2UsedIndices([]);
          setFeedback({team: 'both', type: 'none'});
          checkRoundEnd(team === 1 ? team1Score + 1 : team1Score, team === 2 ? team2Score + 1 : team2Score, nextIdx);
        }, 1200);
      }
    } else {
      playSound('wrong');
    }
  };

  const ropeOffset = (team1Score - team2Score) * 80;

  return (
    <div className="flex flex-col h-full select-none relative">
      <div className="text-center mb-4">
        <h2 className="text-5xl font-black text-purple-600 tracking-tight">SPELLING TUG OF WAR! 🐝⚔️</h2>
        <p className="text-2xl text-gray-400 font-bold mt-1">Race to spell the word correctly!</p>
      </div>

      <div className="flex flex-1 gap-6 items-stretch h-[580px]">
        {/* Team 1 Panel */}
        <div className={`flex-1 rounded-[40px] border-8 flex flex-col items-center p-6 transition-all duration-300 relative shadow-2xl ${
          feedback.team === 1 && feedback.type === 'claimed' ? 'bg-green-100 border-green-500 scale-105' : 
          feedback.team === 2 && feedback.type === 'claimed' ? 'bg-gray-100 border-gray-300 opacity-50' : 
          'bg-blue-50 border-blue-400'
        }`}>
          <div className="bg-blue-600 text-white px-8 py-2 rounded-full font-black text-2xl mb-4 shadow-lg">TEAM 1</div>
          
          <div className="mb-4 text-center w-full">
            <div className="text-4xl font-black text-blue-800 bg-white px-4 py-6 rounded-2xl shadow-md border-2 border-blue-100 min-h-[100px] flex items-center justify-center mb-2">
              {currentWord?.cn} {currentWord?.emoji}
            </div>
          </div>

          {/* Spelling Progress */}
          <div className="flex flex-wrap justify-center gap-1 mb-6 min-h-[50px]">
            {targetEn.split('').map((char, idx) => {
              const isSpace = char === ' ';
              const lettersBefore = targetEn.slice(0, idx + 1).split('').filter(x => x !== ' ').length;
              const isFilled = !isSpace && team1UsedIndices.length >= lettersBefore;
              return (
                <div key={idx} className={`w-8 h-10 flex items-center justify-center text-2xl font-bold border-b-4 ${isFilled ? 'border-blue-500 text-blue-600' : 'border-gray-300 text-transparent'}`}>
                  {isFilled ? char : '_'}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-4 gap-2 w-full">
            {team1Options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleLetterClick(opt.char, idx, 1)}
                className={`h-14 bg-white text-2xl font-bold rounded-xl border-2 border-blue-200 transition-all transform active:scale-90 ${
                  team1UsedIndices.includes(idx) ? 'opacity-0 pointer-events-none scale-0' : 'hover:border-blue-500 hover:bg-blue-100'
                }`}
              >
                {opt.char}
              </button>
            ))}
          </div>

          {feedback.team === 2 && feedback.type === 'claimed' && (
            <div className="absolute inset-0 z-10 bg-red-500/20 flex items-center justify-center rounded-[32px] backdrop-blur-[2px]">
              <span className="text-5xl font-black text-red-600 drop-shadow-lg animate-pulse">TOO SLOW! 🐢</span>
            </div>
          )}
          {feedback.team === 1 && feedback.type === 'claimed' && (
            <div className="absolute inset-0 z-10 bg-green-500/20 flex items-center justify-center rounded-[32px]">
              <span className="text-6xl font-black text-green-600 drop-shadow-lg animate-bounce">POINT! ⭐</span>
            </div>
          )}
        </div>

        {/* The Arena */}
        <div className="w-64 bg-gray-100 rounded-[40px] border-4 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 relative overflow-hidden shadow-inner">
           <div className="absolute top-8 flex justify-between w-full px-6">
              <div className="flex flex-col items-center">
                <span className="text-blue-600 font-black text-4xl">{team1Score}</span>
                <span className="text-blue-400 font-bold">P1</span>
              </div>
              <div className="text-gray-300 font-black text-2xl mt-2 italic">VS</div>
              <div className="flex flex-col items-center">
                <span className="text-red-600 font-black text-4xl">{team2Score}</span>
                <span className="text-red-400 font-bold">P2</span>
              </div>
           </div>

           <div className="absolute top-0 bottom-0 left-1/2 w-2 border-l-4 border-dashed border-gray-300 -translate-x-1/2"></div>

           <div className="relative w-full h-full flex items-center justify-center">
              <div 
                className="absolute w-[250%] h-4 bg-amber-900 rounded-full shadow-2xl z-10 transition-transform duration-700" 
                style={{ transform: `translateX(${ropeOffset}px)` }}
              >
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-12 bg-purple-600 rounded-md border-4 border-white shadow-md"></div>
              </div>

              <div 
                className="absolute left-[-10px] z-20 transition-transform duration-700" 
                style={{ transform: `translateX(${ropeOffset}px)` }}
              >
                <img src={POKEMON_SPRITES(POKEMON_IDS.Pikachu)} className="w-24 h-24 drop-shadow-2xl" alt="t1" />
              </div>

              <div 
                className="absolute right-[-10px] z-20 transition-transform duration-700" 
                style={{ transform: `translateX(${ropeOffset}px)` }}
              >
                <img src={POKEMON_SPRITES(POKEMON_IDS.Eevee)} className="w-24 h-24 drop-shadow-2xl scale-x-[-1]" alt="t2" />
              </div>
           </div>
           
           <div className="absolute bottom-6 bg-white px-4 py-1 rounded-full border-2 border-gray-200 text-gray-400 font-bold uppercase tracking-widest text-xs">
             Word {sharedIndex + 1} of 3
           </div>
        </div>

        {/* Team 2 Panel */}
        <div className={`flex-1 rounded-[40px] border-8 flex flex-col items-center p-6 transition-all duration-300 relative shadow-2xl ${
          feedback.team === 2 && feedback.type === 'claimed' ? 'bg-green-100 border-green-500 scale-105' : 
          feedback.team === 1 && feedback.type === 'claimed' ? 'bg-gray-100 border-gray-300 opacity-50' : 
          'bg-red-50 border-red-400'
        }`}>
          <div className="bg-red-600 text-white px-8 py-2 rounded-full font-black text-2xl mb-4 shadow-lg">TEAM 2</div>
          
          <div className="mb-4 text-center w-full">
            <div className="text-4xl font-black text-red-800 bg-white px-4 py-6 rounded-2xl shadow-md border-2 border-red-100 min-h-[100px] flex items-center justify-center mb-2">
              {currentWord?.cn} {currentWord?.emoji}
            </div>
          </div>

          {/* Spelling Progress */}
          <div className="flex flex-wrap justify-center gap-1 mb-6 min-h-[50px]">
            {targetEn.split('').map((char, idx) => {
              const isSpace = char === ' ';
              const lettersBefore = targetEn.slice(0, idx + 1).split('').filter(x => x !== ' ').length;
              const isFilled = !isSpace && team2UsedIndices.length >= lettersBefore;
              return (
                <div key={idx} className={`w-8 h-10 flex items-center justify-center text-2xl font-bold border-b-4 ${isFilled ? 'border-red-500 text-red-600' : 'border-gray-300 text-transparent'}`}>
                  {isFilled ? char : '_'}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-4 gap-2 w-full">
            {team2Options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleLetterClick(opt.char, idx, 2)}
                className={`h-14 bg-white text-2xl font-bold rounded-xl border-2 border-red-200 transition-all transform active:scale-90 ${
                  team2UsedIndices.includes(idx) ? 'opacity-0 pointer-events-none scale-0' : 'hover:border-red-500 hover:bg-red-100'
                }`}
              >
                {opt.char}
              </button>
            ))}
          </div>

          {feedback.team === 1 && feedback.type === 'claimed' && (
            <div className="absolute inset-0 z-10 bg-red-500/20 flex items-center justify-center rounded-[32px] backdrop-blur-[2px]">
              <span className="text-5xl font-black text-red-600 drop-shadow-lg animate-pulse">TOO SLOW! 🐢</span>
            </div>
          )}
          {feedback.team === 2 && feedback.type === 'claimed' && (
            <div className="absolute inset-0 z-10 bg-green-500/20 flex items-center justify-center rounded-[32px]">
              <span className="text-6xl font-black text-green-600 drop-shadow-lg animate-bounce">POINT! ⭐</span>
            </div>
          )}
        </div>
      </div>

      {gameEnded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-lg rounded-[40px] animate-in fade-in duration-500">
          <div className="text-center">
            <div className={`text-[100px] font-black leading-none drop-shadow-xl mb-4 ${winner === 1 ? 'text-blue-500' : 'text-red-500'}`}>
              TEAM {winner} WINS! 🏆
            </div>
            <p className="text-4xl font-extrabold text-gray-500">Spelling Masters!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpellingTugOfWar;
