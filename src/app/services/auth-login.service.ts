import { inject, Injectable } from '@angular/core';
import { Login, LoginResponse } from '../models/login-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  private readonly router= inject(Router);
  private readonly http = inject(HttpClient);
  private readonly URL_API_LOGIN = "http://localhost:8080/api/auth/login";
  private readonly URL_API_REFRESH = "http://localhost:8080/api/auth/refresh-token";
  private userName$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  
  public login(login:Login):Observable<LoginResponse>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<LoginResponse>(this.URL_API_LOGIN, login, { headers });
  }
  
  setToken(token:string, refreshToken:string){
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('username');
    this.userName$.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/register']);
  }

  redirectToHome(){
    this.router.navigate(['/']);
  }
  setUsername(username: string){
    localStorage.setItem('username', username);
    this.userName$.next(username);
  }

  getUserameLocalStorage(){
    const name = localStorage.getItem('username');
    return name;
  }
  getUsername$(){
    return this.userName$.asObservable();
  }

  refreshTokenAuthentication(refreshToken:string):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.URL_API_REFRESH, {refreshToken:refreshToken});
  }


  private getExpirationDate(token: string): number {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000;
  }

  private startTokenRefreshTimer(accessToken: string, refreshToken: string): void {
    const expirationDate = this.getExpirationDate(accessToken);
    const now = Date.now();
    const timeLeft = expirationDate - now;

    // Renovar el token 5 minutos antes de que expire
    const refreshThreshold = 5 * 60 * 1000;

    if (timeLeft < refreshThreshold) {
      this.refreshTokens(refreshToken);
    } else {
      // Establecer un temporizador para verificar nuevamente en un minuto
      setTimeout(() => this.startTokenRefreshTimer(accessToken, refreshToken), 60000);
    }
  }

  private refreshTokens(refreshToken: string): void {
    this.refreshTokenAuthentication(refreshToken).subscribe({
      next: (data) => {
        if (data.jwt && data.refreshToken) {
          localStorage.setItem('token', data.jwt);
          localStorage.setItem('refreshToken', data.refreshToken);
          console.log('Tokens refreshed successfully');
          // Reiniciar el temporizador con los nuevos tokens
          this.startTokenRefreshTimer(data.jwt, data.refreshToken);
        } else {
          console.error('Error refreshing tokens:', data);
          this.logout(); // Redirigir al login si falla la renovación
        }
      },
      error: (error) => {
        console.error('Network error:', error);
        this.logout();
      },
    });
  }

}
