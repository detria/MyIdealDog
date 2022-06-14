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
  publications: Comment[] = []
  publications2: Comment[] = []
  selectedOption: string = '0'
  selection: string = ''
  comments: boolean = true
  selector:boolean=false

  ngAfterViewChecked(): void {
    this.getBreeds()
  }

  ngOnInit(): void {
    this.getDogs()
    this.getComments()
    this.getComments2()
  }

  //OBTENCIÓN DE LOS PERROS DE LA BASE DE DATOS PARA SACAR LAS RAZAS EX
  async getDogs() {
    const dogs = await this.dogService.getDog();
    dogs.forEach(el => this.dogs = el)
  }

  /**
   * Recoge de todos los perros de la base de datos su raza para asi poder guardarlas y mostrarle al usuario todas las razas disponibles en la BBDD
   * @returns devuelve las razas encontradas
   */
  getBreeds(): string[] {
    const breeds: string[] = []
    this.dogs.forEach(dog => {
      breeds.push(dog.breed)
    });
    this.breeds = breeds;
    return breeds;
  }

  /**
   * Obtiene todos los comentarios de la BBDD
   */
  async getComments() {
    const comments = await this.commentsService.getComments();
    comments.forEach(c => this.publications = c)
  }

  /**
   * Obtiene todos los comentarios de la base de datos pero este método se usa como auxiliar.
   */
  async getComments2() {
    const comments = await this.commentsService.getComments();
    comments.forEach(c => this.publications2 = c)
    this.comments = true
    this.selector=false
  }

  /**
   * Obtiene todos los comentarios hechos por el usuario actual filtrando por su id
   */
  async getMyComments() {
    this.selector=true
    const comments = await this.commentsService.getCommentsByUser()
    comments.forEach(c => this.publications2 = c)
  }

  /**
   * Elimina todos los filtros aplicados al select
   */
  removeFilter() {
    if (this.comments == true) {
      this.getComments2()
      this.selectedOption = '0'
    } 
  }

  /**
   * Filtra por raza todos los comentarios de la categoria de 'Todas las publicaciones', que serían todos los comentarios hechos hasta el momento.
   */
  async breedFilter() {
    if (this.comments == true) {
      await this.getComments()
      this.publications2 = this.publications
      if (this.selectedOption != '0') {
        this.publications2 = this.publications.filter(p => p.topic === this.selection);
      }
    }
    if (this.comments == false) {
      await this.getMyComments()
    }

  }
  

  /**
   * Recupera el valor seleccionado del select para poder filtrar luego con el
   */
  changeSelection() {
    this.selection = this.selectedOption
  }



}
