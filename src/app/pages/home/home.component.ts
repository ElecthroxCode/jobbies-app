import { Component, inject, OnInit } from '@angular/core';
import { CardJobComponent } from '../card-job/card-job.component';
import { UtilsService } from '../../services/utils.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthLoginService } from '../../services/auth-login.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-home',
  imports: [CardJobComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  //private _loginService = inject(AuthLoginService);
  private _userService = inject(UsersService);
  private _modalShow$ = inject(UtilsService);
  showModal!:boolean;

  nameUser:string | null = null;
  dataRegister = {};
  user?:User;
  name = new FormControl('', );
  rol = new FormControl('', );
  url = new FormControl('', );
  status = new FormControl('', );
  formRegister = new FormGroup(
    {
      nameCompany:this.name,
      rol:this.rol,
      url:this.url,
      status:this.status
    }
  );
 

  registerSubmit():void{
    if(this.formRegister.valid){
      this.dataRegister = this.formRegister.value;
      console.log(this.dataRegister);
      this.formRegister.reset();
    }
  }

  ngOnInit(): void {
    this._modalShow$.isModelOpen().subscribe(
      {
        next: (res) => this.showModal = res,
        error: (e) => console.error("Se ha generado un error:", e)  
      }
    );

    this.nameUser = this._userService.username;
    if(this.nameUser != null){
      this._userService.getUser(this.nameUser).subscribe({
        next: user => {
          this.user = user;
          console.log(user);
        },
        error: e =>{
          console.error("Se ha generado un error obtener datos del usuario:", e);
          throw e;
        }
      });
    }
    
  }
  

  toggleBtnShow(){

    if(!this.showModal){
      this.showModal = true;
      this._modalShow$.setIsModalOpen(this.showModal);
      return;
    }
    this.showModal = false;
    this._modalShow$.setIsModalOpen(this.showModal);
  }
  
 
  

}
