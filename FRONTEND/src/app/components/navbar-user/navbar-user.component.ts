import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  /**
   * Cierra sesión y elimina el token actual que pertenece al usuario actual logeado
   */
  cerrarSesion(){
    Swal.fire({
      title: '¿Estás seguro de querer cerrar sesión',
      text: "Tendrás que volver a iniciar sesión!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Estoy seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token')
      this.router.navigate(['/introduction']);
      }})
    
  }

}
