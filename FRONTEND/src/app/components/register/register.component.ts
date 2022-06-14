import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms'
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) {

  }

  ngOnInit(): void {

  }

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', Validators.required),
  });

  /**
   * Con los datos obtenidos del formulario realiza el registro del usuario
   */
  registerUser() {
    this.userService.createUser(this.userForm.value).subscribe(
      res => {
        this.userService.getUsers()
      },
      err => console.log(err)
    )
    Swal.fire({
      title: 'User registered!',
      text: '',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.userForm.reset();
      this.router.navigate(['/login'])
    })
  }


}
