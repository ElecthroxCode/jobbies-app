import { HttpInterceptorFn } from '@angular/common/http';
import { UrlCodec } from '@angular/common/upgrade';
import { Injectable } from '@angular/core';


function cleanUrl(url:string){
  return url.replace('protec_', '');
}

export const jwtAuthInterceptor: HttpInterceptorFn = (req, next) => {

  if(req.url.includes('protec_')){
    const requestClone = req.clone({url:cleanUrl(req.url)})
    console.log("estoy adentr ode cleanUrl");
    return next(requestClone);
  }
  
  const token = localStorage.getItem('token');
  console.log('Token con comillas:', `"${token}"`);
  if(token){
    const header = req.headers.set('Authorization', token);
    const requestClone = req.clone({headers:header});
    console.log('Headers modificados:', requestClone.headers);
    return next(requestClone);
  }
 
  return next(req);
};