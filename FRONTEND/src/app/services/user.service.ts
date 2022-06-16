import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {User} from '../models/user'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL_API = 'http://localhost:3000/user'

  users:User[]=[];

  user:User={
    name: '',
    lastname: '',
    email: '',
    password: '',
    role: 'user'
  }

  constructor(private http: HttpClient) { }

  //TODOS LOS METODOS ENVIAN PETICIONES A LA API REST Y REALIZAN CIERTA ACCIÓN DEFINIDA EN LOS CONTROLLERS

  getUsers() {  
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token') || '{}'
      })
    };
    return this.http.get<User[]>(this.URL_API+"/list",httpOptions)

  }
  
  /**
   * 
   * @param user recibe un usuario y realiza una petición a la api a través de la ruta indicada donde se encuentra el método que 
   * realiza la acción de crear el usuario
   * @returns devuelve el resultado de la operación
   */
  createUser(user:User){
    return this.http.post(this.URL_API,user)
  }

   /**
   * 
   * @param user recibe un email y realiza una petición a la api a través de la ruta indicada donde se encuentra el método que 
   * realiza la acción de eliminar el usuario cuyo email sea el mismo que el recibido por parámetro
   * @returns devuelve el resultado de la operación
   */
  deleteUser(email:string){
    return this.http.delete(this.URL_API+"/delete/"+email)
  }

  /**
   * 
   * @param user recibe un id y realiza una petición a la api a través de la ruta indicada donde se encuentra el método que 
   * realiza la acción de eliminar el usuario cuyo id sea el mismo que el recibido por parámetro
   * @returns devuelve el resultado de la operación
   */
  deleteUserById(id:string){
    return this.http.delete(this.URL_API+"/"+id)
  }

  /**
   * 
   * @param email recibe un email y realiza una petición a la api a través de la ruta indicada donde se encuentra el método que 
   * realiza la acción de buscar y devolver el usuario cuyo email coincida
   * @returns devuelve el usuario encontrado
   */
  getUserByEmail(email:string){
    return this.http.get<User>(this.URL_API+"/"+email)
  }

  /**
   * 
   * @param user recibe un usuario y realiza una petición a la api a través de la ruta indicada donde se encuentra el método que 
   * realiza la acción de logear el usuario
   * @returns devuelve el resultado de la operación
   */
  loginUser(user: any) {
    return this.http.post(this.URL_API+"/login", user);
  }

  /**
   * 
   * @param user recibe un usuario y realiza una petición a la api a través de la ruta indicada donde se encuentra el método que 
   * realiza la acción de editar el usuario recibido por parámetro
   * @returns devuelve el resultado de la operación
   */
  editUser(user:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token') || '{}'
      })
    };
    return this.http.put(this.URL_API+"/",user,httpOptions)
  }

  /**
   * realiza una petición a la api a través de la ruta indicada donde se encuentra el método que realiza la acción de buscar el 
   * usuario cuyo id coincida con el del user logeado actual
   * @returns devuelve el resultado de la operación
   */
  getUserById(){
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token') || '{}'
      })
    };
    return this.http.get<User>(this.URL_API+"/userById",httpOptions)
  }

  /**
   * 
   * @param user recibe un usuario para guardarlo para usarlo en otro componente
   */
  saveDataUser(user:User){
    this.user=user;
  }

}
