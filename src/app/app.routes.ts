import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { NotFoundComponent } from '../not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: '**', component: NotFoundComponent }
];
