import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  fecha=new Date();
  alumnos:any=[
  {
    "name":"Lorena",
    "lastName":"Méndez",
    "motherLastName":"Parado", 
    "age":10,
    "gender":"Femenino",
    "qualification":6,
    "url":"assets/img/avatars/mujer3.jpg"
  },
  {
    "name":"Armando",
    "lastName":"Neto",
    "motherLastName":"Luna",
    "age":9,
    "gender":"Masculino",
    "qualification":5,
    "url":"assets/img/avatars/hombre1.jpg"
  },
  {
    "name":"Claudia",
    "lastName":"Pérez",
    "motherLastName":"Luna",
    "age":11,
    "gender":"Femenino",
    "qualification":10,
    "url":"assets/img/avatars/mujer2.jpg"
  },
  {
    "name":"Héctor",
    "lastName":"Carmona",
    "motherLastName":"Luna",
    "age":5,
    "gender":"Masculino",
    "qualification":5,
    "url":"assets/img/avatars/hombre2.jpg"
  },
  {
    "name":"Paz",
    "lastName":"López",
    "motherLastName":"Luna",
    "age":8,
    "gender":"Femenino",
    "qualification":8,
    "url":"assets/img/avatars/mujer1.jpg"
  }
  ];

  

  ngOnInit(): void {

  }

  eliminaAlumno(calificacion:number,nombre:string){
    if(calificacion>5){
      alert('No puedes eliminarlo esta aprobado')
      return;
    }
    this.alumnos.forEach((element,index)=>{
     if(element.qualification==calificacion&&element.name==nombre&&calificacion==5){
      
       this.alumnos.splice(index,1);
       alert('eliminado')
       
     }
    });
   
  }
}
