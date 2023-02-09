import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, take, tap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private token:string = '';
  nickname: string = '';
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  errorMessage: string = ''

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http
      .post(`${this.apiUrl}/login`, body, { headers })
      .pipe(tap((res: any) => {
        if(res.token) {
          localStorage.setItem('token', res.token);
          this.token = res.token;
          this.nickname = body.username;
          this.isLoggedIn.next(true);
        }
      }),
      catchError((error) => {
          this.errorMessage = error.error.message;
          return this.errorMessage
      }),
      take(1) //Se você precisa evitar que o código dentro do tap seja executado mais de uma vez, pode considerar usar o take(1) para finalizar o seu stream após a primeira transmissão de dados.
      );
  }

  register(username: string, email: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, email, password };

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
