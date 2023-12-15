import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  //Servicio para obtener un usuario por su id
  getUsuarioByIde(id:number) {
    const url = this.api + `/obtener-usuario/${id}`;
    return this.http.get(url);
  }
}
