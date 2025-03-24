import { HttpInterceptorFn } from '@angular/common/http';
import { UrlCodec } from '@angular/common/upgrade';
import { Injectable } from '@angular/core';


function cleanUrl(url:string){
  return url.replace('protec_', '');
}

export const jwtAuthInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.includes('protec_')) {
    const urlCleaned = cleanUrl(req.url);
    const token = localStorage.getItem('token');
    if (token && token.trim() !== '') {
      const header = req.headers.set('Authorization', `Bearer ${token}`);
      const requestClone = req.clone({ url: urlCleaned, headers: header });
      console.log('estoy dentro de cleanUrl con token:', requestClone);
      return next(requestClone);
    }
    const requestClone = req.clone({ url: urlCleaned });
    console.log('estoy dentro de cleanUrl sin token:', requestClone);
    return next(requestClone);
  }

  const token = localStorage.getItem('token');
  console.log('Token con comillas:', `"${token}"`);

  if (token && token.trim() !== '') {
    const header = req.headers.set('Authorization', `Bearer ${token}`);
    const requestClone = req.clone({ headers: header });
    console.log('Headers modificados:', requestClone.headers);
    console.log(requestClone.url);
    return next(requestClone);
  }

  return next(req);
  //--



};