import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { Route, Router } from '@angular/router';

interface data {
  name: String,
  password: String
}

interface signUp{
  name: String,
  email: String,
  password: String
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
constructor(private http: HttpClient, private api: ApiServiceService, private route: Router){
  this.loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })
  this.registerForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })
}
loginForm!: FormGroup;
registerForm!: FormGroup;
isRegister: boolean = false;

ngOnInit(): void {
  this.api.token.subscribe(res=>{
    // if(res != ''){
    //   this.route.navigate(['/home'])
    // }
  })
}

changeStatus(){
  this.isRegister = !this.isRegister;
}
showMessage: string = '';
loginSubmit(){
  let data = this.loginForm.value;
  if(data.userName != '' && data.password !=''){
    // console.log(data);
    var payload: data;
    payload = {name: data.userName, password: data.password};
    this.api.getLogin(payload).subscribe(res=>{
      // let {result, token} = res;
      if(res.result == 'success'){
        this.api.token.next(res['token']);
        this.api.user.next(res['data']['message'])
        localStorage.setItem('token', res['token']);
        localStorage.setItem('user', res['data']['message']);
        setTimeout(()=>{
          this.route.navigate(['/home'])
        })
      }
      else{
        this.showMessage = res.error;
        this.loginForm.reset();
      }
      // console.log('success');
    })
  }
}

registerSubmit(){
  let data = this.registerForm.value;
  if(data.userName != '' && data.email !='' && data.password !=''){
    // console.log(data);
    var payload1: signUp;
    payload1 = {name: data.userName, email: data.email, password: data.password};
    this.api.getSignup(payload1).subscribe(res=>{
      console.log(res['message']);
      if(res.result != 'fail'){
        this.isRegister = !this.isRegister;
      }
      this.registerForm.reset();
    })
    // console.log(payload1)
  }
}


}
