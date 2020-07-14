import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UserService}from '../user.service';
import {User} from '../model/user';
import { Router } from '@angular/router';
import { NgForm ,FormGroup, } from '@angular/forms';
@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    providers:[UserService]
  })
  export class EditComponent {
    reg:any=[]
    ngForm:FormGroup;
    model=new User();
  selecteduser: any={};
  
        constructor( private userservice:UserService,
      public dialogRef: MatDialogRef<EditComponent>,
      @Inject(MAT_DIALOG_DATA) public data: User
    ) {    }
    ngOnInit(){
      this.selecteduser=JSON.parse(window.localStorage.getItem('selecteduser'));
      console.log(this.selecteduser);
      this.getDetails();
    }
  save(form:NgForm){
    // form.value._id=this.selecteduser._id;
    this.selecteduser.Name=form.value.Name;
    this.selecteduser.Age=form.value.Age;
    this.selecteduser.office=form.value.office;
    console.log('selected user',this.selecteduser);
    this.userservice.putUser(this.selecteduser).subscribe((res)=>{
      alert('sucess');
      this.close();
      // this.
    })
    // let  save=this.form.value;
    // console.log(save);
    // this.dialogRef.close(this.form.value);
   
    // })
     

    }

  getDetails(){
    this.userservice.getUser().subscribe((res)=>{
this.reg=res;

    })
  }
    
  close(){
    this.dialogRef.close();
  }
  }