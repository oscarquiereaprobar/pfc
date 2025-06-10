import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private apiUrl = 'https://desplieguedaw-hhhsfvaxa0ggardh.spaincentral-01.azurewebsites.net/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<string>(`${this.apiUrl}/login?username=${username}&password=${password}`, {})
  }

  registro(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registro`, formData);
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('id') !== null;
  }
  

  getRol(): string | null {
    return sessionStorage.getItem('rol');
  }

  setAuthenticated(userId: string): void {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('id', userId);
  }

  logout(): void {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('rol');
  }
}

