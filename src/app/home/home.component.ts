import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import {UserService}from '../user.service';
import {User} from '../model/user';
import { Router } from '@angular/router';
import { NgForm ,FormGroup} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';

// import { DataSource } from '@angular/cdk/table';

export interface Userdetail{
  _id:'',
  Name:''
  Age:''
  office:''
  Action:''
  // password:string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[UserService]

})

export class HomeComponent implements OnInit {
//  user:any=User

user:any;
selecteduser:any;
updatedUser:any;
registerd:any=[];
  dataSource : MatTableDataSource<Userdetail>=new MatTableDataSource([]);
  pagelength:any;
  paginators:any;
  
  displayedColumns:string[]=['Name','Age','office','Action']


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private userService:UserService,private route:Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe((res:Userdetail[])=>{
     this.user=res;
     this.dataSource.data=res;
     this.pagelength=this.dataSource.data.length;
     this.dataSource.paginator=this.paginator;
     this.dataSource.sort=this.sort;
      console.log('page length',this.pagelength);
      console.log('datasource',this.dataSource);
      console.log('datasource.data',this.dataSource.data);
      console.log(this.user[0].Name);

    })

  }
  applyFilter(value:string){
   this.paginators= this.dataSource.filter=value.trim().toLocaleUpperCase();
    console.log('hello',this.dataSource.filter);
        }
  
        // editEmployee(empid){
        //   this.route.navigate([`/register/${empid}`]);

        // }
        openDialog(_id:string) {
          this.userService.getbyid(_id).subscribe((res)=>{
            console.log('opendialog',res);
            this.selecteduser=res;
            window.localStorage.setItem('selecteduser',JSON.stringify(this.selecteduser));
            const dialogConfig=new MatDialogConfig();
            dialogConfig.disableClose=true;
            dialogConfig.autoFocus=true;
            dialogConfig.width="40%";
            const dialogRef = this.dialog.open(EditComponent,dialogConfig); 
            dialogRef.afterClosed().subscribe(()=>{this.getDetails();})

            
          })
          
          // dialogRef.afterClosed().subscribe(
          //   data=>{
          //     datas.Name=data.Name
          //     datas.Age=data.Age
          //     datas.office=data.office
          //     // this.userService.putUser(data).subscribe((res)=>{
          //     //   console.log(res)

          //     // })
          //     // console.log(data.Name);
          //   }
          // ) 
         
          
        }
        getDetails(){
          this.userService.getUser().subscribe((res)=>{
            this.registerd=res;
            this.dataSource=new MatTableDataSource(this.registerd);
            this.dataSource.sort=this.sort;
            this.dataSource.paginator=this.paginator;
          })
        }
          
              
        delete(_id:string){
          this.userService.deleteUser(_id).subscribe((res)=>{
            this.getDetails();
          })
        }
                }

      



