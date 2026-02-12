
import React, { useState } from 'react';
import { WORD_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';
import { WordItem } from '../types';

interface WordListViewProps {
  onStart: () => void;
}

const WordListView: React.FC<WordListViewProps> = ({ onStart }) => {
  const [selectedWord, setSelectedWord] = useState<WordItem | null>(null);

  const DetailModal = ({ word, onClose }: { word: WordItem; onClose: () => void }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-gray-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-5xl rounded-3xl p-8 md:p-16 shadow-2xl relative animate-in zoom-in overflow-y-auto max-h-[90vh] no-scrollbar border-8 border-pink-100">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-4xl hover:text-pink-500 transition-colors p-2"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row items-center gap-10 mb-10 pb-10 border-b-2 border-gray-100">
          <span className="text-[120px] leading-none">{word.emoji}</span>
          <div className="text-center md:text-left">
            <h3 className="text-7xl font-black text-pink-500 mb-2">{word.en}</h3>
            <p className="text-4xl text-blue-500 font-bold">{word.cn}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          <div className="detail-item">
            <span className="label-tag">🗣️ 音節劃分 SYLLABLES</span>
            <p className="text-4xl font-black text-gray-800 tracking-widest">{word.syllables || '-'}</p>
          </div>
          <div className="detail-item">
            <span className="label-tag">🧩 單詞拆解 BREAKDOWN</span>
            <p className="text-2xl font-bold text-gray-700">{word.breakdown || '-'}</p>
          </div>
          <div className="detail-item md:col-span-2">
            <span className="label-tag">🏛️ 詞源小故事 ETYMOLOGY</span>
            <p className="text-xl text-gray-600 leading-relaxed font-bold">{word.etymology || '-'}</p>
          </div>
          <div className="detail-item">
            <span className="label-tag">🍭 趣味冷知識 FUN FACT</span>
            <p className="text-xl text-gray-600 italic font-bold">{word.funFact || '-'}</p>
          </div>
          <div className="detail-item">
            <span className="label-tag">🖼️ 百科補充 REALITY SCANNER</span>
            <p className="text-xl text-gray-600 font-bold">{word.realityScanner || '-'}</p>
          </div>
        </div>

        <div className="mt-12 flex justify-center opacity-60">
            <img src={POKEMON_SPRITES(POKEMON_IDS.Charmander)} className="w-32 h-32" alt="Mascot" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="text-center">
      {selectedWord && <DetailModal word={selectedWord} onClose={() => setSelectedWord(null)} />}

      <div className="flex justify-center items-center gap-8 mb-12">
        <img src={POKEMON_SPRITES(POKEMON_IDS.Pikachu)} alt="Pikachu" className="w-24 h-24" />
        <div>
          <h2 className="text-5xl font-black text-pink-400 mb-1">Vocabulary Card ✨</h2>
          <p className="text-xl text-gray-400 font-bold">Tap a card to learn more!</p>
        </div>
        <img src={POKEMON_SPRITES(POKEMON_IDS.Eevee)} alt="Eevee" className="w-24 h-24" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-h-[600px] overflow-y-auto px-4 py-4 no-scrollbar">
        {WORD_LIST.map((word) => (
          <div 
            key={word.id} 
            onClick={() => setSelectedWord(word)}
            className="p-6 bg-white crayon-card shadow-sm cursor-pointer active:scale-95 transition-transform flex flex-col justify-between"
          >
            <div className="flex items-start gap-4 mb-4">
              <span className="text-5xl">{word.emoji}</span>
              <div>
                <span className="text-3xl font-black text-pink-500 block leading-tight">{word.en}</span>
                <span className="text-xl text-blue-400 font-bold">{word.cn}</span>
              </div>
            </div>
            <div className="text-sm text-gray-300 italic">Tap to open 🔍</div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <button
          onClick={onStart}
          className="px-16 py-6 bg-pink-400 text-white text-4xl font-black rounded-full shadow-lg hover:bg-pink-500 transition-colors"
        >
          Start Game! 🌈
        </button>
      </div>
    </div>
  );
};

export default WordListView;
