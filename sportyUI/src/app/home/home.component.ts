import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private api: ApiServiceService, private route: Router){}
  user!:any;

  notes:any = [];

  ngOnInit(): void {
      this.api.user.subscribe(res=>{
        this.user = localStorage.getItem('user');
        setTimeout(()=>{
          this.api.getData().subscribe(res=>{
            this.notes = res['data'];
          })
        },1000)
      })
  }

  logout(){
    localStorage.removeItem('token');
    this.route.navigate(['/login']); 
  }

  addPost(post: HTMLInputElement){
    console.log(post.value)
    let obj = {text: post.value}
    this.api.addPost(obj).subscribe(res=>{
      // console.log(res)
      this.api.getData().subscribe(res=>{
        this.notes = res['data'];
      })
    })
  }

  del(id:any){
    let obj = {id: id}
    this.api.delPost(obj).subscribe(res=>{
      this.api.getData().subscribe(res=>{
        this.notes = res['data'];
      })
    })
  }
}
