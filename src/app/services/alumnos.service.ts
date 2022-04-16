import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../models/Alumno';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private http: HttpClient;

alumnos:Alumno[]=[
{
    "id":1,
    "name":"Lorena",
    "lastName":"Méndez",
    "motherLastName":"Parado", 
    "age":10,
    "gender":"Femenino",
    "qualification":6,
    "url":"assets/img/avatars/mujer3.jpg",
    "email":"lm@gmail.com"
  },
  {
    "id":2,
    "name":"Armando",
    "lastName":"Neto",
    "motherLastName":"Luna",
    "age":9,
    "gender":"Masculino",
    "qualification":5,
    "url":"assets/img/avatars/hombre1.jpg",
    "email":"armany@hotmail.com"
  },
  {
    "id":3,
    "name":"Claudia",
    "lastName":"Pérez",
    "motherLastName":"Luna",
    "age":11,
    "gender":"Femenino",
    "qualification":10,
    "url":"assets/img/avatars/mujer2.jpg",
    "email":"clau.p@gmail.com"
  },
  {
    "id":4,
    "name":"Héctor",
    "lastName":"Carmona",
    "motherLastName":"Luna",
    "age":5,
    "gender":"Masculino",
    "qualification":5,
    "url":"assets/img/avatars/hombre2.jpg",
    "email":"hec123@gmail.com"
  },
  {
    "id":5,
    "name":"Paz",
    "lastName":"López",
    "motherLastName":"Luna",
    "age":8,
    "gender":"Femenino",
    "qualification":8,
    "url":"assets/img/avatars/mujer1.jpg",
    "email":"peace@hotmail.com"
  }
];

private observableAlumno: Observable<Alumno[]>;
private subjectAlumno: Subject<Alumno[]>;
private alumnoFiltrado$: Observable<Alumno[]>;

id:number=5;
  constructor(http: HttpClient) { 
    this.http=http
  this.observableAlumno=new Observable((suscripcion)=>{
    if(this.alumnos.length>0){
      suscripcion.next(this.alumnos)
      suscripcion.complete()
    }else{
      suscripcion.error('No hay datos')
    }
    
  })
  this.subjectAlumno= new Subject();
  this.alumnoFiltrado$=of(this.alumnos)
  }

  /*obtenerAlumnos(){
    let p=new Promise((resolve,reject)=>{
      const error=false;
      if(!error){
        resolve(this.alumnos);
      }else{
        reject('Hubo  un error')
      }
    });
    return p;
  }*/

   obtenerAlumnosObservable(): Observable<any>{
    //return this.http.get("https://jsonplaceholder.typicode.com/todos")
    return this.observableAlumno;
   }

  agregarAlumno(alumno:Alumno,id:number){

    if(id>0){
        let alumnoEncontrado = this.alumnos.find(i => i.id == id);
        alumnoEncontrado.name=alumno.name;
        alumnoEncontrado.lastName=alumno.lastName;
        alumnoEncontrado.motherLastName=alumno.motherLastName; 
        alumnoEncontrado.age=alumno.age;
        alumnoEncontrado.gender=alumno.gender;
        alumnoEncontrado.qualification=alumno.qualification;
        alumnoEncontrado.url=alumno.url;
        alumnoEncontrado.email=alumno.email;
    }else{
       alumno.id=this.id+1; 
       this.alumnos.unshift(alumno)   
    }

   //this.subjectAlumno.next(this.alumnos)
  }

  eliminarAlumno(id:number){
   this.alumnos.forEach((element,index)=>{
     if(element.id==id){
       this.id--;
       this.alumnos.splice(index,1);
     }
    });

  // this.subjectAlumno.next(this.alumnos)
  }

  editarAlumno(id:number){
   /* let alumno:any;
    if(id>0){
     this.alumnos.forEach((element,index)=>{
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
        let alumno:any;
        if(id>0){
         this.alumnos.forEach((element,index)=>{
         if(element.id==id){
          //return element;
          alumno=element
         }
        });
        }
        resolve(alumno);
      }else{
        reject('Hubo  un error')
      }
    });
    return p;
  }

  filtrarAlumno(nombre:string):Observable<Alumno[]>{
   return this.alumnoFiltrado$.pipe(
     map(datos=>datos.filter(alumno=>alumno.name==nombre))
    );
  }
}
 