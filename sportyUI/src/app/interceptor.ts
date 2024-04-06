import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
  } from "@angular/common/http";
  import { Observable } from "rxjs";
  import { Injectable, OnInit } from "@angular/core";
import { ApiServiceService } from "./api-service.service";
 
//   import { environment } from '../../environments/environment';
 
  @Injectable()
  export class InterceptorService implements HttpInterceptor, OnInit {

    constructor(private api: ApiServiceService){}
    token:any = undefined;
    ngOnInit(): void {
        // this.api.token.subscribe(res=>{
        //     this.token = res;
        // })
    }
   
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.api.token.subscribe(res=>{
            this.token = res;
        })
        // const token =  localStorage.getItem("currentUser") && localStorage.getItem("currentUser")!=null ? localStorage.getItem("currentUser") :'';
        if(this.token){
            req = req.clone({
                headers: req.headers.set(
                    "Authorization",
                    this.token  
                ),
                // url: environment.apiBaseUrl + req.url
                });
        }
        else{
            req = req.clone({
                // headers: req.headers.set(
                //     "Authorization",
                //     this.token  
                // ),
                // url: environment.apiBaseUrl + req.url
                });
        } 
      return next.handle(req);
    }
  }