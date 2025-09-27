import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ContactUsComponent } from './contact-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HomeComponent } from '../home/home.component';

describe('ContactUsComponent (standalone)', () => {
  let fixture: ComponentFixture<ContactUsComponent>;
  let component: ContactUsComponent;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUsComponent, ReactiveFormsModule, HomeComponent],
      providers: [
        provideRouter([
          { path: 'home', component: HomeComponent },
          { path: '**', redirectTo: 'home' },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid initially', () => {
    expect(component.contactForm.valid).toBeFalsy();
  });

  it('should accept valid name with spaces and comma', () => {
    component.contactForm.controls['name'].setValue('John Doe, Jr');
    expect(component.contactForm.controls['name'].valid).toBeTruthy();
  });

  it('should reject invalid email', () => {
    component.contactForm.controls['email'].setValue('invalid-email');
    expect(component.contactForm.controls['email'].valid).toBeFalsy();
  });

  it('should enforce issue max length', () => {
    const longText = 'a'.repeat(1001);
    component.contactForm.controls['issue'].setValue(longText);
    expect(component.contactForm.controls['issue'].valid).toBeFalsy();
  });

  it('should navigate back to home on back button', async () => {
    const backButton: HTMLButtonElement = fixture.nativeElement.querySelector('button.back');
    backButton.click();
    await fixture.whenStable();

    expect(location.path()).toBe('/home');
  });

  it('should submit valid form and redirect to home', async () => {
    component.contactForm.setValue({
      name: 'Jane Doe',
      email: 'jane@example.com',
      issue: 'Test issue',
    });

    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button.submit');
    submitButton.click();
    await fixture.whenStable();

    expect(component.contactForm.valid).toBeTruthy();
    expect(location.path()).toBe('/home');
  });
});
