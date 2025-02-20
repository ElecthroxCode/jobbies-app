import { Component, inject, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-card-job',
  imports: [],
  templateUrl: './card-job.component.html',
  styleUrl: './card-job.component.scss'
})
export class CardJobComponent implements OnInit{
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
