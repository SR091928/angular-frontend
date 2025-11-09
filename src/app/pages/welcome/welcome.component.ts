import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'carbon-components-angular';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  private router = inject(Router);
  constructor() {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
