import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {map, Observable, startWith} from 'rxjs';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';
import { UserService } from 'src/app/services/user.service';
import { DogService } from '../../services/dog.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(public dogService: DogService,public userService:UserService) { }
 

  ngAfterViewChecked(): void {
  }

  ngOnInit():void {
    
  }
  
}
