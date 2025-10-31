// Mapeamento de letras para imagens (palavras para cada letra)
export interface LetterImage {
  letter: string;
  correctWord: string;
  correctEmoji: string;
  wrongOptions: string[];
}

export const LETTER_IMAGES: { [key: string]: LetterImage } = {
  'A': {
    letter: 'A',
    correctWord: 'Abacate',
    correctEmoji: '🥑',
    wrongOptions: ['🐻', '🚗']
  },
  'B': {
    letter: 'B',
    correctWord: 'Bola',
    correctEmoji: '⚽',
    wrongOptions: ['🍎', '🐦']
  },
  'C': {
    letter: 'C',
    correctWord: 'Casa',
    correctEmoji: '🏠',
    wrongOptions: ['🐕', '🚢']
  },
  'D': {
    letter: 'D',
    correctWord: 'Dado',
    correctEmoji: '🎲',
    wrongOptions: ['🦆', '🐉']
  },
  'E': {
    letter: 'E',
    correctWord: 'Estrela',
    correctEmoji: '⭐',
    wrongOptions: ['🚗', '🦅']
  },
  'F': {
    letter: 'F',
    correctWord: 'Flor',
    correctEmoji: '🌸',
    wrongOptions: ['🐸', '🎺']
  },
  'G': {
    letter: 'G',
    correctWord: 'Gato',
    correctEmoji: '🐱',
    wrongOptions: ['🍇', '🔑']
  },
  'H': {
    letter: 'H',
    correctWord: 'Hipopótamo',
    correctEmoji: '🦛',
    wrongOptions: ['🏠', '🎹']
  },
  'I': {
    letter: 'I',
    correctWord: 'Ímã',
    correctEmoji: '🧲',
    wrongOptions: ['🎪', '🐉']
  },
  'J': {
    letter: 'J',
    correctWord: 'Jacaré',
    correctEmoji: '🐊',
    wrongOptions: ['🍊', '🎪']
  },
  'K': {
    letter: 'K',
    correctWord: 'Koala',
    correctEmoji: '🐨',
    wrongOptions: ['🔑', '🎸']
  },
  'L': {
    letter: 'L',
    correctWord: 'Leão',
    correctEmoji: '🦁',
    wrongOptions: ['🍄', '🎨']
  },
  'M': {
    letter: 'M',
    correctWord: 'Macaco',
    correctEmoji: '🐵',
    wrongOptions: ['🍄', '🌙']
  },
  'N': {
    letter: 'N',
    correctWord: 'Navio',
    correctEmoji: '🚢',
    wrongOptions: ['🦉', '🔔']
  },
  'O': {
    letter: 'O',
    correctWord: 'Ovo',
    correctEmoji: '🥚',
    wrongOptions: ['🦑', '🦒']
  },
  'P': {
    letter: 'P',
    correctWord: 'Pato',
    correctEmoji: '🦆',
    wrongOptions: ['🍕', '💡']
  },
  'Q': {
    letter: 'Q',
    correctWord: 'Queijo',
    correctEmoji: '🧀',
    wrongOptions: ['👑', '🤴']
  },
  'R': {
    letter: 'R',
    correctWord: 'Robô',
    correctEmoji: '🤖',
    wrongOptions: ['🐰', '🐢']
  },
  'S': {
    letter: 'S',
    correctWord: 'Sapo',
    correctEmoji: '🐸',
    wrongOptions: ['🦊', '📞']
  },
  'T': {
    letter: 'T',
    correctWord: 'Tartaruga',
    correctEmoji: '🐢',
    wrongOptions: ['🍅', '🌳']
  },
  'U': {
    letter: 'U',
    correctWord: 'Ursinho',
    correctEmoji: '🧸',
    wrongOptions: ['☂️', '🎠']
  },
  'V': {
    letter: 'V',
    correctWord: 'Violino',
    correctEmoji: '🎻',
    wrongOptions: ['🐊', '🌊']
  },
  'W': {
    letter: 'W',
    correctWord: 'Waffle',
    correctEmoji: '🧇',
    wrongOptions: ['🐺', '🌊']
  },
  'X': {
    letter: 'X',
    correctWord: 'Xícara',
    correctEmoji: '☕',
    wrongOptions: ['🤖', '⚔️']
  },
  'Y': {
    letter: 'Y',
    correctWord: 'Yakisoba',
    correctEmoji: '🍜',
    wrongOptions: ['👑', '⛵']
  },
  'Z': {
    letter: 'Z',
    correctWord: 'Zebra',
    correctEmoji: '🦓',
    wrongOptions: ['🦎', '🌙']
  }
};

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRandomImages(letter: string, count: number = 3): string[] {
  const imageData = LETTER_IMAGES[letter];
  if (!imageData) return [];

  const allImages = [...imageData.wrongOptions, imageData.correctEmoji];
  return shuffleArray(allImages).slice(0, count);
}

