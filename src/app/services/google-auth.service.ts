import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private clientId = '548767737425-0861m88rauo1nvrbbj9nh3dvrgaqs236.apps.googleusercontent.com';
  user$ = new BehaviorSubject<{ name: string } | null>(null);

  constructor(private router: Router, private zone: NgZone) {}

  /**
   * Initializes Google One Tap and Sign-In Button
   */
  initializeSignInButton(elementId: string) {
    // Ensure the Google Identity script has loaded
    if (typeof google === 'undefined' || !google.accounts) {
      console.error('❌ Google Identity Services SDK not found.');
      return;
    }

    console.log('✅ Google GSI script loaded.');

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

    console.log('✅ Google Sign-In button rendered.');
  }

  /**
   * Handles credential from Google after login
   */
  private handleCredentialResponse(response: any) {
    try {
      const decoded = this.decodeJwt(response.credential);
      if (decoded && decoded.name) {
        const displayName = decoded.name;
        console.log('✅ Google user:', displayName);

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
    this.user$.next(null);
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/welcome']);
  }
}
