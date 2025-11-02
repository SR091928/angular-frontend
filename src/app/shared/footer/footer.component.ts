import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private router: Router) {}

  shouldShowFooter(): boolean {
    const hideFor = ['/welcome', '/login', '/signup', '/forgot-password' , '/'];
    const url = this.router.url.split('?')[0];
    return !hideFor.includes(url);
  }
}
