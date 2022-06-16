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
      this.loadDogEdit()
      if (btn != null) {
        btn.innerHTML = 'Editar'
        let inputBreed = document.getElementById('raza')
        inputBreed?.setAttribute("readonly", "readonly")
      }
    } else {
      if (btn != null) {
        btn.innerHTML = 'Crear'
      }
    }
  }

  editar: boolean | undefined

  breed: string = ""
  description: string = ""
  weight: string = ""
  video: string = ""
  tutorial: string = ""
  photo1: string = ""
  photo2: string = ""
  lifeExpectancy: string = ""

  selectedOptionSize: string = '0';
  selectedSize: string = ""

  selectedOptionActivity: string = '0'
  selectedActivity: string = ""

  selectedOptionCareRequirement: string = '0'
  selectedCareRequirement: string = ""

  /**
   * Asigna y recoge el valor seleccionado por el usuario en el select de tamaño
   */
  changeSize() {
    this.selectedSize = this.selectedOptionSize;
  }

  /**
   * Asigna y recoge el valor seleccionado por el usuario en el select de actividad
   */
  changeActivity() {
    this.selectedActivity = this.selectedOptionActivity;
  }

  /**
   * Asigna y recoge el valor seleccionado por el usuario en el select de cuidados
   */
  changeCareRequirement() {
    this.selectedCareRequirement = this.selectedOptionCareRequirement;
  }

  /**
   * Recoge  las propiedades escritar por el administrador y con ellas se crea una nueva raza de perro.
   */
  createDog() {
    if (this.breed == "" || this.description == "" || this.weight == "" || this.selectedSize == "" || this.selectedActivity == "" || this.selectedCareRequirement == "" || this.lifeExpectancy == "" || this.photo1 == "" || this.photo2 == "" || this.video == "" || this.tutorial == "") {
      Swal.fire({
        title: 'Por favor rellene todos los campos',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      })
    } else {
      let imgs: string[] = [this.photo1, this.photo2]
      let dog: Dog = {
        breed: this.breed,
        description: this.description,
        weight: this.weight,
        activity: this.selectedActivity,
        care_requirement: this.selectedCareRequirement,
        life_expectancy: this.lifeExpectancy,
        size: this.selectedSize,
        imgs: imgs,
        trainingTutorial: this.tutorial,
        video: this.video
      }
      this.dogService.createDog(dog).subscribe(
        res => {
          Swal.fire({
            title: 'Se ha creado una nueva raza!',
            text: '',
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

  /**
   * Dependiendo si estas creando una raza o editando una ejecuta una serie de instrucciones u otras.
   */
  saveChanges() {
    if (this.dogService.create === false) {
      this.editDog()
    } else if (this.dogService.create === true) {
      this.createDog()
    }
  }

  /**
   * Carga las características de la raza de perro que en la anterior ventana se escogió editar.
   */
  async loadDogEdit() {
    let dog: Dog = await this.dogService.dog
    this.breed = dog.breed
    this.description = dog.description
    this.selectedOptionActivity = dog.activity
    this.lifeExpectancy = dog.life_expectancy
    this.selectedOptionCareRequirement = dog.care_requirement
    this.selectedOptionSize = dog.size
    this.photo1 = dog.imgs[0]
    this.photo2 = dog.imgs[1]
    this.video = dog.video
    this.tutorial = dog.trainingTutorial
    this.weight = dog.weight
  }

  /**
   * Recoge todas las propiedades y si se editó alguna guarda la raza editada
   */
  editDog() {

    let dog: Dog = {
      breed: this.breed,
      description: this.description,
      weight: this.weight,
      activity: this.selectedOptionActivity,
      care_requirement: this.selectedOptionCareRequirement,
      life_expectancy: this.lifeExpectancy,
      imgs: [this.photo1, this.photo2],
      trainingTutorial: this.tutorial,
      video: this.video,
      size: this.selectedOptionSize
    }


    this.dogService.editDog(dog.breed, dog).subscribe(
      res => {
        Swal.fire({
          title: 'El perro se ha modificado correctamente!',
          text: '',
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


