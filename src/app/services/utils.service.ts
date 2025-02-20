import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  modal$ = new BehaviorSubject<boolean>(false);
  login$ = new BehaviorSubject<{isActive:boolean, keywordLogin:string}>({isActive:false, keywordLogin:'Iniciar sesión'});

  isModelOpen(){
    return this.modal$.asObservable();
  }

  isLogin(){
    return this.login$.asObservable();
  }
  setIsModalOpen(bol:boolean){
    this.modal$.next(bol);
  }

  setIsLogin(obj:{isActive:boolean, keywordLogin:string}){
    this.login$.next(obj);
  }
}
