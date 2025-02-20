import { Component, inject, OnInit } from '@angular/core';
import { CardJobComponent } from '../card-job/card-job.component';
import { UtilsService } from '../../services/utils.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CardJobComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  private _modalShow$ = inject(UtilsService);
  showModal!:boolean;
  dataRegister = {};
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
