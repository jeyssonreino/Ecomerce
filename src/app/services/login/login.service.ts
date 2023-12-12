import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

    //Método para llamar al servicio de loguear y crear un Token unico de acceso
    loguearUsuario(datos: any) {
      const url = this.api + "/login";
      return this.http.post(url, datos, { observe: 'response' }).pipe(map((response: HttpResponse<any>) => {
        const body = response.body;
        const headers = response.headers;
        const bearerToken = headers.get('Authorization')! //Se obtiene el valor de Authorization del header (el token)
        const token = bearerToken;
        const id = body.id;
        const correo = body.correo
        localStorage.setItem('token', token) //Se crea un token unico en LocalStored
        localStorage.setItem('idUser',id) //Se almacena el id del usuario en LocalStored
        localStorage.setItem('email', correo) //Se almacena el email del usuario en LocalStored
        return body;
      }));
    }

  obtenerToken() {
    return localStorage.getItem('token');
  }

  obtenerIdUsuario(){
    return localStorage.getItem('idUser');
  }
}
