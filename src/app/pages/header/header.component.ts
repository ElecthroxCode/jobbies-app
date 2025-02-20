import { Component, inject, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  private _isLoginActiveService = inject(UtilsService);
  private routerNav = inject(Router);
   
  
  isShowFormRegister!:boolean;
  isLoginActive = true;
  keyWordLoginNav = '';
  ngOnInit(): void {
    this.playWords();
    this._isLoginActiveService.login$.subscribe(
      {
        next: (st) => this.isShowFormRegister = st.isActive
      }
    );
   
  }

  words = ["backend", "fronted", "de datos", "android", "IOS", "flutter"];
  text = 'desarrollador '
  phrase:string = '';
  index:number = 0;

  playWords():void{
    setInterval(()=>{
      this.phrase = this.text + this.words[this.index];
      this.index = (this.index+1) % this.words.length;
      
    }, 2500);

  }

  showlogin():void{
    
    this.routerNav.navigate(['/register']);
    if(!this.isShowFormRegister){
      
      this.isShowFormRegister = true;
      this.keyWordLoginNav = 'Registrarse';
      this._isLoginActiveService.setIsLogin({isActive:this.isShowFormRegister, keywordLogin:this.keyWordLoginNav});
     
      return;
    }

    this._isLoginActiveService.setIsLogin({isActive:true, keywordLogin:'Registrarse'});

  }

}
