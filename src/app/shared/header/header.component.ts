import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

declare const google: any; // For Google Identity logout handling

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() visible: boolean = true;
  @Input() hideLogo: boolean = false;

  constructor(private router: Router) {}

  async navigateToHome() {
    try {
      // Clear app sessions
      localStorage.clear();
      sessionStorage.clear();

      // Disable Google auto sign-in (new API)
      if (typeof google !== 'undefined' && google.accounts?.id) {
        google.accounts.id.disableAutoSelect();
      }

      // Handle legacy gapi sign-out (if used)
      if ((window as any).gapi?.auth2) {
        const auth2 = (window as any).gapi.auth2.getAuthInstance();
        if (auth2) {
          await auth2.signOut();
          await auth2.disconnect();
        }
      }

      console.log('✅ Header logout: sessions cleared');
    } catch (error) {
      console.warn('⚠️ Header logout error:', error);
    }

    // Navigate to welcome page
    this.router.navigate(['/welcome']);
  }
}
