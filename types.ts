
export interface WordItem {
  id: string;
  en: string;
  cn: string;
  emoji: string;
  phonetic?: string;
  sentence?: string;
  // New Educational Fields
  syllables?: string;
  breakdown?: string;
  etymology?: string;
  funFact?: string;
  realityScanner?: string;
  riddle?: string;
}

export enum GameType {
  WORD_LIST = 'WORD_LIST',
  EMOJI_DETECTIVE = 'EMOJI_DETECTIVE',
  MATCHING = 'MATCHING',
  SPELLING_BEE = 'SPELLING_BEE',
  FILL_BLANKS = 'FILL_BLANKS',
  BUBBLE_POP = 'BUBBLE_POP',
  WORD_SEARCH = 'WORD_SEARCH',
  MIND_MEMORY = 'MIND_MEMORY',
  RIDDLE_QUEST = 'RIDDLE_QUEST',
  TREE_HOUSE = 'TREE_HOUSE'
}

export interface Furniture {
  id: string;
  name: string;
  emoji: string;
  unlocked: boolean;
}

export interface GameState {
  currentView: GameType;
  completedGames: GameType[];
  unlockedFurnitureIds: string[];
}
