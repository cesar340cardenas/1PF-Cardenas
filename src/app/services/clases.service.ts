import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clase } from '../models/Clase';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { API,CONFIG } from 'src/app.config';
 
@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  private http: HttpClient;
  private API_URl:string;
  private module="Clase";
/*
clases:Clase[]=[
{
    "id":1,
    "name":"Laravel: fundamentos básicos de programación en PHP",
    "curso_id":"Laravel",
    "url":"assets/img/avatars/lar.jpg",
    
  },
  
];
 */
private observableClase: Observable<Clase[]>;
private subjectclase: Subject<Clase[]>;
private claseFiltrado$: Observable<Clase[]>;

//id:number=5;
  constructor(
    http: HttpClient,
    @Inject(CONFIG)configuracion:API
    ) { 
    this.http=http;
    this.API_URl= configuracion.url;

  
  }


   obtenerClaseObservable(): Observable<any>{
    return this.http.get<Clase[]>(this.API_URl+this.module)
   }

  agregarClase(clase:Clase,id:number){

    if(id>0){
        return this.http.put(this.API_URl+this.module+"/"+id,clase).toPromise();
    }else{  
       return this.http.post(this.API_URl+this.module,clase).toPromise();
    }
  }

  eliminarClase(id:number){
    return this.http.delete(this.API_URl+this.module+"/"+id).toPromise()
  }

  editarClase(id:number){
  return this.http.get(this.API_URl+this.module+"/"+id).toPromise();
  } 

  filtrarClase(nombre:string):Observable<Clase[]>{
    this.claseFiltrado$= this.http.get<Clase[]>(this.API_URl+this.module)
  
   return this.claseFiltrado$.pipe(
     map(datos=>datos.filter(clase=>clase.name.toLowerCase()==nombre.toLowerCase()))
    );
  }
}
 