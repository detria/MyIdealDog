import {  Component, OnInit } from '@angular/core';
import { DogService } from '../../services/dog.service';
import { Dog } from '../../models/dog';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  constructor(public dogService: DogService) {
  }

  ngAfterViewChecked(): void {
    this.getBreeds()
  }

  dogs2: Dog[] = []
  dogs: Dog[] = []

  sizes: string[] = ["mini", "pequeño", "mediano", "grande"]
  activity: string[] = ["baja", "media", "alta"]
  careRequirement: string[] = ["bajo", "medio", "alto"]
  breeds: string[] = []

  availability: boolean = false


  selectedOptionBreed: string = '0';
  selection: string = ""

  selectedOptionSize: string = '0';
  selectedSize: string = ""

  selectedOptionActivity: string = '0'
  selectedActivity: string = ""

  selectedOptionCareRequirement: string = '0'
  selectionCareRequirement: string = ""

  /**
   * 
   * @returns devuelve la raza seleccionada por el usuario.
   */
  changeBreed(): string {
    this.selection = this.selectedOptionBreed;
    if (this.selectedOptionBreed != '0') { this.availability = true } else {
      this.getDogs2()
      this.availability = false
    }

    return this.selection
  }

  /**
   * Elimina todos los filtros aplicados a la lista de perros
   */
  removeFilters() {
    this.selectedOptionBreed = '0'
    this.selectedOptionActivity = '0'
    this.selectedOptionCareRequirement = '0'
    this.selectedOptionSize = '0'
    this.getDogs2()
    this.availability = false
  }

  /**
   * Recoge y asigna la opccion seleccionada por el usuario en el select de de selecciona el tamaño
   */
  sizeChange() {
    this.selectedSize = this.selectedOptionSize;
  }

  /**
   * Recoge y asigna la opcion seleccionada por el usuario en el select de de selecciona la actividad
   */
  activityChange() {
    this.selectedActivity = this.selectedOptionActivity;
  }
  
  /**
   * Recoge y asigna la opcion seleccionada por el usuario en el select de selecciona el requerimiento de cuidados.
   */
  careRequirementChange() {
    this.selectionCareRequirement = this.selectedOptionCareRequirement;
  }

  ngOnInit(): void {
    this.getDogs();
    this.getDogs2();
  }

  /**
   * Obtiene todos los perros de la BBDD
   */
  async getDogs() {
    const dogs = await this.dogService.getDog();
    dogs.forEach(el => this.dogs = el)
  }

  /**
   * Obtiene todos los perros de la BBDD, es un método que uso auxiliar
   */
  async getDogs2() {
    const dogs = await this.dogService.getDog();
    dogs.forEach(el => this.dogs2 = el)
  }


  /**
   * Segun los filtros qu el usuario ha aplicado se va filtrando sobre la lista de perros principal y se mostrara el resultado de los perros que hay con los filtros aplicados.
   */
  async search() {
    await this.getDogs();
    this.dogs2 = this.dogs
    if (this.selectedOptionActivity != '0') {
      this.dogs2 = this.dogs2.filter(e => e.activity === this.selectedActivity);
    }
    if (this.selectedOptionCareRequirement != '0') {
      this.dogs2 = this.dogs2.filter(e => e.care_requirement === this.selectionCareRequirement);
    }
    if (this.selectedOptionSize != '0') {
      this.dogs2 = this.dogs2.filter(e => e.size === this.selectedSize);
    }
    if (this.selectedOptionBreed != '0') {
      this.dogs2 = this.dogs2.filter(e => e.breed === this.selection);
    }
    if(this.dogs2.length==0){
      Swal.fire({
        title: 'No se han encontrado resultados',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'black',
      }).then(() => {
        this.removeFilters()
      })
    }
  }

  /**
   * Recoge de todos los perros de la base de datos su raza para asi poder guardarlas y mostrarle al usuario todas las razas disponibles en la BBDD
   * @returns devuelve las razas encontradas
   */
  getBreeds(): string[] {
    const breeds: string[] = []
    this.dogs2.forEach(dog => {
      breeds.push(dog.breed)
    });
    this.breeds = breeds;
    return breeds;
  }

}

