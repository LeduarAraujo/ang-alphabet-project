import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeModalComponent } from './welcome-modal/welcome-modal.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, WelcomeModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ang-alphabet-project';
  showWelcomeModal = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Verificar na inicialização
    if (this.router.url === '/') {
      localStorage.removeItem('hasSeenWelcome');
      this.showWelcomeModal = true;
    }

    // Verificar nas mudanças de rota
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Mostrar modal apenas na rota raiz '/'
      if (event.url === '/') {
        localStorage.removeItem('hasSeenWelcome');
        this.showWelcomeModal = true;
      } else {
        this.showWelcomeModal = false;
      }
    });
  }

  closeWelcomeModal() {
    this.showWelcomeModal = false;
  }
}
