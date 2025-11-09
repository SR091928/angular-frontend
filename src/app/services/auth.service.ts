import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  // ✅ BehaviorSubject to hold token in memory only
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  private http = inject(HttpClient);
  constructor() {}

  // -------- AUTH CALLS -------- //
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  signup(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, data);
  }

  // -------- TOKEN HANDLING -------- //
  setToken(token: string): void {
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  clearToken(): void {
    this.tokenSubject.next(null);
  }

  // -------- API CALL USING TOKEN -------- //
  getProtectedData(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/protected`, { headers });
  }
}
