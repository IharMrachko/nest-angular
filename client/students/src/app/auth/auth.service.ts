import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('auth-token');
  }

  public registration(user) {
    return this.http.post('http://localhost:3000/auth/registration', user);
  }

  public login(user): Observable<{token: string}> {
    return this.http.post<{token: string}>('http://localhost:3000/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token',  token);
            this.setToken(token);
          }
        )
      );
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public getToken(): string {
    return this.token;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public logout(): void {
    this.setToken(null);
    localStorage.clear();
  }
}
