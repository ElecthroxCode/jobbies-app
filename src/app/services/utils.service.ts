import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Job } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  modal$ = new BehaviorSubject<boolean>(false);
  login$ = new BehaviorSubject<{isActive:boolean, keywordLogin:string}>({isActive:false, keywordLogin:'Iniciar sesión'});
  private _editState$ = new BehaviorSubject<{jobOffer:Job | null; isEdit:boolean}>({
    jobOffer:null,
    isEdit:false
  });

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

  setEditState(job:Job){
    this._editState$.next({jobOffer:job, isEdit:true});
  }

  getEditState():Observable<{jobOffer:Job | null, isEdit:boolean}>{
    return this._editState$.asObservable();
  }

  deleteEditState(){
    this._editState$.next({jobOffer:null, isEdit:false});
  }

  

}
