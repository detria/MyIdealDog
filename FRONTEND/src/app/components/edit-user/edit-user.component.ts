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

  name: string = ""
  lastname: string = ""
  email: string = ""
  password: string = ""
  userNoPassword:any=""

  ngOnInit(): void {
    this.editUser()
  }

  /**
   * recoge todos los datos propios del usuario que esta iniciado sesión y los almacena en varibales externas que estan vinculadas 
   * con el formulario, por lo tanto al abrir el formulario el usuario va a ver sus datos en el, y el decide si quiere cambiar alguno
   */
  editUser() {
    const user = this.userService.user
    this.name = user.name
    this.lastname = user.lastname
    this.email = user.email
  }

  /**
   * Si no quieres cambiar la contraseña no se pasa como parametro para editar el usuario y si quieres editarla tambien se rellena 
   * el campo y por lo tanto se pasa tambien como dato a cambiar.El resto de campos se pasan siempre, si los cambias se guardarán 
   * los datos nuevos y si no tocas nada se va a quedar todo como estaba.
   */
  async changeData() {
    if(this.password==""){
      this.userNoPassword={
        name: this.name,
        lastname: this.lastname,
        email: this.email,
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
          this.userService.editUser(this.userNoPassword).subscribe(
            res => {
              this.router.navigate(['/userProfile'])
            },
            err => console.log(err)
          )
  
        }
      })
    }else{
      let user: User = {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        password:this.password,
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
    

  }

  /**
   * Permite cancelar la operación de cambiar los datos si el usuario cambia de opinión
   */
  cancel() {
    Swal.fire({
      title: '¿Estás seguro de volver?',
      icon: 'question',
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
