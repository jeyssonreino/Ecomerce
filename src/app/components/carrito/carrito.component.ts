import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {

  idUser: any;
  articulosCarrito: any;
  isModalOpen = false;
  formaPago: string = "";
  ciudad: string = "";
  direccion: string = "";

  constructor(
    private productoService: ProductosService,
    private loginService: LoginService,
    private router: Router) {

    this.articulosCarrito = [];
  }

  ngOnInit() {
    this.cargarCarrito();
  }

  //Método para cargar el carrito de un usuario
  cargarCarrito() {
    let token = this.loginService.obtenerToken();
    if (token) {
      this.idUser = this.loginService.obtenerIdUsuario();
      this.productoService.getCarritoById(this.idUser).subscribe((response) => {
        this.articulosCarrito = response;
      }, (error) => {
        if (error.status === 404) {
          console.log("Aun no tiene articulos en el carrito")
        }
      });
    } else {
      this.router.navigate(["/login"]);
    }

  }

  //Método para eliminar un articulo del carrito por Id del pedido
  eliminarDelCarrito(id: number) {
    this.productoService.deleteCarritoById(id).subscribe((response) => { }, (error) => {
      location.reload();
    })
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  agregarDetallePedido() {
    if (this.formaPago != "" && this.ciudad != "" && this.direccion != "") {
      let idUsuario = this.loginService.obtenerIdUsuario();
      const fechaActual = new Date();
      // Formatea la fecha como "YYYY-MM-DD"
      const fechaFormateada = fechaActual.toISOString().split('T')[0];
      // Formatea la hora como "HH:mm:ss"
      const horaFormateada = fechaActual.toTimeString().split(' ')[0];

      let detallePedido = {
        fechaPedido: fechaFormateada,
        horaPedido: horaFormateada,
        formaPago: this.formaPago,
        ciudad: this.ciudad,
        direccion: this.direccion,
        estado: "Comprado",
        idUsuario: idUsuario
      }
      console.log(detallePedido);
      this.productoService.saveDetallesPedido(detallePedido).subscribe((response) => {
        console.log("Pedido realizado con exito");
        this.isModalOpen = false;
        location.reload();

      }, (error) => {
        if (error.status === 200) {
          console.log("Pedido realizado con exito");
          this.isModalOpen = false;
          location.reload();

        } else {
          console.log("Error inesperado");
        }
      })

    }else{
      console.log("Complete todos los campos!")

    }


  }





}
