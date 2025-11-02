import { Routes } from '@angular/router';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LayoutComponent } from './shared/layout/layout.component';



export const routes: Routes = [
  // Public routes (no header/footer)
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  // Protected routes (inside layout)
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'home', component: HomeComponent },
      { path: 'contact-us', component: ContactUsComponent },
    ],
  },
  { path: '**', redirectTo: 'welcome' },
  { path: 'forgot-password', component: ForgotPasswordComponent }
];
