// src/app/services/google-auth.service.ts
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

declare global {
  interface Window { google: any; }
}
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private router = inject(Router);
  user$ = new BehaviorSubject<{ name: string } | null>(null);
  private loaded = false;
  private initialized = false;

  /**
   * Adds the GSI script to the page once.
   */
  initialize(): void {
    if (this.loaded) return;
    this.loaded = true;

    const id = 'google-identity-client';
    if (document.getElementById(id)) { this.loaded = true; return; }

    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = 'https://accounts.google.com/gsi/client';
    script.id = id;
    script.onload = () => {
      // We defer initialization until renderButton is called or the developer calls initializeSdk()
      console.debug('Google GSI script loaded.');
    };
    document.head.appendChild(script);
  }

  /**
   * Initializes google.accounts.id. Safe to call multiple times.
   */
  initSdkIfNeeded(): void {
    if (this.initialized) return;
    if (!window.google || !window.google.accounts || !window.google.accounts.id) {
      // script not loaded yet — initialize() will add script tag
      console.warn('Google GSI not ready yet. Call renderButton after script loads.');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    this.initialized = true;
    console.debug('Google GSI sdk initialized.');
  }

  /**
   * Renders the GSI button into the container with id=containerId.
   * If SDK/script isn't loaded yet it will try to initialize after onload.
   */
  renderButton(containerId: string): void {
    this.initialize();

    const tryRender = () => {
      if (!window.google || !window.google.accounts || !window.google.accounts.id) {
        // Not ready yet. Try again shortly (script might still be loading).
        setTimeout(tryRender, 200);
        return;
      }

      // initialize the sdk if not initialized
      this.initSdkIfNeeded();

      const el = document.getElementById(containerId);
      if (!el) {
        console.warn(`Google button container '${containerId}' not found.`);
        return;
      }

      // Use the official renderButton API
      window.google.accounts.id.renderButton(el, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'pill',
        width: 300
      });

      // Optionally show the One Tap prompt (disabled by default)
      // window.google.accounts.id.prompt();
    };

    tryRender();
  }

  /**
   * Handler for Google credential response. Decodes JWT, sets user and navigates to /home
   */
  private handleCredentialResponse(response: any) {
    if (!response || !response.credential) {
      console.error('No credential in Google response', response);
      return;
    }

    const user = this.decodeJwt(response.credential);
    if (!user) {
      console.error('Invalid JWT from Google');
      return;
    }

    const displayName = user.name || user.email?.split('@')[0] || 'User';
    this.user$.next({ name: displayName });

    // navigate to home
    try {
      this.router.navigate(['/home']);
    } catch (err) {
      console.warn('Router navigation failed:', err);
    }
  }

  private decodeJwt(token: string) {
    try {
      const base64 = token.split('.')[1];
      const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(json);
    } catch (err) {
      return null;
    }
  }

  clear(): void {
    this.user$.next(null);
  }
}
