import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

declare const google: any; // For Google Identity Services cleanup

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHeader = true;
  showFooter = true;
  hideLogo = false;

  private debounceTimer: any = null;
  private initialLoad = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;

        // --- ROUTE CONFIGS ---
        const hideHeaderRoutes = ['/welcome'];
        const hideFooterRoutes = ['/welcome', '/login', '/signup', '/forgot-password'];
        const hideLogoRoutes   = ['/welcome', '/login', '/signup', '/forgot-password'];

        // --- HEADER VISIBILITY ---
        const shouldHideHeader = hideHeaderRoutes.some(route => currentUrl.startsWith(route));
        this.showHeader = !shouldHideHeader;

        // --- FOOTER VISIBILITY ---
        const shouldHideFooter = hideFooterRoutes.some(route => currentUrl.startsWith(route));
        this.showFooter = !shouldHideFooter;

        // --- LOGO VISIBILITY ---
        const shouldHideLogo = hideLogoRoutes.some(route => currentUrl.startsWith(route));
        this.hideLogo = shouldHideLogo;

        // --- Reset scroll on route change ---
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // --- Debounced session clear for welcome ---
        if (this.initialLoad) this.initialLoad = false;
        if (currentUrl.startsWith('/welcome')) {
          if (this.debounceTimer) clearTimeout(this.debounceTimer);
          this.debounceTimer = setTimeout(() => this.clearSessions(), 200);
        }
      }
    });
  }

  private async clearSessions() {
    try {
      console.log('🧹 Clearing sessions...');

      // Clear local/session storage
      localStorage.clear();
      sessionStorage.clear();

      // Disable Google auto sign-in (new API)
      if (typeof google !== 'undefined' && google.accounts?.id) {
        google.accounts.id.disableAutoSelect();
      }

      // Handle legacy gapi sign-out (if present)
      if ((window as any).gapi?.auth2) {
        const auth2 = (window as any).gapi.auth2.getAuthInstance();
        if (auth2) {
          await auth2.signOut();
          await auth2.disconnect();
        }
      }

      console.log('✅ Sessions cleared successfully');
    } catch (error) {
      console.warn('⚠️ Session clear error:', error);
    }
  }
}
