// src/app/pages/login/login.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleAuthService } from '../../services/google-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  googleAuth = inject(GoogleAuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  ngOnInit(): void {
    // Ensure script tag is added
    this.googleAuth.initialize();

    // Render the button (this will wait for the script if needed)
    this.googleAuth.renderButton('google-btn');
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Mock success: take name from email local part and navigate to /home
    const email = this.loginForm.value.email || '';
    const name = email.split('@')[0] || 'User';
    this.googleAuth.user$.next({ name });
    this.router.navigate(['/home']);
  }

  onBack(): void {
    this.router.navigate(['/welcome']);
  }
}
