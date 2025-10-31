import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Letter {
  id: number;
  letter: string;
  state: 'visible' | 'hidden' | 'correct';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ang-alphabet-project';
  
  gameStarted = false;
  currentLetter: string | null = null;
  isRecording = false;
  feedback: 'none' | 'correct' | 'wrong' = 'none';
  showReveal = false;
  revealedLetter: string | null = null;
  
  alphabet: Letter[] = [];
  
  private recognition: any;
  private availableLetters: string[] = [];
  private isProcessingResult = false;
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
    // Criar array com todas as letras do alfabeto
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    this.alphabet = letters.map((letter, index) => ({
      id: index,
      letter: letter,
      state: 'visible' as const
    }));
    
    this.availableLetters = [...letters];
  }

  private initializeSpeechRecognition() {
    // Verificar se o navegador suporta Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error('Speech Recognition não está disponível neste navegador');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'pt-BR';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toUpperCase().trim();
      console.log('Letra falada:', transcript);
      
      this.handleSpeechResult(transcript);
    };

    this.recognition.onerror = (event: any) => {
      console.error('Erro no reconhecimento de voz:', event.error);
      this.isRecording = false;
    };

    this.recognition.onend = () => {
      // Limpar estado de gravação quando terminar
      this.isRecording = false;
    };
  }

  startGame() {
    this.gameStarted = true;
    this.feedback = 'none';
    
    // Ocultar todas as letras
    this.alphabet.forEach(letter => {
      if (letter.state !== 'correct') {
        letter.state = 'hidden';
      }
    });
    
    // Restaurar letras disponíveis
    this.availableLetters = this.alphabet
      .filter(letter => letter.state !== 'correct')
      .map(letter => letter.letter);
    
    // Mostrar primeira letra aleatória
    this.showRandomLetter();
  }

  startRecording() {
    if (!this.gameStarted || !this.currentLetter || this.isRecording) return;
    
    this.isRecording = true;
    this.feedback = 'none';
    
    if (this.recognition) {
      try {
        this.recognition.start();
      } catch (e) {
        console.log('Reconhecimento já iniciado');
      }
    }
  }

  stopRecording() {
    this.isRecording = false;
    
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.log('Reconhecimento já parado');
      }
    }
  }

  stopGame() {
    this.gameStarted = false;
    this.currentLetter = null;
    
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  resetGame() {
    this.stopGame();
    
    // Resetar todas as letras para visível
    this.alphabet.forEach(letter => {
      letter.state = 'visible';
    });
    
    this.availableLetters = [];
  }

  private showRandomLetter() {
    if (this.availableLetters.length === 0) {
      this.currentLetter = null;
      this.stopGame();
      return;
    }
    
    // Selecionar letra aleatória
    const randomIndex = Math.floor(Math.random() * this.availableLetters.length);
    const randomLetter = this.availableLetters[randomIndex];
    
    this.currentLetter = randomLetter;
    
    // Mostrar letra na tela
    const letterObj = this.alphabet.find(l => l.letter === randomLetter);
    if (letterObj) {
      letterObj.state = 'visible';
    }
  }

  private handleSpeechResult(transcript: string) {
    if (!this.currentLetter || this.isProcessingResult) return;
    
    this.isProcessingResult = true;
    
    // Verificar se a letra falada corresponde
    // Aceita tanto a letra isolada quanto com "letra" ou "é [letra]"
    const cleanedTranscript = transcript.replace(/LETRA\s*/g, '').replace(/É\s*/g, '');
    
    if (cleanedTranscript.includes(this.currentLetter)) {
      // Acertou!
      this.feedback = 'correct';
      this.revealedLetter = this.currentLetter;
      
      const letterObj = this.alphabet.find(l => l.letter === this.currentLetter);
      if (letterObj) {
        letterObj.state = 'correct';
      }
      
      // Remover da lista de disponíveis
      this.availableLetters = this.availableLetters.filter(l => l !== this.currentLetter);
      
      // Mostrar efeito de revelação
      setTimeout(() => {
        this.feedback = 'none';
        this.currentLetter = null;
        this.showReveal = true;
      }, 1000);
      
      // Mostrar próxima letra após revelação
      setTimeout(() => {
        this.showReveal = false;
        this.revealedLetter = null;
        this.showRandomLetter();
      }, 2500);
    } else {
      // Errou!
      this.feedback = 'wrong';
      
      setTimeout(() => {
        this.feedback = 'none';
      }, 1000);
    }
    
    this.isProcessingResult = false;
  }

  getCardColor(letter: Letter): string {
    if (letter.state === 'correct') {
      return '';
    }
    
    // Atribuir cores diferentes para cada letra
    return this.colors[letter.id % this.colors.length];
  }

  speakLetter(letter: string) {
    if (!letter) return;
    
    // Verificar se Speech Synthesis está disponível
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(letter.toUpperCase());
      utterance.lang = 'pt-BR';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  }
}
