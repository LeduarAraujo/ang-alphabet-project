import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LETTER_IMAGES, shuffleArray, type LetterImage } from '../letter-images';

interface Letter {
  id: number;
  letter: string;
  state: 'visible' | 'hidden' | 'correct';
}

@Component({
  selector: 'app-module2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './module2.component.html',
  styleUrl: './module2.component.css'
})
export class Module2Component implements OnInit {
  gameStarted = false;
  currentLetter: string | null = null;
  currentImageOptions: string[] = [];
  correctEmoji: string = '';
  correctWord: string = '';
  feedback: 'none' | 'correct' | 'wrong' = 'none';
  showReveal = false;
  revealedLetter: string | null = null;

  alphabet: Letter[] = [];

  private availableLetters: string[] = [];
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

  onImageClick(clickedEmoji: string) {
    if (this.feedback !== 'none' || !this.currentLetter) return;

    if (clickedEmoji === this.correctEmoji) {
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
    // Não limpar o feedback após 3 segundos para mostrar a tela do parabéns
  }

  private showWrongFeedback() {
    this.feedback = 'wrong';
    setTimeout(() => this.feedback = 'none', 1500);
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
      this.feedback = 'none'; // Limpar feedback quando mostrar a tela de revelação
    }, 3000);
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

    // Gerar opções de imagem
    const imageData = LETTER_IMAGES[randomLetter];
    if (imageData) {
      const allOptions = [...imageData.wrongOptions, imageData.correctEmoji];
      this.currentImageOptions = shuffleArray(allOptions);
      this.correctEmoji = imageData.correctEmoji;
      this.correctWord = imageData.correctWord;
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
