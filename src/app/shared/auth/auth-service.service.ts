import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/';
  private token = null;

  constructor(private http: HttpClient) {}

  login(user_name: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { user_name, password };

    return this.http
      .post(`${this.apiUrl}/login`, body, { headers })
      .pipe(tap((res: any) => this.token = res.token));
  }

  register(user_name: string, email: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { user_name, email, password };

    return this.http
      .post(`${this.apiUrl}/register`, body, { headers })
      .pipe(tap((res: any) => this.token = res.token));
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): any {
    return this.token;
  }
}
