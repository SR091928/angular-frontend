
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  contactForm: FormGroup;
  fileError = '';
  attachedFile: File | null = null;

  emailValidation = `Please enter a valid email (letters, numbers, @, . allowed).`;
  // name: letters, spaces, comma
  namePattern = '^[A-Za-z ,]+$';
  // email: letters, numbers, @, .
  emailPattern = '^[A-Za-z0-9@.]+$';

  constructor(private fb: FormBuilder, private router: Router) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      issue: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  onFileChange(event: any) {
    const file: File = event.target.files && event.target.files[0];
    if (file) {
      const mime = file.type.toLowerCase();
      if (mime !== 'image/jpeg' && mime !== 'image/jpg') {
        this.fileError = 'Only JPEG images are allowed';
        this.attachedFile = null;
        event.target.value = '';
      } else {
        this.fileError = '';
        this.attachedFile = file;
      }
    } else {
      this.fileError = '';
      this.attachedFile = null;
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    if (this.contactForm.valid && !this.fileError) {
      // TODO: send to backend/email later
      console.log('Submitting form', this.contactForm.value);
      this.router.navigate(['/home']);
    } else {
      Object.values(this.contactForm.controls).forEach(control => control.markAsTouched());
    }
  }
}
