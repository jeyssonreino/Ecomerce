import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './components/home/home.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AuthInterceptor } from './helpers/auth.interceptor';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { CarritoComponent } from './components/carrito/carrito.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticulosComponent,
    DetalleProductoComponent,
    LoginComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot({}),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
