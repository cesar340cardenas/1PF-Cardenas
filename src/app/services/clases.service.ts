import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clase } from '../models/Clase';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  private http: HttpClient;

clases:Clase[]=[
{
    "id":1,
    "name":"Laravel: fundamentos básicos de programación en PHP",
    "curso_id":"Laravel",
    "url":"assets/img/avatars/lar.jpg",
    
  },
  
];
 
private observableClase: Observable<Clase[]>;
private subjectclase: Subject<Clase[]>;
private claseFiltrado$: Observable<Clase[]>;

id:number=5;
  constructor(http: HttpClient) { 
    this.http=http
  this.observableClase=new Observable((suscripcion)=>{
    if(this.clases.length>0){
      suscripcion.next(this.clases)
      suscripcion.complete()
    }else{
      suscripcion.error('No hay datos')
    }
    
  })
  this.subjectclase= new Subject();
  this.claseFiltrado$=of(this.clases)
  }

  /*obtenerAlumnos(){
    let p=new Promise((resolve,reject)=>{
      const error=false;
      if(!error){
        resolve(this.clases);
      }else{
        reject('Hubo  un error')
      }
    });
    return p;
  }*/

   obtenerClaseObservable(): Observable<any>{
    //return this.http.get("https://jsonplaceholder.typicode.com/todos")
    return this.observableClase;
   }

  agregarClase(clase:Clase,id:number){

    if(id>0){
        let claseEncontrado = this.clases.find(i => i.id == id);
        claseEncontrado.name=clase.name;
        claseEncontrado.curso_id=clase.curso_id;
    }else{
       clase.id=this.id+1; 
       this.clases.unshift(clase)   
    }

   //this.subjectclase.next(this.clases)
  }

  eliminarClase(id:number){
   this.clases.forEach((element,index)=>{
     if(element.id==id){
       this.id--;
       this.clases.splice(index,1);
     }
    });

  // this.subjectclase.next(this.clases)
  }

  editarClase(id:number){
  
    let p=new Promise((resolve,reject)=>{
      const error=false;
      if(!error){
        let clase:any;
        if(id>0){
         this.clases.forEach((element,index)=>{
         if(element.id==id){
          //return element;
          clase=element
         }
        });
        }
        resolve(clase);
      }else{
        reject('Hubo  un error')
      }
    });
    return p;
  } 

  filtrarClase(nombre:string):Observable<Clase[]>{
   return this.claseFiltrado$.pipe(
     map(datos=>datos.filter(clase=>clase.name.toLowerCase()==nombre.toLowerCase()))
    );
  }
}
 