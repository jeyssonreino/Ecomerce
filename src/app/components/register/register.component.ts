import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  nombre1: string = "";
  nombre2: string = "";
  apellido1: string = "";
  apellido2: string = "";
  fechaNacimiento: string = "";
  sexo: string = "";
  telefono: string = "";
  correo: string = "";
  contrasena: string = "";
  passwordConfirm: string = "";

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() { }

  registrar() {
    
    if (this.contrasena === this.passwordConfirm) {
      let datos = {
        nombre1: this.nombre1,
        nombre2: this.nombre2,
        apellido1: this.apellido1,
        apellido2: this.apellido2,
        fechaNacimiento: this.fechaNacimiento,
        sexo: this.sexo,
        telefono: this.telefono,
        correo: this.correo,
        contrasena: this.contrasena
      }

      this.usuarioService.saveUsuario(datos).subscribe((response) => {
        console.log("registrado exitosamente")
      }, (error) => {
        if (error.status === 200) {
          this.router.navigate(["/login"]);
        }

      })

    }else{
      alert("Contraseñas no coinciden");
    }




  }

}
