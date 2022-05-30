import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, map} from "rxjs/operators";
import {CursosService} from "../../services/cursos.service";
import { cargaCursos, cursosCargados } from '../actions/curso.action';


@Injectable()
export class CursosEffects{
   cargarCursosEffect=createEffect(()=>this.actions$.pipe(
     ofType(cargaCursos),
     exhaustMap(()=>this.cursosService.obtenerCursoObservable().pipe(
         map(cursos=>cursosCargados({cursos}))
     	))
   	))

   constructor(private actions$:Actions,
               private cursosService: CursosService 
   	){}
}