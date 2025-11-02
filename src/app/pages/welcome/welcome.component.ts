import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'carbon-components-angular';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  providers: [ButtonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  constructor(private router: Router) { }

  goToLogin(): void {
    console.log('Navigating to login...');
    this.router.navigate(['/login']);
  }

  goToSignup(): void {
    console.log('Navigating to signup...');
    this.router.navigate(['/signup']);
  }
}
