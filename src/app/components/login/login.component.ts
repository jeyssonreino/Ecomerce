import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  username:string = "";
  password:string = "***************";

  constructor( private loginService: LoginService, private router: Router) { }

  ngOnInit() {}

  iniciarSession() {
    let datos = {
      username: this.username,
      password: this.password
    }
    this.loginService.loguearUsuario(datos).subscribe((response)=> {
      this.router.navigate([''])
    },(error) =>{
      alert("Correo electronico o contraseña incorrectos, intente de nuevo");
    })
  }





}
