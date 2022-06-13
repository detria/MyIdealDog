import { Component, OnInit } from '@angular/core';
import { DogService } from 'src/app/services/dog.service';
import { Dog } from 'src/app/models/dog';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-edit-dog',
  templateUrl: './create-edit-dog.component.html',
  styleUrls: ['./create-edit-dog.component.css']
})
export class CreateEditDogComponent implements OnInit {

  constructor(private dogService: DogService, private router: Router) { }

  ngOnInit(): void {
    var btn = document.getElementById('guardar')
    if (this.dogService.create === false) {
      this.cargarRazaEditar()
      if (btn != null) {
        btn.innerHTML = 'Editar'
        let inputBreed= document.getElementById('raza')
        inputBreed?.setAttribute("readonly","readonly")
      }
    }else{
      if (btn != null) {
        btn.innerHTML = 'Crear'
      }
    }
  }

  editar: boolean | undefined

  raza: string = ""
  descripcion: string = ""
  peso: string = ""
  video: string = ""
  tutorial: string = ""
  foto1: string = ""
  foto2: string = ""
  esperanzaVida: string = ""

  opcionSeleccionadaTamanio: string = '0';
  seleccionTamanio: string = ""

  opcionSeleccionadaActividad: string = '0'
  seleccionActividad: string = ""

  opcionSeleccionadaCuidados: string = '0'
  seleccionCuidados: string = ""

  capturarTamanio() {
    this.seleccionTamanio = this.opcionSeleccionadaTamanio;
  }

  capturarActividad() {
    this.seleccionActividad = this.opcionSeleccionadaActividad;
  }

  capturarCuidados() {
    this.seleccionCuidados = this.opcionSeleccionadaCuidados;
  }

  crearNuevaRaza() {
    let imgs: string[] = [this.foto1, this.foto2]
    let dog: Dog = {
      breed: this.raza,
      description: this.descripcion,
      weight: this.peso,
      activity: this.seleccionActividad,
      care_requirement: this.seleccionCuidados,
      life_expectancy: this.esperanzaVida,
      size: this.seleccionTamanio,
      imgs: imgs,
      trainingTutorial: this.tutorial,
      video: this.video
    }
    this.dogService.createDog(dog).subscribe(
      res => {
        Swal.fire({
          title: 'El perro se ha creado correctamente!',
          text: '',
          background: 'url(assets/imgs/login1.jpg)',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: 'black',
        }).then(() => {
          this.router.navigate(['/admin']);
        })
      },
      err => console.log(err)
    )

  }

  guardarCambios() {
    if (this.dogService.create === false) {
      console.log(this.dogService.create)
      this.editarPerro()
    } else if (this.dogService.create === true) {
      console.log(this.dogService.create)
      this.crearNuevaRaza()
    }
  }

  async cargarRazaEditar() {
    let dog: Dog = await this.dogService.dog
    this.raza = dog.breed
    this.descripcion = dog.description
    this.opcionSeleccionadaActividad = dog.activity
    this.esperanzaVida = dog.life_expectancy
    this.opcionSeleccionadaCuidados = dog.care_requirement
    this.opcionSeleccionadaTamanio = dog.size
    this.foto1 = dog.imgs[0]
    this.foto2 = dog.imgs[1]
    this.video = dog.video
    this.tutorial = dog.trainingTutorial
    this.peso = dog.weight
  }

  editarPerro() {
    let dog: Dog = {
      breed: this.raza,
      description: this.descripcion,
      weight: this.peso,
      activity: this.opcionSeleccionadaActividad,
      care_requirement: this.opcionSeleccionadaCuidados,
      life_expectancy: this.esperanzaVida,
      imgs: [this.foto1, this.foto2],
      trainingTutorial: this.tutorial,
      video: this.video,
      size: this.opcionSeleccionadaTamanio
    }

    this.dogService.editDog(dog.breed, dog).subscribe(
      res => {
        Swal.fire({
          title: 'El perro se ha editado correctamente!',
          text: '',
          background: 'url(assets/imgs/login1.jpg)',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: 'black',
        }).then(() => {
          this.router.navigate(['/admin']);
        })
      },
      err => console.log(err)
    )
  }

}
