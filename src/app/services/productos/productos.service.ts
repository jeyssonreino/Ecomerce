import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  api: string = 'http://localhost:8080/api';

  apiExample: string = 'assets/json/datos.json';

  constructor(private http: HttpClient) { }

    //Servicio para obtener todas los productos registrados en la base de datos
    getProductos() {
      const url = this.apiExample  /* + "/obtener-productos"*/;
      return this.http.get(url);
    }

    //Servicio para obtener un producto por su Id
    getProductosById(id:string){
      const url = this.api + `/obtener-producto/${id}`;
      return  this.http.get(url);
    }

    //Srevicio para guardar un pedido(Carrito) en la base de datos pasandole el Id del producto y el Id del usuario
    savePedido(datos:any){
      const url = this.api + '/registrar-pedido';
      return this.http.post(url,datos);
    }
}
