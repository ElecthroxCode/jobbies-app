import { Component, inject, Input, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { Job } from '../../models/user-model';

@Component({
  selector: 'app-card-job',
  imports: [],
  templateUrl: './card-job.component.html',
  styleUrl: './card-job.component.scss'
})
export class CardJobComponent implements OnInit{


  @Input({required:true}) job?:Job;
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
  if(!this.showModal){
    this.showModal = true;
    this._isModal$.setIsModalOpen(this.showModal);
    return;
  }
  this.showModal = false;
  this._isModal$.setIsModalOpen(this.showModal);
 }
 




}
