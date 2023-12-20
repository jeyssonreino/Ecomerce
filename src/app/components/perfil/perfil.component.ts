import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent  implements OnInit {

  usuario:any;

  constructor( private router:Router,
     private loginService: LoginService,
     private usuarioService: UsuarioService) {

    this.usuario = [];
      }

  ngOnInit() {
    this.redireccionarLogin();
  }

  redireccionarLogin(){
    let token = this.loginService.obtenerToken();
    if(!token){
      this.router.navigate(["/login"]);
    }else{
      this.obtenerUsuarioPorId();
    }
  }


  //Servicio para obtener un usuario por Id
  obtenerUsuarioPorId(){
    let id:any = this.loginService.obtenerIdUsuario();
    this.usuarioService.getUsuarioByIde(id).subscribe((response) => {
      this.usuario = response;
    })
  }

  logout(){
    this.loginService.eliminarIdUser();
    this.loginService.eliminarEmailUser();
    this.loginService.eliminarToken()
    this.router.navigate(["/login"]);
  }



}
