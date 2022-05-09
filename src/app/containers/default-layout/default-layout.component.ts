import {Component,OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { AutentificacionService } from '../../services/autentificacion.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent  implements OnInit{
  public sidebarMinimized = false;
  public navItems = navItems;
  dataUser!:any;
  constructor(private auth:AutentificacionService,private router: Router){

  }

  ngOnInit(): void {
    let usuarioPrmiso:any;
    usuarioPrmiso=this.auth.obtenerUsuarioActual();
    this.dataUser=usuarioPrmiso;
    console.log(usuarioPrmiso);
 
 }

 logout(){
  this.auth.modificarSesion(false);
  this.router.navigate(['']).then((r)=>true)
 }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
