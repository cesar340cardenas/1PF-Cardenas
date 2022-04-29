import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutentificacionService } from '../services/autentificacion.service';
import { Router} from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth:AutentificacionService,
    private router: Router
    ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.auth.obtenerSesionActiva()){
      console.log("no tiene sesion activa")
      return this.router.navigate(['']).then((r)=>false);
    }else{
      console.log("si tiene sesion activa")
      return true;
    }
  }
  
}
