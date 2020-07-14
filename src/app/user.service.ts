import { Injectable } from '@angular/core';
import  {HttpClient} from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import {User} from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:User[];

readonly baseUrl='http://localhost:3000/employees'
  constructor(private http:HttpClient) { }
  getUser(){
    return this.http.get(this.baseUrl);
  }
  getbyid(_id:string){
    return this.http.get(this.baseUrl+`/${_id}`);
  }
  postUser(users:User){
    return this.http.post(this.baseUrl,users);
  }
  putUser(users:User){
    return this.http.put(this.baseUrl+`/${users._id}`,users);
  }
  deleteUser(_id:string){
    return this.http.delete(this.baseUrl+`/${_id}`);
  }
}
