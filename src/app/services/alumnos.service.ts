import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../models/Alumno';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { API,CONFIG } from 'src/app.config';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private http: HttpClient;
  private API_URl:string;
  private module="Alumnos";

/*alumnos:Alumno[]=[
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
];*/

private observableAlumno: Observable<Alumno[]>;
private subjectAlumno: Subject<Alumno[]>;
private alumnoFiltrado$: Observable<Alumno[]>;

//id:number=5;
  constructor(
    http: HttpClient,
    @Inject(CONFIG)configuracion:API
    ) { 
    this.http=http;
    this.API_URl= configuracion.url;
  }



   obtenerAlumnosObservable(): Observable<any>{
    return this.http.get<Alumno[]>(this.API_URl+this.module);
   }
 
  agregarAlumno(alumno:Alumno,id:number){

    if(id>0){
        return this.http.put(this.API_URl+this.module+"/"+id,alumno).toPromise();
    }else{  
       return this.http.post(this.API_URl+this.module,alumno).toPromise();
    }
  }

  eliminarAlumno(id:number){
   return this.http.delete(this.API_URl+this.module+"/"+id).toPromise()
  }

  editarAlumno(id:number){
    return this.http.get(this.API_URl+this.module+"/"+id).toPromise();
  }

  filtrarAlumno(nombre:string):Observable<Alumno[]>{
    this.alumnoFiltrado$= this.http.get<Alumno[]>(this.API_URl+this.module)
  
   return this.alumnoFiltrado$.pipe(
     map(datos=>datos.filter(alumno=>alumno.name.toLowerCase()==nombre.toLowerCase()))
    );
  }
}
 