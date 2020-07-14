import { Component, OnInit } from '@angular/core';
import {UserService}from '../user.service';
import {User} from '../model/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { element } from 'protractor';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  hide=true;
  //get all user and store in user 
  user:any=[];
  login:any={};
  reg:any=[];
  countN=0;
  countP=0;
  model=new User();

  constructor(private userService:UserService,private route:Router) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(res=>{
      this.user=res;
      console.log('employee',this.user);
    })
  }
  // openSnackBar() {
  //   this._snackBar.open('Cannonball!!', 'End now', {
  //     duration: 500,
      // horizontalPosition: this.horizontalPosition,
      // verticalPosition: this.verticalPosition,
  //   });
  // }
  onSubmit(form:NgForm){
    this.countN=0;
    this.countP=0;
    this.login=form.value;
    console.log('login length',this.user.length);
    // console.l
  if(this.user.length!=0){
    // console.log('before for loop',this.user);
    this.user.forEach(element => {
      const name=element.Name;
      // console.log('name',name);
      const password=element.password;
      // console.log('paassword',password)
      if(name===this.login.Name)
      {
        this.countN=this.countN+1;
        if(password===this.login.password){
          this.countP=this.countP+1;

        }
      }
    });
    if(this.countN>=1&&this.countN>=1){
      this.route.navigate(['./home']);
    }
    else if(this.countN>=1 && this.countP==0){
      
        // this.openSnackBar();
      alert('invalid');
    }
    else {
      alert('invalid');
    }
  }
    // this.route.navigate(['./home']);
  //   this.userService.postUser(form.value).subscribe(res=>{
  //     this.reg=res;
  //     console.log(this.reg);

  //   })

  }
}


