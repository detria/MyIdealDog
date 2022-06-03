import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {map, Observable, startWith} from 'rxjs';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';
import { UserService } from 'src/app/services/user.service';
import { DogService } from '../../services/dog.service';
import { Dog } from 'src/app/models/dog';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(public dogService: DogService,public userService:UserService,public commentsService:CommentService) { }
 
  dogs:Dog[]=[]
  breeds:string[]=[]
  publicaciones:Comment[]=[]

  ngAfterViewChecked(): void {
    this.obtenerRazas()
  }

  ngOnInit():void {
    this.obtenerPerros()
    this.obtenerComentarios()
  }

  async obtenerPerros() {
    const dogs = await this.dogService.getDog();
    dogs.forEach(el => this.dogs = el)
  }

  async obtenerComentarios(){
    const comments=await this.commentsService.getComments();
    comments.forEach(c=>this.publicaciones=c)
  }

  async obtenerMisComentarios(){
    const comments=await this.commentsService.getCommentsByUser()
    comments.forEach(c=>this.publicaciones=c)
  }

  obtenerRazas(): string[] {
    const breeds: string[] = []
    this.dogs.forEach(dog => {
      breeds.push(dog.breed)
    });
    this.breeds = breeds;
    return breeds;
  }

  mostrarPublicaciones(){
    this.obtenerComentarios()
  }

  mostrarMisPublicaciones(){
    this.obtenerMisComentarios();
  }

  
  
}
