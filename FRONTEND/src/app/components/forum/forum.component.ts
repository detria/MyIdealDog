import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { DogService } from '../../services/dog.service';
import { Dog } from 'src/app/models/dog';
import { CommentService } from 'src/app/services/comment.service';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(public dogService: DogService, public commentsService: CommentService) { }

  dogs: Dog[] = []
  breeds: string[] = []
  publicaciones: Comment[] = []
  publicaciones2: Comment[] = []
  opcionSeleccionada: string = '0'
  seleccion: string = ''
  comentarios: boolean = true

  ngAfterViewChecked(): void {
    this.obtenerRazas()
  }

  ngOnInit(): void {
    this.obtenerPerros()
    this.obtenerComentarios()
    this.obtenerComentarios2()
  }

  //OBTENCIÓN DE LOS PERROS DE LA BASE DE DATOS PARA SACAR LAS RAZAS EX
  async obtenerPerros() {
    const dogs = await this.dogService.getDog();
    dogs.forEach(el => this.dogs = el)
  }
  obtenerRazas(): string[] {
    const breeds: string[] = []
    this.dogs.forEach(dog => {
      breeds.push(dog.breed)
    });
    this.breeds = breeds;
    return breeds;
  }

  async obtenerComentarios() {
    const comments = await this.commentsService.getComments();
    comments.forEach(c => this.publicaciones = c)
  }

  async obtenerComentarios2() {
    const comments = await this.commentsService.getComments();
    comments.forEach(c => this.publicaciones2 = c)
    this.comentarios = true
  }

  async obtenerMisComentarios() {
    const comments = await this.commentsService.getCommentsByUser()
    comments.forEach(c => this.publicaciones = c)
  }

  async obtenerMisComentarios2() {
    const comments = await this.commentsService.getCommentsByUser()
    comments.forEach(c => this.publicaciones2 = c)
    this.comentarios = false
  }

  quitarFiltro() {
    if (this.comentarios == true) {
      this.obtenerComentarios2()
      this.opcionSeleccionada = '0'
    } else {
      this.obtenerMisComentarios2()
      this.opcionSeleccionada = '0'
    }
  }

  async filtrarRaza() {
    if (this.comentarios == true) {
      await this.obtenerComentarios()
      this.publicaciones2 = this.publicaciones
      if (this.opcionSeleccionada != '0') {
        this.publicaciones2 = this.publicaciones.filter(p => p.topic === this.seleccion);
      }
    }
    if (this.comentarios == false) {
      await this.obtenerMisComentarios()
      this.publicaciones2 = this.publicaciones
      if (this.opcionSeleccionada != '0') {
        this.publicaciones2 = this.publicaciones.filter(p => p.topic === this.seleccion);
      }
    }

  }

  capturarRaza() {
    this.seleccion = this.opcionSeleccionada
  }

  crearPublicacion() {

  }



}
