import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  fromPage: string = 'welcome'; // default fallback

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get source page from query params
    this.route.queryParams.subscribe(params => {
      if (params['from']) {
        this.fromPage = params['from'];
      }
    });

    this.form = this.fb.group(
      {
        username: [
          '',
          [Validators.required, Validators.pattern(/^[\w.%+-]+@(gmail|google|yahoo)\.com$/)],
        ],
        password: [
          '',
          [Validators.required, Validators.pattern(/^[A-Za-z\d@$!%*?&]{8,16}$/)],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    alert(`${this.form.value.username} signed up successfully! Redirecting to Login...`);
    setTimeout(() => this.router.navigate(['/login']), 5000);
  }

  backToPrevious() {
    if (this.fromPage === 'login') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/welcome']);
    }
  }
}
