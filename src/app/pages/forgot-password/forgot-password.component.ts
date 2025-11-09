import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  form: FormGroup;
  successMessage = '';

  private fb = inject(FormBuilder);
  private router = inject(Router);
  constructor() {
    this.form = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w.%+-]+@(gmail|google|yahoo)\.com$/)
        ]
      ]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.value.email;
    this.successMessage = `Password reset link sent to ${email}`;

    setTimeout(() => {
      this.successMessage = '';
      this.router.navigate(['/login']);
    }, 5000);
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
