import { Component, inject, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { platformBrowser } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private _isLoginActiveService = inject(UtilsService);
  private _activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this._isLoginActiveService.isLogin().subscribe(
      {
        next: (res) => {
          this.isShowFormRegister = res.isActive;
          this.keywordLogin = res.keywordLogin;
        },
        error: (e) => console.error("Se ha generado un error:", e)
      }
    );

    
  }

  isShowFormRegister!:boolean;
  keywordLogin = '';
  keyParams = '';

  showlogin():void{
    
    if(!this.isShowFormRegister){
      
      this.isShowFormRegister = true;
      this._isLoginActiveService.setIsLogin({isActive:this.isShowFormRegister, keywordLogin:'Registrarse'});
      return;
    }

    
    this.isShowFormRegister = false;
    this._isLoginActiveService.setIsLogin({isActive:this.isShowFormRegister, keywordLogin:'Iniciar sesión'});
  }



}
