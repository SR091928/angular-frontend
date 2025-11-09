import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GoogleAuthService } from '../../services/google-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  username_error: string = '';

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private googleAuth = inject(GoogleAuthService);
  constructor() { }

  ngOnInit() {
    this.username_error = 'Invalid format. Allowed: A-Z, a-z, 0-9, _ or email ending with @gmail.com, @google.com, or @yahoo.com.';
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^([\w]+|[\w.%+-]+(gmail\.com|google\.com|yahoo\.com))$/
          )
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9_@#$%^&*()]{8,}$/)
        ]
      ]

    });

    setTimeout(() => this.googleAuth.initializeSignInButton('googleSignInButton'), 500);
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('✅ Login successful:', this.loginForm.value);
      this.router.navigate(['/home']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  goBack() {
    this.router.navigate(['/welcome']);
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
