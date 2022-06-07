import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {User} from '../models/user'
import { CookieService } from "ngx-cookie-service";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL_API = 'http://localhost:3000/user'

  users:User[]=[];

  user:User={
    name: '',
    lastname: '',
    email: '',
    password: '',
    role: 'user'
  }
  
  userRegister:User={
    name:"",
    lastname:"",
    email:"",
    password:"",
    role:""

  };

  constructor(private http: HttpClient,private cookies:CookieService) { }

  getUsers() {  
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token') || '{}'
      })
    };
    return this.http.get<User[]>(this.URL_API+"/list",httpOptions)

  }
  
  createUser(user:User){
    return this.http.post(this.URL_API,user)
  }

  deleteUser(email:string){
    return this.http.delete(this.URL_API+"/delete/"+email)
  }

  deleteUserById(id:string){
    return this.http.delete(this.URL_API+"/"+id)
  }

  getUserByEmail(email:string){
    return this.http.get<User>(this.URL_API+"/"+email)
  }

  loginUser(user: any) {
    return this.http.post(this.URL_API+"/login", user);
  }

  editUser(user:User){
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token') || '{}'
      })
    };
    return this.http.put(this.URL_API+"/",user,httpOptions)
  }

  getUserById(){
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token') || '{}'
      })
    };
    return this.http.get<User>(this.URL_API+"/userById",httpOptions)
  }

  saveDataUser(user:User){
    this.user=user;
  }

}
