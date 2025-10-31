import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome-modal.component.html',
  styleUrl: './welcome-modal.component.css'
})
export class WelcomeModalComponent {
  showModal = true;

  closeModal() {
    this.showModal = false;
    localStorage.setItem('hasSeenWelcome', 'true');
  }
}
