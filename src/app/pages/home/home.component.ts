import { Component, inject, OnInit } from '@angular/core';
import { CardJobComponent } from '../card-job/card-job.component';
import { UtilsService } from '../../services/utils.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthLoginService } from '../../services/auth-login.service';
import { UsersService } from '../../services/users.service';
import { Job, User } from '../../models/user-model';
import { JobOfferService } from '../../services/job-offer.service';
import { Router } from '@angular/router';

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
  private _jobService = inject(JobOfferService);
  private _router = inject(Router);
  showModal!:boolean;
  jobOffer?:Job | null;
  nameUser:string | null = null;
  isEdit:boolean = false;
  jobs:Job[] = [];

  dataRegister = {};
  user?:User;
  name = new FormControl('', );
  rol = new FormControl('', );
  url = new FormControl('', );
  status = new FormControl('', );
  date = new FormControl<Date | null>(null, Validators.required);
  formRegister = new FormGroup(
    {
      nameCompany:this.name,
      rolJob:this.rol,
      url:this.url,
      status:this.status,
      date:this.date
    }
  );
  
  
  editForm(b:boolean){
  
    if(b && this.jobOffer){
      this.formRegister.patchValue({
        nameCompany: this.jobOffer.nameCompany,
        rolJob: this.jobOffer.rolJob,
        url: this.jobOffer.url,
        status: this.jobOffer.status,
        date:this.jobOffer.date
      });
    }
  }

  registerSubmit():void{
    let job:Job | null = null;
    if(this.formRegister.valid && !this.isEdit){
     job  = this.formRegister.value as Job;
      console.log('estamos en modo agregar un job', job);
      this.createJob(this.user!.id, job);
      this.getJobsPage(this.user!.id);
      this.formRegister.reset();
      
      this._router.navigate(["/"]);
    }else if(this.formRegister.valid && this.isEdit){
      job = this.formRegister.value as Job;
      job.id = this.jobOffer!.id;
      this.updateJob(job, this.user!.id, job.id!);
      
      console.log('estamos en modo editar', job);
      setTimeout(() => {
        this.toggleBtnShow();
        this._router.navigate(['/']);
      }, 500); // Retraso de 500 milisegundos (ajusta según sea necesario)
     
    }
  }
 

  ngOnInit(): void {
    this._modalShow$.isModelOpen().subscribe(
      {
        next: (res) => {
          this.showModal = res;
        },
        error: (e) => console.error("Se ha generado un error:", e)  
      }
    );

    this._modalShow$.getEditState().subscribe({
      next: objEdit =>{
        this.jobOffer = objEdit.jobOffer;
        this.isEdit = objEdit.isEdit;
      },
      error: e =>{
        console.error('Se ha generado un error al obtner el Job a editar.');
        throw e;
      }
    });

    this.nameUser = this._userService.username;
    if(this.nameUser != null){
      this._userService.getUser(this.nameUser).subscribe({
        next: user => {
          this.user = user;
          this.getJobsPage(this.user.id);
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
    this._modalShow$.setIsLogin;
    this.formRegister.reset();
    this._modalShow$.deleteEditState();
    if(!this.showModal){
      this.showModal = true;
      this._modalShow$.setIsModalOpen(this.showModal);
      return;
    }
    this.showModal = false;
    this._modalShow$.setIsModalOpen(this.showModal);
  }
  
createJob(idUser:string, job:Job){
  this._jobService.createJobOffer(job, idUser).subscribe({
    next: (job) => {
      console.log('Create job:', job);
      this.getJobsPage(idUser);
    },
    error: (error) => {
      console.error('Error create job:', error);
    }
  });

}

updateJob(job:Job, idUser:string, idJob:string){
  this._jobService.updateJobOffer(job, idUser, idJob).subscribe({
    next: (job) => {
      console.log('Update job:', job);
      this.getJobsPage(idUser);
    },
    error: (error) => {
      console.error('Error update job:', error);
    }
  });
}

getJobsPage(idUser:string){
  this._jobService.getJobOfferPage(idUser).subscribe({
    next: (jobs) => {
      this.jobs = jobs;
      console.log('Page jobs:', jobs);
    },
    error: (error) => {
      console.error('Error get jobs:', error);
    }
  });
}
  

}
