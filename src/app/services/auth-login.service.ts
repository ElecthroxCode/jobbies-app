import { inject, Injectable } from '@angular/core';
import { Login, LoginResponse } from '../models/login-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  private readonly router= inject(Router);
  private readonly http = inject(HttpClient);
  private readonly URL_API_LOGIN = "http://localhost:8080/api/auth/login";
  private userName$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  
  public login(login:Login):Observable<LoginResponse>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<LoginResponse>(this.URL_API_LOGIN, login, { headers });
  }
  
  setToken(token:string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('username');
    this.userName$.next(null);
    localStorage.removeItem('token');
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
}
