import { Component, OnInit } from '@angular/core';
import {UserService}from '../user.service';
import {User} from '../model/user';
import { Router } from '@angular/router';
import { NgForm, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {
  hide=true;
  reguser:any=[];
  saveForm:any=[];
  model=new User();
  // editForm:any=User;
  ngForm:FormGroup;

  constructor(private userService:UserService,private route:Router) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(res=>{
      this.reguser=res;
      console.log('employee',this.reguser)
    })
    // this.getbyid(empid);
  }
  onSubmit(form:NgForm){
    this.userService.postUser(form.value).subscribe(res=>{
      this.saveForm=res;
      console.log(this.saveForm);
      this.route.navigate(['./login']);

    })

  }
  // getbyid(empid){
  //   this.userService.getbyid(empid).subscribe(res=>{
  //    this.editForm=res;
  //     this.ngForm.patchValue({
  //       Name:this.editForm.Name,
  //       Age:this.editForm.Age,
  //       office:this.editForm.office,
  //       password:this.editForm.password
  //     })
  //   })

  // }


}
