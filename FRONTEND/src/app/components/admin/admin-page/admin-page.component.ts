import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dog } from 'src/app/models/dog';
import { User } from 'src/app/models/user';
import { DogService } from 'src/app/services/dog.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(public userService: UserService, public dogService: DogService, private router: Router) { }


  users: User[] = []
  editable: boolean = true
  name: string = ""
  lastname: string = ""
  email: string = ""
  dogs: Dog[] = []

  ngOnInit(): void {
    this.getUsers()
    this.getDogs()

  }

  /**
   * Borra un usuario a través de su email que es único
   * @param email Recibe el email y borra el usuario que tiene ese email.
   */
  deleteUser(email: string) {
    if(email==="admin"){
      Swal.fire({
        title: 'No se puede eliminar al administrador',
        text: '',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'black',
      })
    }else{
      Swal.fire({
        title: '¿Estás seguro de querer eliminar este usuario?',
        text: "No podrás volver atrás!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Estoy seguro!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(email).subscribe(
            res => {
              Swal.fire({
                title: 'El usuario se ha eliminado correctamente!',
                text: '',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: 'black',
              }).then(() => {
                this.getUsers()
              })
            },
            err => console.log(err)
          )
        }
      })
    }
    

  }


  /**
   * Permite salir de la sesión y con ello eliminar el token actual de inicio de sesión.
   */
  closeSesion() {
    Swal.fire({
      title: '¿Estás seguro de querer salir de la sesión?',
      text: "Tendrás que volver a iniciar sesión!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Estoy seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token')
        this.router.navigate(['/introduction']);
      }
    })
  }

  /**
   * Obtiene todos los usuarios de la BBDD
   */
  getUsers() {
    this.userService.getUsers().subscribe(
      res => { this.users = res },
      err => console.log(err)
    )
  }

  /**
   * Obtiene todos los perros de la BBDD
   */
  getDogs() {
    this.dogService.getDog().subscribe(
      res => { this.dogs = res },
      err => console.log(err)
    )
  }

  /**
   * Eliminar el perro a través de la raza pasada por parámetro.
   * @param breed Se recibe la raza del perro que se quiere eliminar
   */
  eliminarPerro(breed: string) {
    Swal.fire({
      title: '¿Estás seguro de querer eliminar esta raza?',
      text: "No podrás volver atrás!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Estoy seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dogService.deleteDog(breed).subscribe(
          res => {
            Swal.fire({
              title: 'El perro se ha eliminado con exito!',
              text: '',
              background: 'url(assets/imgs/login1.jpg)',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: 'black',
            },
            ).then(() => {
              this.getDogs()
            })
          },
          err => console.log(err))
      }
    })

  }
  /**
   * Indica que la operacion que se esta haciendo es crear un perro y no editarlo
   */
  async addDog() {
    this.dogService.create = true //true es crear y false editar
    this.router.navigate(['/createEditDog']);
  }

  /**
   * 
   * @param breed Edita un perro a través de su raza pasada por parámetro
   */
  async editDog(breed: string) {
    this.dogService.create = false
    const dogs = await this.dogService.getDogsBy("getByBreed", breed)
    var dogEdit: Dog = {
      breed: '',
      description: '',
      weight: '',
      activity: '',
      care_requirement: '',
      life_expectancy: '',
      imgs: [],
      trainingTutorial: '',
      video: '',
      size: ''
    }
    await dogs.forEach(dog => dogEdit = dog[0])
    this.dogService.saveDataDog(dogEdit)
    this.router.navigate(['/createEditDog'])
  }

}
