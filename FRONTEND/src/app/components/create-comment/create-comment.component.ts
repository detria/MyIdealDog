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

  constructor(public dogService: DogService,private commentService:CommentService,private userService:UserService,private router: Router) { }

  dogs:Dog[]=[]
  breeds:string[]=[]
  topic:string=""
  message:string=""
  opcionSeleccionada:string='0'
  seleccion:string=""

  ngOnInit(): void {
    this.obtenerPerros()
  }
  ngAfterViewChecked(): void {
    this.obtenerRazas()
  }

  createComment(){
    const comment:Comment={
      topic:this.topic,
      message:this.message,
      date:"04/06/2022",
      userId:""
    }
    this.commentService.createComment(comment).subscribe(
      res=>{
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
      err=>console.log(err)
    )
  }

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

  capturarRaza(){
    this.topic=this.opcionSeleccionada
  }
}
