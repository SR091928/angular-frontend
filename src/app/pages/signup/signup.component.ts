import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  countries = [{ name: 'India', code: '+91', phoneLength: 10 }];
  states: string[] = [];
  cities: string[] = [];
  selectedCountry = this.countries[0];

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.form = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        address: [''],
        country: ['India', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.fetchStates(this.selectedCountry.name);
  }

  onCountryChange(): void {
    const country = this.form.get('country')?.value;
    if (country) {
      this.fetchStates(country);
      this.form.patchValue({ state: '', city: '' });
      this.form.get('state')?.markAsUntouched();
      this.form.get('city')?.markAsUntouched();
    }
  }

  onStateChange(): void {
    const country = this.form.get('country')?.value;
    const state = this.form.get('state')?.value;
    if (country && state) {
      this.fetchCities(country, state);
      this.form.patchValue({ city: '' });
      this.form.get('city')?.markAsUntouched();
    }
  }

  fetchStates(country: string): void {
    this.http
      .post<any>('https://countriesnow.space/api/v0.1/countries/states', { country })
      .subscribe({
        next: (res) => {
          this.states = (res.data.states || [])
            .map((s: any) => s.name)
            .sort((a: string, b: string) => a.localeCompare(b));
        },
        error: (err) => console.error('Error fetching states', err),
      });
  }

  fetchCities(country: string, state: string): void {
    this.http
      .post<any>('https://countriesnow.space/api/v0.1/countries/state/cities', {
        country,
        state,
      })
      .subscribe({
        next: (res) => {
          this.cities = (res.data || []).sort((a: string, b: string) =>
            a.localeCompare(b)
          );
        },
        error: (err) => console.error('Error fetching cities', err),
      });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  goBack(): void {
    this.router.navigate(['/welcome']);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form data:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
