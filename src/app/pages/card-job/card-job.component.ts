import { Component, EventEmitter, inject, input, Input, OnInit, output, Output } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { Job } from '../../models/user-model';

@Component({
  selector: 'app-card-job',
  imports: [],
  templateUrl: './card-job.component.html',
  styleUrl: './card-job.component.scss'
})
export class CardJobComponent implements OnInit{


  job = input.required<Job>();
  editJob = output<boolean>();

  private _isModal$ = inject(UtilsService);
  showModal!:boolean;

 ngOnInit(): void {
   this._isModal$.isModelOpen().subscribe(
    {
      next: (res) => this.showModal = res,
      error: (e) => console.error("Se ha generado un error:", e)
    }
   );
 }


 btnEdit(){
  if(this.job() != null){
   
    this._isModal$.setEditState(this.job());
    this.editJob.emit(true);
  }
  if(!this.showModal){
    this.showModal = true;
    this._isModal$.setIsModalOpen(this.showModal);
    return;
  }
  
  this.showModal = false;
  this._isModal$.setIsModalOpen(this.showModal);
 }
 


 changeColorStatus(status:string){
  if(status.toLocaleLowerCase() == 'aplicado'){
    return '#72d672';
  }
  if(status.toLocaleLowerCase() == 'en proceso'){
    return '#ffff81';
  }
  return '#ffaf8f';
}

}
