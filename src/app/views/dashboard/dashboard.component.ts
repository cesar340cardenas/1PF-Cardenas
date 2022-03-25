import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  fecha=new Date();
    profileForm = new FormGroup({
     name:  new FormControl(''),
     lastName:  new FormControl(''),
     motherLastName:  new FormControl(''),
     age:  new FormControl(''),
     gender:  new FormControl(''),
     qualification:  new FormControl(''),
  });
   

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
     if(element.qualification==calificacion&&element.name==nombre&&calificacion<=5){
      
       this.alumnos.splice(index,1);
       alert('eliminado')
       
     }
    });
   
  }

  updateArray() {
    if(this.profileForm.get('name').value==''||
       this.profileForm.get('lastName').value==''||
       this.profileForm.get('motherLastName').value==''||
       this.profileForm.get('age').value==''||
       this.profileForm.get('gender').value==''||
       this.profileForm.get('qualification').value==''){
      console.log(this.profileForm.get('name').value);
    alert("Debes llenar todos los campos");
  return;
    }
 
  let alumno={
    "name":this.profileForm.get('name').value,
    "lastName":this.profileForm.get('lastName').value,
    "motherLastName":this.profileForm.get('motherLastName').value, 
    "age":this.profileForm.get('age').value,
    "gender":this.profileForm.get('gender').value,
    "qualification":this.profileForm.get('qualification').value,
    "url":"assets/img/avatars/sin_imagen.png"
  };

  const newArray = [alumno].concat(this.alumnos) // [ 4, 3, 2, 1 ]
//  this.alumnos.push(alumno);
this.alumnos=newArray;
  console.log(newArray)
  this.clean();

}

clean(){
    this.profileForm.reset();
}
}
