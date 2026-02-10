
import React, { useState } from 'react';
import { WORD_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';
import { WordItem } from '../types';

interface WordListViewProps {
  onStart: () => void;
}

const WordListView: React.FC<WordListViewProps> = ({ onStart }) => {
  const [selectedWord, setSelectedWord] = useState<WordItem | null>(null);

  const DetailModal = ({ word, onClose }: { word: WordItem; onClose: () => void }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-pink-200/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-6xl wobbly-border p-6 md:p-12 shadow-[0_0_50px_rgba(255,158,207,0.5)] relative animate-in zoom-in duration-300 overflow-y-auto max-h-[95vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-5xl hover:scale-125 transition-transform p-3 bg-pink-100 text-pink-500 rounded-full z-20 shadow-md border-2 border-white"
        >
          ✖️
        </button>

        {/* Word Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-8 border-b-6 border-dotted border-pink-200">
          <div className="bg-pink-50 p-6 rounded-full border-4 border-pink-100 shadow-inner">
            <span className="text-[120px] leading-none animate-float block">{word.emoji}</span>
          </div>
          <div className="text-center md:text-left flex-1">
            <h3 className="text-8xl font-black text-pink-500 mb-2 drop-shadow-sm">{word.en}</h3>
            <p className="text-5xl text-blue-500 font-bold bg-blue-50 px-6 py-2 rounded-2xl inline-block">{word.cn}</p>
          </div>
        </div>

        {/* Detailed Sections with Large, Clear Text */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          <div className="detail-section border-blue-400 bg-blue-50/50">
            <h4 className="text-3xl font-black text-blue-700 mb-3 flex items-center gap-2">
              🗣️ 音節劃分 <span className="text-blue-400 text-xl font-bold uppercase">Syllables</span>
            </h4>
            <p className="text-5xl font-black text-gray-800 tracking-widest">{word.syllables || 'N/A'}</p>
          </div>

          <div className="detail-section border-pink-400 bg-pink-50/50">
            <h4 className="text-3xl font-black text-pink-700 mb-3 flex items-center gap-2">
              🧩 單詞拆解 <span className="text-pink-400 text-xl font-bold uppercase">Breakdown</span>
            </h4>
            <p className="text-3xl font-bold text-gray-800 leading-relaxed">{word.breakdown || 'N/A'}</p>
          </div>

          <div className="detail-section border-purple-400 bg-purple-50/50 xl:col-span-2">
            <h4 className="text-3xl font-black text-purple-700 mb-3 flex items-center gap-2">
              🏛️ 詞源小故事 <span className="text-purple-400 text-xl font-bold uppercase">Etymology</span>
            </h4>
            <p className="text-2xl font-bold text-gray-700 leading-relaxed bg-white/80 p-4 rounded-xl border-2 border-dashed border-purple-100">
              {word.etymology || 'N/A'}
            </p>
          </div>

          <div className="detail-section border-yellow-500 bg-yellow-50/50">
            <h4 className="text-3xl font-black text-yellow-700 mb-3 flex items-center gap-2">
              🍭 趣味冷知識 <span className="text-yellow-500 text-xl font-bold uppercase">Fun Fact</span>
            </h4>
            <p className="text-2xl font-bold text-gray-700 leading-relaxed italic bg-white/80 p-4 rounded-xl border-2 border-dashed border-yellow-200">
              {word.funFact || 'N/A'}
            </p>
          </div>

          <div className="detail-section border-green-500 bg-green-50/50">
            <h4 className="text-3xl font-black text-green-700 mb-3 flex items-center gap-2">
              🖼️ REALITY SCANNER <span className="text-green-400 text-xl font-bold uppercase">百科補充</span>
            </h4>
            <p className="text-2xl font-bold text-gray-800 leading-relaxed bg-white/80 p-4 rounded-xl border-2 border-dashed border-green-100">
              {word.realityScanner || 'N/A'}
            </p>
          </div>

        </div>

        {/* Bottom Mascot Decor */}
        <div className="mt-12 pt-8 flex flex-col items-center gap-4 border-t-4 border-dashed border-gray-100">
            <img 
                src={POKEMON_SPRITES(POKEMON_IDS.Charmander)} 
                className="w-48 h-48 sticker-glow animate-float drop-shadow-xl" 
                alt="Pokemon mascot" 
            />
            <p className="text-2xl font-bold text-pink-300">You're doing great! Keep learning! ✨</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="text-center">
      {selectedWord && <DetailModal word={selectedWord} onClose={() => setSelectedWord(null)} />}

      <div className="flex justify-center items-center gap-8 mb-10">
        <div className="bg-pink-50 p-4 rounded-3xl wobbly-border animate-float shadow-inner border-2 border-pink-200">
          <img src={POKEMON_SPRITES(POKEMON_IDS.Pikachu)} alt="Pikachu" className="w-28 h-28 sticker-glow" />
        </div>
        <div>
          <h2 className="text-6xl font-black text-pink-400 mb-2 drop-shadow-md">My Vocabulary ✨</h2>
          <p className="text-3xl text-blue-400 font-bold bg-white/50 px-8 py-2 rounded-full inline-block">Click a card to see details! 🔍</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-3xl wobbly-border animate-float shadow-inner border-2 border-blue-200" style={{animationDelay: '1.5s'}}>
          <img src={POKEMON_SPRITES(POKEMON_IDS.Eevee)} alt="Eevee" className="w-28 h-28 sticker-glow" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left max-h-[600px] overflow-y-auto px-8 py-6 no-scrollbar">
        {WORD_LIST.map((word, idx) => (
          <div 
            key={word.id} 
            onClick={() => setSelectedWord(word)}
            className={`p-8 bg-white crayon-card hover:rotate-1 shadow-xl border-4 relative overflow-hidden cursor-pointer active:scale-95 transition-all ${
                idx % 2 === 0 ? 'bg-pink-50/50 border-pink-100' : 'bg-blue-50/50 border-blue-100'
            }`}
          >
            <div className="absolute -top-4 -right-4 opacity-10 text-6xl rotate-12">🐾</div>
            <div className="flex items-center gap-8 mb-4">
              <span className="text-7xl filter drop-shadow-md animate-float" style={{animationDelay: `${idx * 0.2}s`}}>{word.emoji}</span>
              <span className="text-4xl font-black text-pink-500 tracking-tight leading-none">{word.en}</span>
            </div>
            <div className="flex justify-between items-center bg-white/60 p-4 rounded-2xl border-2 border-white/80">
              <div>
                <div className="text-xl text-purple-400 italic font-black mb-1">🔊 {word.phonetic}</div>
                <div className="text-3xl font-black text-blue-500">{word.cn}</div>
              </div>
              <div className="text-5xl animate-pulse">🧸</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 relative">
        <div className="absolute -top-16 left-1/4 text-6xl animate-bounce">🎈</div>
        <button
          onClick={onStart}
          className="px-24 py-10 bg-pink-400 text-white text-6xl font-black rounded-full border-6 border-white shadow-[0_12px_0_#ff9ecf] hover:translate-y-1 hover:shadow-[0_6px_0_#ff9ecf] active:translate-y-4 active:shadow-none transition-all animate-wiggle"
        >
          START ADVENTURE! 🌈
        </button>
        <div className="absolute -top-16 right-1/4 text-6xl animate-bounce" style={{animationDelay: '0.5s'}}>🍭</div>
      </div>
    </div>
  );
};

export default WordListView;
