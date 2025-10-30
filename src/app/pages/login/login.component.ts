import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form;
  // simple boolean used by the template binding
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
    userId: ['', Validators.required],
    password: ['', Validators.required],
  });
  }

  // Called from checkbox change event
  onShowPasswordChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.showPassword = !!input.checked;
    // debug - remove later if you want
    console.log('Show password toggled:', this.showPassword);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Temporary behavior - navigate back to welcome for now
    console.log('Login submitted:', this.form.value);
    this.router.navigate(['/welcome']);
  }

  goBack() {
    this.router.navigate(['/welcome']);
  }
}
