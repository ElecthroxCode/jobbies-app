import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthLoginService } from './auth-login.service';
import { User } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly athService = inject(AuthLoginService);
  //private readonly keyWord= "protec_";
  private readonly URL_USERS= "http://localhost:8080/api/users";
  
  constructor(){
    this.username = this.athService.getUserameLocalStorage();
    console.log('username desde service user:', this.username);
    
  }
  
username:string | null;

  getUser(username:string):Observable<User>{
    return this.http.get<User>(`${this.URL_USERS}?email=${username}`);
  }



}
