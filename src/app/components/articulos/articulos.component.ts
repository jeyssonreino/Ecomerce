import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
})
export class ArticulosComponent implements OnInit {

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
   // this.obtenerTodosLosProductos();
  }
/*
  obtenerTodosLosProductos() {
    this.productosService.getProductos().subscribe((response) => {
      if (response) {
        console.log(response);
      }
    }, (error) => {
      if (error.status === 403) {
        alert("No tiene permisos");
      } else if (error.status === 404) {
        alert("No se encontraron resultados");
      }
    })
  }
  */

}
