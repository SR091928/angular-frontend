import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public router: Router) {}

  shouldShowHeader(): boolean {
    // Hide header on specific routes
    const hideFor = ['/welcome', '/login', '/signup', '/']; // add more if needed
    const url = this.router.url.split('?')[0];
    return !hideFor.includes(url);
  }
}
