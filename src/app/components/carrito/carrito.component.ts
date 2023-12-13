import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent  implements OnInit {

  idUser:any;
  articulosCarrito:any;

  constructor(
    private productoService: ProductosService, 
    private  loginService: LoginService,
    private router: Router) { 

      this.articulosCarrito = [];
    }

  ngOnInit() {
    this.cargarCarrito();
  }

  //Método para cargar el carrito de un usuario
  cargarCarrito(){
    let token = this.loginService.obtenerToken();
    if(token){
      this.idUser = this.loginService.obtenerIdUsuario();
      this.productoService.getCarritoById(this.idUser).subscribe((response) => {
        this.articulosCarrito = response;
      },(error) => {
        if(error.status === 404){
          console.log("Aun no tiene articulos en el carrito")
        }
      });
    }else{
      this.router.navigate(["/login"]);
    }

  }

  eliminarDelCarrito(id:number){
    this.productoService.deleteCarritoById(id).subscribe((response) => {}, (error) => {
      location.reload();
    })


  }



}
