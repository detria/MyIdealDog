import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Dog } from '../models/dog'

@Injectable({
  providedIn: 'root'
})
export class DogService {

  URL_API = 'http://localhost:3000/dog'

  dogs: Dog[] = [];

  constructor(private http: HttpClient) { }

  getDog() {
    return this.http.get<Dog[]>(this.URL_API + "/list")
  }

  getDogsBy(url:string,example:string){
    return this.http.get<Dog[]>(this.URL_API + "/list/"+url+"/"+example)
  }

  createDog(dog: Dog) {
    return this.http.post(this.URL_API, dog)
  }

}
