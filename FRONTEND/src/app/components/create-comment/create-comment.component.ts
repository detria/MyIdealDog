import { Component, OnInit } from '@angular/core';
import { Dog } from 'src/app/models/dog';
import { CommentService } from 'src/app/services/comment.service';
import { DogService } from 'src/app/services/dog.service';
import { Comment } from 'src/app/models/comment';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  constructor(public dogService: DogService, private commentService: CommentService, private userService: UserService, private router: Router) { }

  dogs: Dog[] = []
  breeds: string[] = []
  topic: string = ""
  message: string = ""
  selectedOption: string = '0'
  selection: string = ""

  ngOnInit(): void {
    this.getDogs()
  }
  ngAfterViewChecked(): void {
    this.getBreeds()
  }

  /**
   * Crea un comentario y lo introduce a la BBDD
   */
  createComment() {
    var actualDate = new Date();
    var options:any = { year: 'numeric', month: 'long', day: 'numeric' };
    const comment: Comment = {
      topic: this.topic,
      comment: this.message,
      date:  actualDate.toLocaleDateString("es-ES", options),
      userId: ""
    }
    this.commentService.createComment(comment).subscribe(
      res => {
        Swal.fire({
          title: 'Su comentario se ha publicado correctamente!',
          text: '',
          background: 'url(assets/imgs/login1.jpg)',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: 'black',
        }).then(() => {
          this.router.navigate(['/forum']);
        })
      },
      err => console.log(err)
    )
  }

  /**
   * Obtiene todos los perros de la BBDD
   */
  async getDogs() {
    const dogs = await this.dogService.getDog();
    dogs.forEach(el => this.dogs = el)
  }

  /**
   * Obtiene de cada perro de la BBDD su raza para asi poder rellenar el select con todas las razas que existen en la BBDD
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
   * Se recupera la opcion seleccionada por el usuario en el select
   */
  capturarRaza() {
    this.topic = this.selectedOption
  }
}
