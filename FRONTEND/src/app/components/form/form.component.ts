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

  homeCondition: string = ""
  careRequiremenCondition: string = ""
  timeCondition: string = ""
  experienceCondition: string = ""
  familyCondition: string = ""
  dogs: Dog[] = []
  idealDogs: Dog[] = []

  vivienda: boolean = true; //nose

  ngOnInit(): void {
    this.getDogs()
  }

  /**
   * Obtiene todos los perros de la BBDD
   */
  async getDogs() {
    await this.dogsService.getDog().forEach(dog => this.dogs = dog)
  }

  /**
   * Muestra una raza ideal para el usuario de la lista de las razas que se han ecnontrado que son mas afines a el y si no mostrará un mensaje lamentando ya que no se ha encontrado una raza ideal para esas caracteristicas
   */
  async finish() {
    var idealDogList = await this.idealDogAssignment()
    if (idealDogList.length === 0) {
      Swal.fire({
        title: '¡Lo sentimos, no hemos podido encontrar una raza que se adapte a ti!',
        text: '',
        imageUrl: 'https://us.123rf.com/450wm/bolsunova/bolsunova1604/bolsunova160400032/55147109-vector-aislado-de-la-ilustraci%C3%B3n-de-dibujos-animados-car%C3%A1cter-emoji-perro-triste-y-frustrado-llorar-.jpg?ver=6',
        confirmButtonText: 'OK',
        confirmButtonColor: 'black'
      })
      this.resetForm()
    } else {
      let urlImg = idealDogList[0].imgs[0]
      console.log(urlImg)
      Swal.fire({
        title: idealDogList[0].breed,
        text: '¡Esta es la raza que más se adapta a ti!!',
        imageUrl: urlImg,
        confirmButtonText: 'OK',
        confirmButtonColor: 'black'
      })
      this.resetForm()
    }

  }

  /**
   * Resetea los valores del formulario.
   */
  resetForm() {
    var resetForm = <HTMLFormElement>document.getElementById('form');
    resetForm.reset();
  }

  /**
   * Método que asigna una raza al usuario logeado una vez complete el cuestionario, recoge los resultados marcados en el formulario y según estos va filtrando para encontrar una raza que se adapte a las preferencias y características del usuario
   * @returns devuelve una lista con las razas encontradas más afines al usuario(si no se encuentra ninguna se devolverá vacío)
   */
   idealDogAssignment(): any {
    if (this.careRequiremenCondition == "" || this.experienceCondition == "" || this.familyCondition == "" || this.timeCondition == "" || this.homeCondition == "") {
      Swal.fire({
        title: '¡Debe marcar todas las opciones para poder continuar!',
        text: '',
        background: 'url(assets/imgs/login1.jpg)',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'black'
      }).then(() => {
        this.resetForm()
      })
    } else {
      if (this.homeCondition == "piso") {
        this.dogs.filter(e => e.size === 'mini').forEach(perro => this.idealDogs.push(perro));
        this.getDogs()
        this.dogs.filter(e => e.size === 'pequeño').forEach(perro => this.idealDogs.push(perro));
      } else {
        this.dogs.filter(e => e.size === 'mediano').forEach(perro => this.idealDogs.push(perro));
        this.getDogs()
        this.dogs.filter(e => e.size === 'grande').forEach(perro => this.idealDogs.push(perro));
      }

      if (this.familyCondition === 'si') {
        let aux: Dog[] = []
        this.idealDogs.filter(e => e.activity === 'baja').forEach(perro => aux.push(perro));
        this.idealDogs.filter(e => e.activity === 'media').forEach(perro => aux.push(perro));
        this.idealDogs = aux
      } else if (this.familyCondition === 'no') {
        this.idealDogs = this.idealDogs.filter(e => e.activity === 'alta')
      }

      if (this.timeCondition === '1') {
        this.idealDogs = this.idealDogs.filter(e => e.activity === 'baja');
      } else if (this.timeCondition === '12') {
        let aux: Dog[] = []
        this.idealDogs.filter(e => e.activity === 'media').forEach(perro => aux.push(perro));
        this.idealDogs.filter(e => e.activity === 'baja').forEach(perro => aux.push(perro));
        this.idealDogs = aux
      } else if (this.timeCondition === '2') {
        let aux: Dog[] = []
        this.idealDogs.filter(e => e.activity === 'alta').forEach(perro => aux.push(perro));
        this.idealDogs.filter(e => e.activity === 'baja').forEach(perro => aux.push(perro));
        this.idealDogs.filter(e => e.activity === 'media').forEach(perro => aux.push(perro));
        this.idealDogs = aux
      }

      if (this.experienceCondition === 'no') {
        var aux: Dog[] = []
        this.idealDogs.filter(e => e.activity === 'baja').forEach(perro => aux.push(perro));
        this.idealDogs.filter(e => e.activity === 'media').forEach(perro => aux.push(perro));
        this.idealDogs = aux
      } else if (this.experienceCondition === 'si') {
        this.idealDogs = this.idealDogs.filter(e => e.activity === 'alta')
      }

      if (this.careRequiremenCondition === 'no') {
        var aux: Dog[] = []
        this.idealDogs.filter(e => e.care_requirement === 'bajo').forEach(perro => aux.push(perro));
        this.idealDogs.filter(e => e.care_requirement === 'medio').forEach(perro => aux.push(perro));
        this.idealDogs = aux
      } else if (this.careRequiremenCondition === 'si') {
        this.idealDogs = this.idealDogs.filter(e => e.care_requirement === 'alto')
      }
      return this.idealDogs.filter((ele, pos) => this.idealDogs.indexOf(ele) == pos);
    }
    return null;
  }

  /**
   * 
   * @param estado recibe un nuevo estado y lo asigna a una variable externa para poder compararla y saber que respuesta a escogido el usuario.
   */
  changeHomeCondition(estado: string) {
    this.homeCondition = estado;
  }

  /**
   * 
   * @param estado recibe un nuevo estado y lo asigna a una variable externa para poder compararla y saber que respuesta a escogido el usuario.
   */
  changeTimeCondition(estado: string) {
    this.timeCondition = estado;
  }

  /**
   * 
   * @param estado recibe un nuevo estado y lo asigna a una variable externa para poder compararla y saber que respuesta a escogido el usuario.
   */
  changeFamilyCondition(estado: string) {
    this.familyCondition = estado;
  }

  /**
   * 
   * @param estado recibe un nuevo estado y lo asigna a una variable externa para poder compararla y saber que respuesta a escogido el usuario.
   */
  changeCareRequiremenCondition(estado: string) {
    this.careRequiremenCondition = estado;
  }

  /**
   * 
   * @param estado recibe un nuevo estado y lo asigna a una variable externa para poder compararla y saber que respuesta a escogido el usuario.
   */
  changeExperienceCondition(estado: string) {
    this.experienceCondition = estado;
  }

}


