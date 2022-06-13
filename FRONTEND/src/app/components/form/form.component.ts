import { Component, OnInit } from '@angular/core';
import { Dog } from 'src/app/models/dog';
import { DogService } from 'src/app/services/dog.service';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private dogsService: DogService) { }

  estadoVivienda: string = ""
  estadoCuidados: string = ""
  estadoHorario: string = ""
  estadoExperiencia: string = ""
  estadoFamiliar: string = ""
  perros: Dog[] = []
  perrosAfines: Dog[] = []

  vivienda: boolean = true;

  ngOnInit(): void {
    this.obtenerPerros()
  }

  async obtenerPerros() {
    await this.dogsService.getDog().forEach(dog => this.perros = dog)
  }

  async finalizar() {
    var listaAfines = await this.asignarRazaAfin()
    if (listaAfines.length === 0) {
      Swal.fire({
        title: '¡Lo sentimos, no hemos podido encontrar una raza que se adapte a ti!',
        text: '',
        imageUrl: 'https://us.123rf.com/450wm/bolsunova/bolsunova1604/bolsunova160400032/55147109-vector-aislado-de-la-ilustraci%C3%B3n-de-dibujos-animados-car%C3%A1cter-emoji-perro-triste-y-frustrado-llorar-.jpg?ver=6',
        confirmButtonText: 'OK',
        confirmButtonColor: 'black'
      })
      this.resetearFormulario()
    } else {
      let urlImg = listaAfines[0].imgs[0]
      console.log(urlImg)
      Swal.fire({
        title: listaAfines[0].breed,
        text: '¡Esta es la raza que más se adapta a ti!!',
        imageUrl: urlImg,
        confirmButtonText: 'OK',
        confirmButtonColor: 'black'
      })
      this.resetearFormulario()
    }

  }

  resetearFormulario() {
    var resetForm = <HTMLFormElement>document.getElementById('form');
    resetForm.reset();
  }

  /**
   * Método que asigna una raza al usuario logeado una vez complete el cuestionario, recoge los resultados marcados en el formulario y según estos va filtrando para encontrar una raza que se adapte a las preferencias y características del usuario
   * @returns devuelve una lista con las razas encontradas más afines al usuario(si no se encuentra ninguna se devolverá vacío)
   */
  asignarRazaAfin(): any {
    if (this.estadoCuidados == "" || this.estadoExperiencia == "" || this.estadoFamiliar == "" || this.estadoHorario == "" || this.estadoVivienda == "") {
      Swal.fire({
        title: '¡Debe marcar todas las opciones para poder continuar!',
        text: '',
        background: 'url(assets/imgs/login1.jpg)',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'black'
      }).then(() => {
        this.resetearFormulario()
      })
    } else {
      if (this.estadoVivienda == "piso") {
        this.perros.filter(e => e.size === 'mini').forEach(perro => this.perrosAfines.push(perro));
        this.obtenerPerros()
        this.perros.filter(e => e.size === 'pequeño').forEach(perro => this.perrosAfines.push(perro));
      } else {
        this.perros.filter(e => e.size === 'mediano').forEach(perro => this.perrosAfines.push(perro));
        this.obtenerPerros()
        this.perros.filter(e => e.size === 'grande').forEach(perro => this.perrosAfines.push(perro));
      }

      if (this.estadoFamiliar === 'si') {
        let aux: Dog[] = []
        this.perrosAfines.filter(e => e.activity === 'baja').forEach(perro => aux.push(perro));
        this.perrosAfines.filter(e => e.activity === 'media').forEach(perro => aux.push(perro));
        this.perrosAfines = aux
      } else if (this.estadoFamiliar === 'no') {
        this.perrosAfines = this.perrosAfines.filter(e => e.activity === 'alta')
      }

      if (this.estadoHorario === '1') {
        this.perrosAfines = this.perrosAfines.filter(e => e.activity === 'baja');
      } else if (this.estadoHorario === '12') {
        let aux: Dog[] = []
        this.perrosAfines.filter(e => e.activity === 'media').forEach(perro => aux.push(perro));
        this.perrosAfines.filter(e => e.activity === 'baja').forEach(perro => aux.push(perro));
        this.perrosAfines = aux
      } else if (this.estadoHorario === '2') {
        let aux: Dog[] = []
        this.perrosAfines.filter(e => e.activity === 'alta').forEach(perro => aux.push(perro));
        this.perrosAfines.filter(e => e.activity === 'baja').forEach(perro => aux.push(perro));
        this.perrosAfines.filter(e => e.activity === 'media').forEach(perro => aux.push(perro));
        this.perrosAfines = aux
      }

      if (this.estadoExperiencia === 'no') {
        var aux: Dog[] = []
        this.perrosAfines.filter(e => e.activity === 'baja').forEach(perro => aux.push(perro));
        this.perrosAfines.filter(e => e.activity === 'media').forEach(perro => aux.push(perro));
        this.perrosAfines = aux
      } else if (this.estadoExperiencia === 'si') {
        this.perrosAfines = this.perrosAfines.filter(e => e.activity === 'alta')
      }

      if (this.estadoCuidados === 'no') {
        var aux: Dog[] = []
        this.perrosAfines.filter(e => e.care_requirement === 'bajo').forEach(perro => aux.push(perro));
        this.perrosAfines.filter(e => e.care_requirement === 'medio').forEach(perro => aux.push(perro));
        this.perrosAfines = aux
      } else if (this.estadoCuidados === 'si') {
        this.perrosAfines = this.perrosAfines.filter(e => e.care_requirement === 'alto')
      }

      console.log()
      return this.perrosAfines.filter((ele, pos) => this.perrosAfines.indexOf(ele) == pos);
    }
    return null;
  }

  //Metodos para cambiar el estado de las respuestas de los radiobutton
  cambiarEstadoVivienda(estado: string) {
    this.estadoVivienda = estado;

  }
  cambiarEstadoHorario(estado: string) {
    this.estadoHorario = estado;
  }
  cambiarEstadoFamilia(estado: string) {
    this.estadoFamiliar = estado;
  }
  cambiarEstadoCuidados(estado: string) {
    this.estadoCuidados = estado;
  }
  cambiarEstadoExperiencia(estado: string) {
    this.estadoExperiencia = estado;
  }

}


