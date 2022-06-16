import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  user: User = {
    _id: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
    role: ""
  }

  ngOnInit(): void {
    this.getUserLogged()
  }

  changeData() {
    this.userService.saveDataUser(this.user)
    this.router.navigate(['/editUser'])
  }

  deleteAccount(email: string) {
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
              this.router.navigate(['/introduction'])
            })
          },
          err => console.log(err)
        )
      }
    })
  }

  async getUserLogged() {
    const user = await this.userService.getUserById()
    user.forEach(user => this.user = user);
  }


}
