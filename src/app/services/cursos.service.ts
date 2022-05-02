import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from '../models/Curso';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { API,CONFIG } from 'src/app.config';
  
@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private http: HttpClient;
  private API_URl:string;
  private module="Curso";
/*
cursos:Curso[]=[
{
    "id":1,
    "name":"Laravel",
    "type":"PHP",
    
  },
  
];*/
 
private observableCurso: Observable<Curso[]>;
private subjectCurso: Subject<Curso[]>;
private cursoFiltrado$: Observable<Curso[]>;

//id:number=5;
  constructor(
    http: HttpClient,
    @Inject(CONFIG)configuracion:API
    ) { 
    this.http=http;
    this.API_URl= configuracion.url;

  }


   obtenerCursoObservable(): Observable<any>{
    return this.http.get<Curso[]>(this.API_URl+this.module)
   }

  agregarCurso(curso:Curso,id:number){

    if(id>0){
        return this.http.put(this.API_URl+this.module+"/"+id,curso).toPromise();
    }else{  
       return this.http.post(this.API_URl+this.module,curso).toPromise();
    }
  }

  eliminarCurso(id:number){
   return this.http.delete(this.API_URl+this.module+"/"+id).toPromise()
  }

  editarCurso(id:number){
   return this.http.get(this.API_URl+this.module+"/"+id).toPromise();
  }

  filtrarCurso(nombre:string):Observable<Curso[]>{
    this.cursoFiltrado$= this.http.get<Curso[]>(this.API_URl+this.module)
  
   return this.cursoFiltrado$.pipe(
     map(datos=>datos.filter(curso=>curso.name.toLowerCase()==nombre.toLowerCase()))
    );
  }
}
 