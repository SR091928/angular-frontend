import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleAuthService } from '../../services/google-auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
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

  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get username() { return this.signupForm.get('username'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }
  get dob() { return this.signupForm.get('dob'); }
  get countryCode() { return this.signupForm.get('countryCode'); }
  get mobile() { return this.signupForm.get('mobile'); }
  get email() { return this.signupForm.get('email'); }
  get address() { return this.signupForm.get('address'); }

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: [
          '',
          [
            Validators.required,
            // ✅ 8+ chars, allowed characters only
            Validators.pattern(/^[A-Za-z0-9_@#$%^&*()]{8,}$/)
          ]
        ],
        confirmPassword: ['', Validators.required],
        dob: ['', Validators.required],
        countryCode: ['+91', Validators.required],
        mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        email: ['', [Validators.email]],
        address: ['']
      },
      { validators: this.passwordMatchValidator } // ✅ add custom validator
    );

    // Initialize Google Sign-In button
    setTimeout(() => this.googleAuth.initializeSignInButton('googleSignInButton'), 500);
  }

  // ✅ Password match validation
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // ✅ Form submission
  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('✅ Signup form data:', this.signupForm.value);
      // You can call your backend API here.
      this.router.navigate(['/login']);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  // ✅ Back to welcome page
  goBack(): void {
    this.router.navigate(['/welcome']);
  }
}
