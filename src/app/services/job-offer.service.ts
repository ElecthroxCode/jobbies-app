import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Job } from '../models/user-model';
import { JobsPage } from '../models/jobs-page-model';

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {

 private http = inject(HttpClient);
 
  private keyWorld = 'protec_';
 private URL_JOBS = `${this.keyWorld}http://localhost:8080/api`;
 
// http://localhost:8080/api/67c2227fc8e80f10d7ef0d21/jobs?id=
// http://localhost:8080/api/67c2227fc8e80f10d7ef0d21/jobs?page=0&size=2

headers = new HttpHeaders({
  'Content-Type': 'application/json'
});
  createJobOffer(job:Job, idUser:string):Observable<Job>{
    return this.http.post<Job>(`${this.URL_JOBS}/${idUser}/jobs`, job, { headers:this.headers });
  }

  updateJobOffer(job:Job, idUser:string, idJob:string):Observable<Job>{
    return this.http.put<Job>(`${this.URL_JOBS}/${idUser}/jobs/${idJob}`, job, { headers:this.headers });
  }

  getJobOfferPage(idUser:string, page=0, size=10):Observable<Job[]>{
    return this.http.get<JobsPage>(`${this.URL_JOBS}/${idUser}/jobs?page=${page}&size=${size}`,
       { headers:this.headers }).pipe(
          map((resp:JobsPage) => resp.content)
    );
  }


 

}
