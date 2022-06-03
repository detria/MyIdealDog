import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {FormsModule, NgForm} from '@angular/forms'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public userService:UserService) { }

  ngOnInit(): void {
    
  }

  registerUser(form:NgForm){
    this.userService.createUser(form.value).subscribe(
      res=>{
        this.userService.getUsers()
      },
      err=>console.log(err)
    )
    Swal.fire({
      title: 'User registered!',
      text: '',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() =>{
      form.reset();
    })
    
  }

}
