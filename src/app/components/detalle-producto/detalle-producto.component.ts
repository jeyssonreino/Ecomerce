import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
})
export class DetalleProductoComponent implements OnInit {

  id: string = "";
  producto: any;

  constructor(private productoService: ProductosService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private loginService: LoginService,
    public alertController: AlertController) {
    this.producto = [];
  }

  ngOnInit() {
    this.obtenerIdDelProducto();
    this.obtenerProductoPorId(this.id);

  }

  //Método para obtener el Id del producto de la URL
  obtenerIdDelProducto() {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
    })
  }
//Método para obtener el producto mediante su Id
  obtenerProductoPorId(id: string) {
    id = this.id;
    this.productoService.getProductosById(id).subscribe((response) => {
      this.producto = response;
    })
  }

//Método para agregar productos al carrito
  agregarAlCarrito() {
    let token = this.loginService.obtenerToken();
    if (token != null) {
      let idUsuario = this.loginService.obtenerIdUsuario();
      let datos = {
        idProducto: this.id,
        idUsuario: idUsuario
      }
      this.productoService.savePedido(datos).subscribe((response) => {
        if (response) {
          console.log("Producto agregado al carrito exitosamente")
        }
      }, (error) => {
        if (error.status === 201) {
          this.mostrarAlerta('Listo','Agregado al carrito');
        } else {
          alert("Error inesperado");
        }
      })

    } else {
      this.router.navigate(['/login']);
    }


  }

//Método de alerta 
  async mostrarAlerta(header:string,message:string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }



}