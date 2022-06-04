import { AfterViewChecked, AfterViewInit, APP_BOOTSTRAP_LISTENER, Component, OnInit } from '@angular/core';
import { DogService } from '../../services/dog.service';
import { Dog } from '../../models/dog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  constructor(public dogService: DogService) {
  }

  ngAfterViewChecked(): void {
    this.obtenerRazas()
  }

  dogs2: Dog[] = []
  dogs: Dog[] = []

  sizes: string[] = ["mini", "pequeño", "mediano", "grande"]
  actividad: string[] = ["baja", "media", "alta"]
  requerimientoCuidados: string[] = ["bajo", "medio", "alto"]
  breeds: string[] = []

  disponibilidad: boolean = false


  opcionSeleccionada: string = '0';
  seleccion: string = ""

  opcionSeleccionadaTamanio: string = '0';
  seleccionTamanio: string = ""

  opcionSeleccionadaActividad: string = '0'
  seleccionActividad: string = ""

  opcionSeleccionadaCuidados: string = '0'
  seleccionCuidados: string = ""

  capturarRaza(): string {
    this.seleccion = this.opcionSeleccionada;
    console.log(this.seleccion)
    if (this.opcionSeleccionada != '0') { this.disponibilidad = true } else {
      this.obtenerPerros2()
      this.disponibilidad = false
    }

    return this.seleccion
  }

  eliminarFiltros() {
    this.opcionSeleccionada = '0'
    this.opcionSeleccionadaActividad = '0'
    this.opcionSeleccionadaCuidados = '0'
    this.opcionSeleccionadaTamanio = '0'
    this.obtenerPerros2()
    this.disponibilidad = false
  }

  capturarTamanio() {
    this.seleccionTamanio = this.opcionSeleccionadaTamanio;
    console.log(this.seleccionTamanio)
  }

  capturarActividad() {
    this.seleccionActividad = this.opcionSeleccionadaActividad;
    console.log(this.seleccionActividad)
  }
  
  capturarCuidados() {
    this.seleccionCuidados = this.opcionSeleccionadaCuidados;
    console.log(this.seleccionCuidados)
  }

  ngOnInit(): void {
    this.obtenerPerros();
    this.obtenerPerros2();
  }

  async obtenerPerros() {
    const dogs = await this.dogService.getDog();
    dogs.forEach(el => this.dogs = el)
  }

  async obtenerPerros2() {
    const dogs = await this.dogService.getDog();
    dogs.forEach(el => this.dogs2 = el)
  }

  async busqueda() {
    await this.obtenerPerros();
    this.dogs2 = this.dogs
    if (this.opcionSeleccionadaActividad != '0') {
      this.dogs2 = this.dogs2.filter(e => e.activity === this.seleccionActividad);
    }
    if (this.opcionSeleccionadaCuidados != '0') {
      this.dogs2 = this.dogs2.filter(e => e.care_requirement === this.seleccionCuidados);
    }
    if (this.opcionSeleccionadaTamanio != '0') {
      this.dogs2 = this.dogs2.filter(e => e.size === this.seleccionTamanio);
    }
    if (this.opcionSeleccionada != '0') {
      this.dogs2 = this.dogs2.filter(e => e.breed === this.seleccion);
    }
  }

  obtenerRazas(): string[] {
    const breeds: string[] = []
    this.dogs2.forEach(dog => {
      breeds.push(dog.breed)
    });
    this.breeds = breeds;
    return breeds;
  }

}

