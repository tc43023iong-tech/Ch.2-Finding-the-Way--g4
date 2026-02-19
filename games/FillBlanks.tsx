
import React, { useState, useMemo } from 'react';
import { WORD_LIST, POKEMON_SPRITES, POKEMON_IDS } from '../constants';
import { playSound } from '../utils/sounds';

const SENTENCES: Record<string, string> = {
  'neighbourhood': "I like living in this ______ because the people are nice.",
  'post office': "I am going to the ______ to buy some stamps.",
  'post a parcel': "My grandma sent me a gift, so I need to go ______.",
  'post a letter': "Don't forget to ______ to your pen pal in London!",
  'bank': "People keep their money safe in the ______.",
  'bakery': "The ______ smells like fresh bread every morning.",
  'jewellery shop': "My dad bought a beautiful ring at the ______.",
  'clinic': "If you feel sick, you should visit the ______.",
  'department store': "You can buy clothes, toys, and food at the ______.",
  'buy furniture': "We moved to a new house, so we need to ______.",
  'sports centre': "I play basketball with my friends at the ______.",
  'supermarket': "Let's go to the ______ to buy some milk and eggs.",
  'buy groceries': "Every Sunday, we go to the market to ______.",
  'train station': "The ______ is very crowded during rush hour.",
  'health and beauty store': "I need to buy some shampoo at the ______.",
  'learning centre': "I study English and Math at the ______.",
  'take a course': "I want to ______ in drawing this summer.",
  'convenience store': "I bought a snack at the ______ near my house.",
  'hospital': "The ambulance took the patient to the ______.",
  'walk straight ahead': "To find the park, just ______ for two blocks.",
  'turn': "Please ______ left at the corner.",
  'opposite': "The bakery is ______ the bank.",
  'nearest': "Where is the ______ MTR station?",
  'fantastic': "The magic show was ______! I loved it.",
  'nearby': "Is there a library ______? I want to borrow a book.",
};

const FillBlanks: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = WORD_LIST[currentIndex];
  const sentence = SENTENCES[currentWord.en] || `I am at the ______.`;

  const options = useMemo(() => {
    const others = WORD_LIST.filter(w => w.id !== currentWord.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    return [...others, currentWord].sort(() => 0.5 - Math.random());
  }, [currentWord]);

  const handleSelect = (word: typeof currentWord) => {
    if (word.id === currentWord.id) {
      playSound('correct');
      if (currentIndex < WORD_LIST.length - 1) {
        setCurrentIndex(c => c + 1);
      } else {
        onComplete();
      }
    } else {
      playSound('wrong');
    }
  };

  return (
    <div className="text-center p-4">
      <div className="flex justify-between items-center mb-8">
        <img src={POKEMON_SPRITES(POKEMON_IDS.Jigglypuff || 39)} className="w-20 h-20" alt="Jigglypuff" />
        <h2 className="text-4xl font-bold text-pink-600">Fill in the Blanks ✍️</h2>
        <div className="text-2xl font-bold bg-white px-4 py-2 crayon-border">
          {currentIndex + 1} / {WORD_LIST.length}
        </div>
      </div>

      <div className="bg-yellow-50 p-8 crayon-border mb-12">
        <p className="text-4xl font-bold leading-relaxed text-gray-800">
          {sentence.split('______').map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="inline-block w-48 border-b-4 border-dashed border-blue-400 mx-2"></span>
              )}
            </React.Fragment>
          ))}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt)}
            className="p-6 text-3xl font-bold bg-white hover:bg-pink-100 transition-all crayon-border"
          >
            {opt.en}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FillBlanks;
