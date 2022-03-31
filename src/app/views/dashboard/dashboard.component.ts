import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';

 
@Component({
  templateUrl: 'dashboard.component.html'
}) 

export class DashboardComponent implements OnInit {
  fecha=new Date();
  public imagePath;
  imgURL: any="assets/img/avatars/sin_imagen.png";
  public message: string;
 
  
  @ViewChild("txtName") txtName: ElementRef;
  @ViewChild("txtPaterno") txtPaterno: ElementRef;
  @ViewChild("txtMaterno") txtMaterno: ElementRef;
  @ViewChild("txtEdad") txtEdad: ElementRef;
  @ViewChild("txtCal") txtCal: ElementRef;
  @ViewChild("txtGen") txtGen: ElementRef;
  @ViewChild("txtEmail") txtEmail: ElementRef;
  @ViewChild('formulario') public formulario: ModalDirective;
  @ViewChild('mensajeElimnado') public mensajeElimnado: ModalDirective;
  @ViewChild('mensajeAlerta') public mensajeAlerta: ModalDirective;
  @ViewChild('mensajeObligatorio') public mensajeObligatorio: ModalDirective;
   

    profileForm = new FormGroup({
     name:  new FormControl('',[Validators.required,Validators.minLength(5)]),
     lastName:  new FormControl('',[Validators.required]),
     motherLastName:  new FormControl('',[Validators.required]),
     age:  new FormControl('',[Validators.required,Validators.maxLength(2),Validators.max(12)]),
     gender:  new FormControl('',[Validators.required]),
     qualification:  new FormControl('',[Validators.required,Validators.max(10)]),
     email:  new FormControl('',[Validators.required,Validators.email]),
  });
   

  alumnos:any=[
  {
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

  

  ngOnInit(): void {

  }

  eliminaAlumno(calificacion:number,nombre:string){
    if(calificacion>5){
      this.mensajeAlerta.show();
      return;
    }
    this.alumnos.forEach((element,index)=>{
     if(element.qualification==calificacion&&element.name==nombre&&calificacion<=5){
      
       this.alumnos.splice(index,1);
       this.mensajeElimnado.show(); 
       
     }
    });
   
  }

  updateArray() {
    if(this.txtName.nativeElement.value==''||
       this.txtPaterno.nativeElement.value==''||
       this.txtMaterno.nativeElement.value==''||
       this.txtEdad.nativeElement.value==''||
       this.txtGen.nativeElement.value==''||
       this.txtCal.nativeElement.value==''||
       this.txtEmail.nativeElement.value==''){
     this.mensajeObligatorio.show();


  return;
    }
  let alumno={
    "name":this.txtName.nativeElement.value,
    "lastName":this.txtPaterno.nativeElement.value,
    "motherLastName":this.txtMaterno.nativeElement.value, 
    "age":this.txtEdad.nativeElement.value,
    "gender":this.txtGen.nativeElement.value,
    "qualification":this.txtCal.nativeElement.value,
    "url":this.imgURL,
    "email":this.txtEmail.nativeElement.value
  };

  const newArray = [alumno].concat(this.alumnos) // [ 4, 3, 2, 1 ]
//  this.alumnos.push(alumno);
this.alumnos=newArray;
  console.log(newArray)
  this.clean();
  this.formulario.hide();

}

clean(){
    this.profileForm.reset();
 }

 preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
}
