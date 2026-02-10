
import React, { useState, useEffect, useMemo } from 'react';
import { WORD_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';

const GRID_SIZE = 16;

const WordSearch: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [currentSelection, setCurrentSelection] = useState<[number, number][]>([]);
  const [foundCells, setFoundCells] = useState<[number, number][]>([]);
  
  // Game limits to 8 words that actually fit in the grid
  const wordsToFind = useMemo(() => {
    return WORD_LIST
      .map(w => w.en.toLowerCase().replace(/\s/g, ''))
      .filter(w => w.length <= GRID_SIZE)
      .slice(0, 8);
  }, []);

  useEffect(() => {
    generateGrid();
  }, [wordsToFind]);

  const generateGrid = () => {
    let newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    
    wordsToFind.forEach(word => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        attempts++;
        const direction = Math.random() > 0.5 ? 'H' : 'V';
        const maxRow = direction === 'V' ? GRID_SIZE - word.length : GRID_SIZE - 1;
        const maxCol = direction === 'H' ? GRID_SIZE - word.length : GRID_SIZE - 1;
        
        if (maxRow < 0 || maxCol < 0) continue;

        const row = Math.floor(Math.random() * (maxRow + 1));
        const col = Math.floor(Math.random() * (maxCol + 1));
        
        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
          const r = direction === 'V' ? row + i : row;
          const c = direction === 'H' ? col + i : col;
          if (newGrid[r][c] !== '' && newGrid[r][c] !== word[i]) {
            canPlace = false;
            break;
          }
        }

        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            const r = direction === 'V' ? row + i : row;
            const c = direction === 'H' ? col + i : col;
            newGrid[r][c] = word[i];
          }
          placed = true;
        }
      }
    });

    // Fill remaining spaces
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newGrid[r][c] === '') {
          newGrid[r][c] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
      }
    }
    setGrid(newGrid);
  };

  const handleCellClick = (r: number, c: number) => {
    const isAlreadySelected = currentSelection.some(([sr, sc]) => sr === r && sc === c);
    if (isAlreadySelected) return;

    const newSelection = [...currentSelection, [r, c] as [number, number]];
    setCurrentSelection(newSelection);

    const word = newSelection.map(([r, c]) => grid[r][c]).join('');
    if (wordsToFind.includes(word) && !foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
      setFoundCells([...foundCells, ...newSelection]);
      setCurrentSelection([]);
    } else if (newSelection.length > 15) {
      setCurrentSelection([]);
    }
  };

  const autoFind = (wordToFindStr: string) => {
    if (foundWords.includes(wordToFindStr)) return;
    
    // Simple scan to find the word in the grid for the "auto-find" feature
    // Horizontal check
    for (let r = 0; r < GRID_SIZE; r++) {
      const rowStr = grid[r].join('');
      const idx = rowStr.indexOf(wordToFindStr);
      if (idx !== -1) {
        const cells: [number, number][] = [];
        for (let i = 0; i < wordToFindStr.length; i++) cells.push([r, idx + i]);
        setFoundWords([...foundWords, wordToFindStr]);
        setFoundCells([...foundCells, ...cells]);
        return;
      }
    }
    // Vertical check
    for (let c = 0; c < GRID_SIZE; c++) {
      let colStr = '';
      for (let r = 0; r < GRID_SIZE; r++) colStr += grid[r][c];
      const idx = colStr.indexOf(wordToFindStr);
      if (idx !== -1) {
        const cells: [number, number][] = [];
        for (let i = 0; i < wordToFindStr.length; i++) cells.push([idx + i, c]);
        setFoundWords([...foundWords, wordToFindStr]);
        setFoundCells([...foundCells, ...cells]);
        return;
      }
    }
  };

  useEffect(() => {
    if (wordsToFind.length > 0 && foundWords.length === wordsToFind.length) {
      setTimeout(onComplete, 1500);
    }
  }, [foundWords, wordsToFind, onComplete]);

  return (
    <div className="text-center p-2 md:p-4">
      <div className="flex justify-between items-center mb-6">
        <img src={POKEMON_SPRITES(POKEMON_IDS.Meowth || 52)} className="w-16 h-16 md:w-20 md:h-20" alt="Meowth" />
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-700">Word Search 🔍</h2>
        <div className="text-xl md:text-2xl font-bold bg-white px-4 py-2 crayon-border">
          {foundWords.length} / {wordsToFind.length}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start justify-center">
        <div 
          className="grid gap-1 bg-white p-2 crayon-border shadow-inner mx-auto"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            width: 'fit-content'
          }}
        >
          {grid.map((row, r) => row.map((char, c) => {
            const isSelected = currentSelection.some(([sr, sc]) => sr === r && sc === c);
            const isFound = foundCells.some(([fr, fc]) => fr === r && fc === c);
            return (
              <div
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex items-center justify-center text-xs sm:text-sm md:text-lg font-bold cursor-pointer transition-colors border border-gray-100 ${
                  isSelected ? 'bg-yellow-400' : 
                  isFound ? 'bg-green-300 text-green-900' : 'bg-transparent hover:bg-gray-100'
                }`}
              >
                {char}
              </div>
            );
          }))}
        </div>

        <div className="flex flex-wrap md:flex-col gap-2 text-left justify-center md:justify-start w-full md:w-auto">
          <p className="font-bold text-xl mb-2 w-full text-center md:text-left">Find these words:</p>
          {wordsToFind.map(w => (
            <button
              key={w}
              onClick={() => autoFind(w)}
              className={`text-sm md:text-lg font-bold p-1 md:p-2 text-left transition-all crayon-border ${
                foundWords.includes(w) ? 'bg-green-100 line-through text-green-600 opacity-60' : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              {foundWords.includes(w) ? '✔️' : '🔍'} {w}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-gray-500 text-sm">Tip: Click letters in order to spell the word, or click the list to auto-find!</p>
    </div>
  );
};

export default WordSearch;
