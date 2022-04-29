import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
 private usuarioActual={
      full_name:'Cesar Cardenas',
      email:'cardenas@gmail.com',
      password:'12345678',
      profile:'Admin'
 }

 private sesionActiva=false;

  constructor() {
    this.sesionActiva;
   }


obtenerUsuarioActual(){
 return this.usuarioActual;
}

obtenerSesionActiva(){
return this.sesionActiva;
}

modificarSesion(estado:boolean){
  this.sesionActiva=estado;
  console.log(this.sesionActiva)
}

}