import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SocialAuthService } from '@abacritt/angularx-social-login';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private clientId = '548767737425-0861m88rauo1nvrbbj9nh3dvrgaqs236.apps.googleusercontent.com';
  user$ = new BehaviorSubject<{ name: string } | null>(null);

  private router = inject(Router);
  private zone = inject(NgZone);
  private socialAuth = inject(SocialAuthService);
  constructor() { }

  /**
   * Initializes Google One Tap and Sign-In Button
   */
  initializeSignInButton(elementId: string) {
    // Ensure the Google Identity script has loaded
    if (typeof google === 'undefined' || !google.accounts) {
      console.error('❌ Google Identity Services SDK not found.');
      return;
    }

    // Initialize client
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    // Render button
    google.accounts.id.renderButton(
      document.getElementById(elementId),
      {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        width: 300,
        shape: 'pill'
      }
    );

  }

  /**
   * Handles credential from Google after login
   */
  private handleCredentialResponse(response: any) {
    try {
      const decoded = this.decodeJwt(response.credential);
      if (decoded && decoded.name) {
        const displayName = decoded.name;

        // Update user observable
        this.user$.next({ name: displayName });

        // Navigate to home within Angular zone
        this.zone.run(() => {
          this.router.navigate(['/home']);
        });
      } else {
        console.error('❌ Invalid JWT received from Google');
      }
    } catch (err) {
      console.error('❌ Error parsing Google credential:', err);
    }
  }

  /**
   * Decode the JWT payload safely
   */
  private decodeJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  /**
   * Logout user (clears local state)
   */
  logout() {
    localStorage.clear();
    sessionStorage.clear();

    // 2️⃣ Sign out from Google (SDK + session)
    this.socialAuth.signOut(true).then(() => {
      this.user$.next(null);
      google.accounts.id.disableAutoSelect();
    });
  }
}
