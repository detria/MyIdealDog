import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

declare var require: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  email: string = ""
  password: string = ""

  ngOnInit(): void { }

  /**
   * Controla el inicio de sesión de un usuario ya registrado
   */
  loginUser() {
    this.userService.loginUser({
      email: this.email,
      password: this.password
    }).subscribe(
      async res => {
        const resp:any=res;
        if (res) {
          Swal.fire({
            title: 'El inicio de sesión se ha realizado correctamente!',
            text: '',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: 'black',
          }).then(() => {
            localStorage.setItem('token',resp.token);
            if (resp.user.role == "admin") {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/searcher']);
            }
          })
        } else {
          console.log("errorr")
          Swal.fire({
            title: 'Error!',
            text: 'Datos incorrectos',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      },
      err => {
        console.log(err)
        Swal.fire({
          title: 'Error!',
          text: 'Datos incorrectos',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }

    );

  }

}


