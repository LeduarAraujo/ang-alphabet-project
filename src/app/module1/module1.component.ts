import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Letter {
  id: number;
  letter: string;
  state: 'visible' | 'hidden' | 'correct';
}

@Component({
  selector: 'app-module1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './module1.component.html',
  styleUrl: './module1.component.css'
})
export class Module1Component implements OnInit {
  gameStarted = false;
  currentLetter: string | null = null;
  isRecording = false;
  feedback: 'none' | 'correct' | 'wrong' = 'none';
  showReveal = false;
  revealedLetter: string | null = null;

  alphabet: Letter[] = [];

  private recognition: any;
  private availableLetters: string[] = [];
  private lastSpokenText: string = '';
  private colors: string[] = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff8a80 0%, #ff4081 100%)',
    'linear-gradient(135deg, #81d8f0 0%, #5fb9ff 100%)',
    'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
  ];

  ngOnInit() {
    this.initializeAlphabet();
    this.initializeSpeechRecognition();
  }

  private initializeAlphabet() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    this.alphabet = letters.map((letter, index) => ({
      id: index,
      letter: letter,
      state: 'visible' as const
    }));

    this.availableLetters = [...letters];
  }

  private initializeSpeechRecognition() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error('Speech Recognition não está disponível neste navegador');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'pt-BR';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 10;

    this.recognition.onresult = (event: any) => {
      const result = event.results[0];
      this.lastSpokenText = result[0].transcript.toUpperCase().trim();
      console.log('Palavra detectada:', this.lastSpokenText);
    };

    this.recognition.onerror = (event: any) => {
      console.error('Erro no reconhecimento de voz:', event.error);
      this.isRecording = false;
    };
  }

  startGame() {
    this.gameStarted = true;
    this.feedback = 'none';
    this.alphabet.forEach(letter => {
      if (letter.state !== 'correct') {
        letter.state = 'hidden';
      }
    });
    this.availableLetters = this.alphabet
      .filter(letter => letter.state !== 'correct')
      .map(letter => letter.letter);
    this.showRandomLetter();
  }

  startRecording() {
    if (!this.gameStarted || !this.currentLetter || this.isRecording) return;

    console.log('🎤 Iniciando gravação...');
    this.isRecording = true;
    this.feedback = 'none';
    this.lastSpokenText = '';

    if (this.recognition) {
      try {
        this.recognition.start();
      } catch (e) {
        console.log('Recognition já está ativo');
      }
    }
  }

  stopRecording() {
    console.log('🛑 Parando gravação...');

    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.log('Recognition já está parado');
      }
    }

    // Aguardar um pouco pelo resultado do reconhecimento
    setTimeout(() => {
      if (this.lastSpokenText) {
        this.processSpokenText(this.lastSpokenText);
        this.lastSpokenText = '';
      }
      this.isRecording = false;
    }, 300);
  }

  private processSpokenText(text: string) {
    console.log('📝 Processando:', text);

    let cleanedText = text
      .toUpperCase()
      .replace(/LETRA\s*/g, '')
      .replace(/É\s*/g, '')
      .replace(/EH\s*/g, '')
      .replace(/A\s+(LETRA\s+)?/g, '')
      .trim();

    const words = cleanedText.split(/\s+/);
    const letterVariations: { [key: string]: string[] } = {
      'Á': ['A', 'AGÁ', 'AGA'],
      'É': ['E', 'É', 'EIS'],
      'Í': ['I'],
      'Ó': ['O', 'Ó'],
      'Ú': ['U', 'Ú'],
      'C': ['CÊ', 'CE', 'SE'],
      'F': ['ÉFE', 'EFE', 'FE'],
      'G': ['GÊ', 'GE'],
      'H': ['AGÁ', 'AGA', 'H'],
      'J': ['JOTA', 'JOTA', 'GE'],
      'K': ['CÁ', 'CA', 'K'],
      'L': ['ÉLE', 'ELE', 'LE'],
      'M': ['ÉME', 'EME', 'ME'],
      'N': ['ÉNE', 'ENE', 'NE'],
      'P': ['PÊ', 'PE'],
      'Q': ['QUÊ', 'QUE', 'CE'],
      'R': ['ÉRRE', 'ERRE', 'RE', 'RR'],
      'S': ['ÉSSE', 'ESSE', 'SE', 'CÊ'],
      'T': ['TÊ', 'TE'],
      'V': ['VÊ', 'VE'],
      'W': ['DÁBLIO', 'DABLIO', 'VÊ DOBRO', 'VÊ DUPLO', 'U DUPLO'],
      'X': ['XIS', 'XIS', 'CHIS'],
      'Y': ['ÍPSILOM', 'YPSILOM', 'I GRÉGO', 'Y'],
      'Z': ['ZÊ', 'ZE']
    };

    const checkMatch = (word: string, letter: string): boolean => {
      if (word === letter) return true;
      if (word.includes(letter)) return true;
      const variations = letterVariations[letter] || [];
      return variations.some(v => word === v || word.includes(v));
    };

    const matched = words.some(word => checkMatch(word, this.currentLetter!));

    if (matched) {
      this.onCorrectAnswer();
    } else {
      this.onWrongAnswer();
    }
  }

  private onCorrectAnswer() {
    console.log('✅ Acertou!');
    this.showCorrectFeedback();
    this.markLetterAsCorrect();
    this.removeLetterFromAvailable();
    this.showRevealScreen();
  }

  private onWrongAnswer() {
    console.log('❌ Errou!');
    this.showWrongFeedback();
  }

  private showCorrectFeedback() {
    this.feedback = 'correct';
    setTimeout(() => this.feedback = 'none', 1000);
  }

  private showWrongFeedback() {
    this.feedback = 'wrong';
    setTimeout(() => this.feedback = 'none', 1000);
  }

  private markLetterAsCorrect() {
    const letterObj = this.alphabet.find(l => l.letter === this.currentLetter);
    if (letterObj) {
      letterObj.state = 'correct';
    }
  }

  private removeLetterFromAvailable() {
    this.availableLetters = this.availableLetters.filter(l => l !== this.currentLetter);
  }

  private showRevealScreen() {
    setTimeout(() => {
      this.revealedLetter = this.currentLetter;
      this.currentLetter = null;
      this.showReveal = true;
    }, 1000);
  }

  goToNextLetter() {
    this.showReveal = false;
    this.revealedLetter = null;
    this.showRandomLetter();
  }

  private showRandomLetter() {
    if (this.availableLetters.length === 0) {
      this.currentLetter = null;
      return;
    }

    const randomIndex = Math.floor(Math.random() * this.availableLetters.length);
    const randomLetter = this.availableLetters[randomIndex];
    this.currentLetter = randomLetter;

    const letterObj = this.alphabet.find(l => l.letter === randomLetter);
    if (letterObj) {
      letterObj.state = 'visible';
    }
  }

  stopGame() {
    this.gameStarted = false;
    this.currentLetter = null;
    this.showReveal = false;
    this.revealedLetter = null;

    this.alphabet.forEach(letter => {
      if (letter.state === 'hidden') {
        letter.state = 'visible';
      }
    });

    if (this.recognition) {
      this.recognition.stop();
    }
  }

  resetGame() {
    this.stopGame();
    this.alphabet.forEach(letter => {
      letter.state = 'visible';
    });
    this.availableLetters = [];
  }

  getCardColor(letter: Letter): string {
    if (letter.state === 'correct') {
      return '';
    }
    return this.colors[letter.id % this.colors.length];
  }

  speakLetter(letter: string) {
    if (!letter) return;

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(letter.toUpperCase());
      utterance.lang = 'pt-BR';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  }
}
