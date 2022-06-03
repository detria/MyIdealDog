import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/comment'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  URL_API = 'http://localhost:3000/comment'

  comments:Comment[]=[];

  constructor(private http: HttpClient) { }

  getComments() {
    return this.http.get<Comment[]>(this.URL_API+"/list")

  }

  
}
