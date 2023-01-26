import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private token:string = '';
  nickname: string = '';
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(user_name: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { user_name, password };

    return this.http
      .post(`${this.apiUrl}/login`, body, { headers })
      .pipe(tap((res: any) => {
        if(res.token) {
          localStorage.setItem('token', res.token);
          this.token = res.token;
          this.nickname = body.user_name;
          this.isLoggedIn.next(true);
        }
      }));
  }

  register(user_name: string, email: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { user_name, email, password };

    return this.http
      .post(`${this.apiUrl}/register`, body, { headers })
      .pipe(
        tap((res: any) => {
          if(res.token) {
            this.token = res.token;
            localStorage.setItem('token', this.token);
          }
        })
        );
      }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): any {
    return this.token;
  }

  getLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }
}
