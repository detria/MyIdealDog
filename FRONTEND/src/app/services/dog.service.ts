import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Dog } from '../models/dog'

@Injectable({
  providedIn: 'root'
})
export class DogService {

  URL_API = 'http://localhost:3000/dog'

  create:boolean=true;
  dogs: Dog[] = [];

  dog:Dog={
    breed: '',
    description: '',
    weight: '',
    activity: '',
    care_requirement: '',
    life_expectancy: '',
    imgs: [],
    trainingTutorial: '',
    video: '',
    size: ''
  }

  constructor(private http: HttpClient) { }

  getDog() {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token') || '{}'
      })
    };
    return this.http.get<Dog[]>(this.URL_API + "/list",httpOptions)
  }

  getDogsBy(url:string,example:string){
    return this.http.get<Dog[]>(this.URL_API + "/list/"+url+"/"+example)
  }

  createDog(dog: Dog) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token') || '{}'
      })
    };
    return this.http.post(this.URL_API,dog,httpOptions)
  }

  deleteDog(breed:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token') || '{}'
      })
    };
    return this.http.delete(this.URL_API+"/"+breed,httpOptions)
  }

  editDog(breed:string,dog:Dog){
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token') || '{}'
      })
    };
    return this.http.put(this.URL_API+"/"+breed,dog,httpOptions)
  }

  saveDataDog(dog:Dog){
    this.dog=dog
  }

  

}
