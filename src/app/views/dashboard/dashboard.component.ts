import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';
/*Se necesita para controlar la actualizacion de la tabla*/
import { MatTable } from '@angular/material/table';
 
@Component({
  templateUrl: 'dashboard.component.html',
  selector: 'table-basic-example',
  /*Estilo para angular material para que cubra el 100% del ancho del div*/
  styleUrls: ['dashboard.component.css']

}) 




export class DashboardComponent implements OnInit {
  fecha=new Date();
  imagePath;
  imgURL: any="assets/img/avatars/sin_imagen.png";
  message: string;

  /*Estilos para directiva del thead de la tabla*/
  estilos={
   backgroundColor:"#44BAF1",
   fontSize:"15px",
   fontcolor:"white",
  }
  
  
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
  @ViewChild("id_edit") public id_edit: ElementRef;
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
   
/*Reactive form*/
  profileForm = new FormGroup({
     name:  new FormControl('',[Validators.required,Validators.minLength(5)]),
     lastName:  new FormControl('',[Validators.required]),
     motherLastName:  new FormControl('',[Validators.required]),
     age:  new FormControl('',[Validators.required,Validators.maxLength(2),Validators.max(12)]),
     gender:  new FormControl('',[Validators.required]),
     qualification:  new FormControl('',[Validators.required,Validators.max(10)]),
     email:  new FormControl('',[Validators.required,Validators.email]),
  });
 
 /*titulos de las columnas de la tabla*/
  displayedColumns: string[] = 
  [
    "url",
    "name",
    //"lastName",
    "motherLastName",
    "age",
    "gender",
    "qualification",
    "email",
    "acciones"];
  /*variable que tedrá las filas de la columnas*/
  dataSource:any[];

  id:number=5;
   
 /*Listado de alumnos*/
  alumnos:any=[
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

  

  ngOnInit(): void {
    /*A la variable de la tabla se le asiganan los alumnos*/
   this.dataSource=this.alumnos;
  }

  eliminaAlumno(calificacion:number,nombre:string){
    if(calificacion>5){
      this.mensajeAlerta.show();
      return;
    }
    this.alumnos.forEach((element,index)=>{
     if(element.qualification==calificacion&&element.name==nombre&&calificacion<=5){
       this.id--;
       this.alumnos.splice(index,1);
       this.mensajeElimnado.show(); 
     }
    });
   this.table.renderRows();
  }

  editaAlumno(id:number){
    if(id>0){
     this.alumnos.forEach((element,index)=>{
     if(element.id==id){
       this.txtName.nativeElement.value=element.name;
       this.txtPaterno.nativeElement.value=element.lastName;
       this.txtMaterno.nativeElement.value=element.motherLastName;
       this.txtEdad.nativeElement.value=element.age;
       this.txtGen.nativeElement.value=element.gender;
       this.txtCal.nativeElement.value=element.qualification;
       this.txtEmail.nativeElement.value=element.email;
       this.id_edit.nativeElement.value=element.id;
       this.imgURL=element.url;
     }
    });
    }else{
       this.txtName.nativeElement.value="";
       this.txtPaterno.nativeElement.value="";
       this.txtMaterno.nativeElement.value="";
       this.txtEdad.nativeElement.value="";
       this.txtGen.nativeElement.value="";
       this.txtCal.nativeElement.value="";
       this.txtEmail.nativeElement.value="";
       this.id_edit.nativeElement.value=0;
       this.imgURL="assets/img/avatars/sin_imagen.png"
    }
    this.formulario.show(); 
  }

  addAlumno() {
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
     this.id++;
     if(this.id_edit.nativeElement.value!=0){
      console.log(this.id)
     let alumnoEncontrado = this.alumnos.find(i => i.id == this.id_edit.nativeElement.value);
         // alumnoEncontrado.id=this.id;
          alumnoEncontrado.name=this.txtName.nativeElement.value;
          alumnoEncontrado.lastName=this.txtPaterno.nativeElement.value;
          alumnoEncontrado.motherLastName=this.txtMaterno.nativeElement.value; 
          alumnoEncontrado.age=this.txtEdad.nativeElement.value;
          alumnoEncontrado.gender=this.txtGen.nativeElement.value;
          alumnoEncontrado.qualification=this.txtCal.nativeElement.value;
          alumnoEncontrado.url=this.imgURL;
          alumnoEncontrado.email=this.txtEmail.nativeElement.value;
     }else{
      let alumno={
        "id":this.id,
        "name":this.txtName.nativeElement.value,
        "lastName":this.txtPaterno.nativeElement.value,
        "motherLastName":this.txtMaterno.nativeElement.value, 
        "age":this.txtEdad.nativeElement.value,
        "gender":this.txtGen.nativeElement.value,
        "qualification":this.txtCal.nativeElement.value,
        "url":this.imgURL,
        "email":this.txtEmail.nativeElement.value
      };
     // const newArray = [alumno].concat(this.alumnos)
      //this.alumnos=newArray;
     this.alumnos.unshift(alumno)
      //console.log(newArray)
     }
     /*actualiza tabla*/
     this.table.renderRows();
     this.clean();
     this.formulario.hide();
 /*
    //para tabla boostrap
      let alumno={
        "id":this.id,
        "name":this.txtName.nativeElement.value,
        "lastName":this.txtPaterno.nativeElement.value,
        "motherLastName":this.txtMaterno.nativeElement.value, 
        "age":this.txtEdad.nativeElement.value,
        "gender":this.txtGen.nativeElement.value,
        "qualification":this.txtCal.nativeElement.value,
        "url":this.imgURL,
        "email":this.txtEmail.nativeElement.value
      };

  const newArray = [alumno].concat(this.alumnos)
  this.alumnos=newArray;
  console.log(newArray)
  this.clean();
  this.formulario.hide();
 
     */
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

