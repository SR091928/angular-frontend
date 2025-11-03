import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleAuthService } from '../../services/google-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private googleAuth: GoogleAuthService
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w.%+-]+@(gmail\.com|google\.com|yahoo\.com)$/)
        ]
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z0-9_@#$%^&*()]+$/)]
      ],
      confirmPassword: ['', Validators.required]
    });

    // Initialize Google button
    setTimeout(() => this.googleAuth.initializeSignInButton('googleSignUpButton'), 500);
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  get passwordMismatch() {
    return (
      this.password?.value &&
      this.confirmPassword?.value &&
      this.password?.value !== this.confirmPassword?.value
    );
  }

  togglePassword(type: 'password' | 'confirm') {
    if (type === 'password') this.showPassword = !this.showPassword;
    else this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.signupForm.valid && !this.passwordMismatch) {
      console.log('✅ Signup successful:', this.signupForm.value);
      this.router.navigate(['/login']);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  goBack() {
    this.router.navigate(['/welcome']);
  }
}
