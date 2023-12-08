import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  api: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

    //Servicio para obtener todas los productos registrados en la base de datos
    getProductos() {
      const url = this.api + "/obtener-productos";
      return this.http.get(url);
    }
}
