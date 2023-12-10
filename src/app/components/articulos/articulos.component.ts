import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
})
export class ArticulosComponent implements OnInit {

  productos:any;

  constructor(private productosService: ProductosService) {
    this.productos = [];
   }

  ngOnInit() {
   this.obtenerTodosLosProductos();
  }
  
//Obtener todos los productos registrados en la base de datos 
  obtenerTodosLosProductos() {
    this.productosService.getProductos().subscribe((response) => {
      if (response) {
        this.productos = response;
      }
    }, (error) => {
      if (error.status === 403) {
        alert("No tiene permisos");
      } else if (error.status === 404) {
        alert("No se encontraron resultados");
      }
    })
  }
  



}
