import { Component, inject, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { platformBrowser } from '@angular/platform-browser';
import { AuthLoginService } from '../../services/auth-login.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login, LoginResponse } from '../../models/login-model';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private _isLoginActiveService = inject(UtilsService);
  private _activatedRoute = inject(ActivatedRoute);
  private _authService = inject(AuthLoginService);

//login 
  formLogin!:FormGroup;

  userLogin:FormControl;
  passLogin:FormControl;
  constructor(){
    this.userLogin = new FormControl('', Validators.required);
    this.passLogin = new FormControl('', Validators.required);

    this.formLogin = new FormGroup({
      userLogin:this.userLogin,
      passLogin:this.passLogin
    });
    
  }

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
  
 //LOGIN 
  loginResp!:LoginResponse;
  loginSubmit(){
    const userLoginControl = this.formLogin.get('userLogin');
    const passLoginControl = this.formLogin.get('passLogin');
   
    if(this.formLogin.valid && userLoginControl && passLoginControl){
      alert("holaaa");
      const loginUser:Login = {username:userLoginControl.value, password:passLoginControl.value};
      this._authService.login(loginUser).subscribe({
        next: data => {
          this._authService.setToken(data.jwt);
          this._authService.setUsername(data.username);
          this._authService.redirectToHome();
        },
        error: e => {
          console.error("Se ha generador un error a iniciar sesión.", e);
          throw e;
        }
      });
      
      
    }
  }


}
