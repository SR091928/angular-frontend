import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

declare const google: any;

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  initialize(): void {
    if (!(window as any).google || !(google.accounts && google.accounts.id)) {
      console.warn('Google Identity script not yet loaded.');
      return;
    }

    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.handleCredentialResponse(response),
    });
  }

  renderButton(elementId: string): void {
    const el = document.getElementById(elementId);
    if (!el) return;
    google.accounts.id.renderButton(el, {
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      shape: 'pill',
      logo_alignment: 'left',
      width: 300,
    });
  }

  private handleCredentialResponse(response: any): void {
    // You can send this JWT to your backend for verification.
    const jwt = response.credential;
    this.tokenSubject.next(jwt);
    console.log('Google JWT received:', jwt);
  }

  clear(): void {
    this.tokenSubject.next(null);
  }
}
