import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  private usuarios=[
 {
      full_name:'César Cárdenas',
      email:'cardenas@gmail.com',
      password:'12345678',
      profile:'Admin',
      url:'assets/img/avatars/cesar.jpg'
 },
 {
      full_name:'Rebeca Luna',
      email:'rebeca@gmail.com',
      password:'12345678',
      profile:'User',
      url:'assets/img/avatars/mujer3.jpg'
 },
 ]

  private usuarioActual:any;

 private sesionActiva=false;

  constructor() {
    this.sesionActiva;


   }
obtenerUsuarioslogin(email,password){
let acceso=false;
 for (let i = 0; i < this.usuarios.length; i++) {
  if(this.usuarios[i].email==email&&this.usuarios[i].password==password){
   this.usuarioActual=this.usuarios[i];
   acceso=true;
  }
 
  }
 return acceso;
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