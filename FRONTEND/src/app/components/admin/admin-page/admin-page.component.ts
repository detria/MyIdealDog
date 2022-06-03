import { Component, OnInit } from '@angular/core';
import { Dog } from 'src/app/models/dog';
import { User } from 'src/app/models/user';
import { DogService } from 'src/app/services/dog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(public userService: UserService, public dogService: DogService) { }


  users: User[] = []
 // dogs: Dog[] = []

  ngOnInit(): void {

  }

  obtenerUsuarios() {
    this.userService.getUsers().subscribe(
      res => { this.users = res },
      err => console.log(err)
    )
  }
/** 
  obtenerPerros() {
    this.users = []
    this.dogService.getDog().subscribe(
      res => { this.dogs = res },
      err => console.log(err)
    )
    }*/

}
