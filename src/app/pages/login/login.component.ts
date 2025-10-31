import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'carbon-components-angular/button';
import { InputModule } from 'carbon-components-angular/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('✅ Login successful:', this.form.value);
      // handle login logic here
    } else {
      this.form.markAllAsTouched();
    }
  }

  goBack(): void {
    this.router.navigate(['/welcome']);
  }
}
