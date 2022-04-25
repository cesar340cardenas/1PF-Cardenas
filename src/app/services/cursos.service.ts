import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from '../models/Curso';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private http: HttpClient;

cursos:Curso[]=[
{
    "id":1,
    "name":"Laravel",
    "type":"PHP",
    
  },
  
];
 
private observableCurso: Observable<Curso[]>;
private subjectCurso: Subject<Curso[]>;
private cursoFiltrado$: Observable<Curso[]>;

id:number=5;
  constructor(http: HttpClient) { 
    this.http=http
  this.observableCurso=new Observable((suscripcion)=>{
    if(this.cursos.length>0){
      suscripcion.next(this.cursos)
      suscripcion.complete()
    }else{
      suscripcion.error('No hay datos')
    }
    
  })
  this.subjectCurso= new Subject();
  this.cursoFiltrado$=of(this.cursos)
  }

  /*obtenerAlumnos(){
    let p=new Promise((resolve,reject)=>{
      const error=false;
      if(!error){
        resolve(this.cursos);
      }else{
        reject('Hubo  un error')
      }
    });
    return p;
  }*/

   obtenerCursoObservable(): Observable<any>{
    //return this.http.get("https://jsonplaceholder.typicode.com/todos")
    return this.observableCurso;
   }

  agregarCurso(curso:Curso,id:number){

    if(id>0){
        let cursoEncontrado = this.cursos.find(i => i.id == id);
        cursoEncontrado.name=curso.name;
        cursoEncontrado.type=curso.type;
    }else{
       curso.id=this.id+1; 
       console.log(curso)
       this.cursos.unshift(curso)   
    }

   //this.subjectCurso.next(this.cursos)
  }

  eliminarCurso(id:number){
   this.cursos.forEach((element,index)=>{
     if(element.id==id){
       this.id--;
       this.cursos.splice(index,1);
     }
    });

  // this.subjectCurso.next(this.cursos)
  }

  editarCurso(id:number){
   /* let alumno:any;
    if(id>0){
     this.cursos.forEach((element,index)=>{
     if(element.id==id){
      //return element;
      alumno=element
     }
    });
    }
    return alumno*/

    let p=new Promise((resolve,reject)=>{
      const error=false;
      if(!error){
        let curso:any;
        if(id>0){
         this.cursos.forEach((element,index)=>{
         if(element.id==id){
          //return element;
          curso=element
         }
        });
        }
        resolve(curso);
      }else{
        reject('Hubo  un error')
      }
    });
    return p;
  }

  filtrarCurso(nombre:string):Observable<Curso[]>{
   return this.cursoFiltrado$.pipe(
     map(datos=>datos.filter(curso=>curso.name.toLowerCase()==nombre.toLowerCase()))
    );
  }
}
 