import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
})
export class DetalleProductoComponent  implements OnInit {

  id:string = "";
  producto:any;

  constructor(private productoService: ProductosService, private router:Router,private activateRoute: ActivatedRoute) { 
    this.producto = [];
  }

  ngOnInit() {
    this.obtenerIdDelProducto();
    this.obtenerProductoPorId(this.id);


  }

//Método para obtener el Id del producto de la URL
  obtenerIdDelProducto(){
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
    })
  }

  obtenerProductoPorId(id:string){
    id = this.id;
    this.productoService.getProductosById(id).subscribe((response) => {
      this.producto = response;
      console.log(this.producto);
    })
  }





}
