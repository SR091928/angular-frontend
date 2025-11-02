import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAuthService } from '../../services/google-auth.service';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  googleAuth = inject(GoogleAuthService);
  router = inject(Router);

  logout() {
    this.googleAuth.clear();
    this.router.navigate(['/welcome']);
  }
}
