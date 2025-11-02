import { Component, AfterViewInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GoogleAuthService } from '../../services/google-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  googleAuth = inject(GoogleAuthService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  ngAfterViewInit(): void {
    this.googleAuth.initialize();
    this.googleAuth.renderButton('googleSignInButton');
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    console.log('Logging in with form values:', this.loginForm.value);
    // Perform API call here...
    this.router.navigate(['/home']);
  }

  back(): void {
    this.router.navigate(['/welcome']);
  }

  forgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
