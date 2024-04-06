import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


const apiUrl = "https://sportb.onrender.com";
var header = new HttpHeaders()

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService implements OnInit {
  token = new BehaviorSubject<any>(localStorage.getItem('token'));
  user = new BehaviorSubject<any>('');
  tokenNew:any = '';

  ngOnInit(): void {
    this.token.subscribe(res=> {
      this.tokenNew = res;
      header.set('Authorization', this.tokenNew);
    })
  }

  constructor(private http: HttpClient) {
   }
   getLogin(data:any):Observable<any>{
    return this.http.post(`${apiUrl}/sign`, data);
   }
   getSignup(data:any):Observable<any>{
    return this.http.post(`${apiUrl}/user`, data);
   }
   getData():Observable<any>{
    return this.http.get(`${apiUrl}/getAllNotes`)
   }
   addPost(data:object):Observable<any>{
    return this.http.post(`${apiUrl}/createNte`, data)
   }
   delPost(id:any):Observable<any>{
    return this.http.post(`${apiUrl}/del`, id)
   }
}
