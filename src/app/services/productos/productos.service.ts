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
      const url = this.api + "/obtener-productos";
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

    //Servico para consultar el carrito de un usuario por su Id
    getCarritoById(idUser:any){
      const url = this.api + `/obtener-carrito/${idUser}`;  
      return this.http.get(url);
    }

    //Servicio para eliminar un articulo del carrito por el Id del articulo
    deleteCarritoById(id:number){
      const url = this.api + `/eliminar-pedido/${id}`
      return this.http.delete(url);
    }

    //Sertvicio para agregar un detalles del pedido
    saveDetallesPedido(datos:any){
      const url = this.api + '/registrar-detallepedido';
      return this.http.post(url,datos);
    }
}
