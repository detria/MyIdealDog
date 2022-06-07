import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  nombre: string = ""
  apellidos: string = ""
  email: string = ""
  contrasenia: string = ""

  ngOnInit(): void {
    this.editarUsuario()
  }

  editarUsuario() {
    const user = this.userService.user
    this.nombre = user.name
    this.apellidos = user.lastname
    this.email = user.email
    this.contrasenia = user.password
  }

  async cambiarDatos() {
    let user: User = {
      name: this.nombre,
      lastname: this.apellidos,
      email: this.email,
      password: this.contrasenia,
      role: 'user'
    }
    Swal.fire({
      title: '¿Estás seguro de los cambios?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Estoy seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.editUser(user).subscribe(
          res => {
            this.router.navigate(['/userProfile'])
          },
          err => console.log(err)
        )

      }
    })

  }

  cancelar() {
    Swal.fire({
      title: '¿Estás seguro de volver?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Estoy seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/userProfile'])
      }
    })
  }

}
