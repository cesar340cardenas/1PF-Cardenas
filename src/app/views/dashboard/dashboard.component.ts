import { Component, OnInit, ViewChild, ElementRef,Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';
/*Se necesita para controlar la actualizacion de la tabla*/
import { MatTable } from '@angular/material/table';
import { Alumno } from '../../models/Alumno';
import { AlumnosService } from '../../services/alumnos.service';
import { API,CONFIG } from 'src/app.config';
import { Observable } from 'rxjs';
 
   
@Component({
  templateUrl: 'dashboard.component.html',
  selector: 'table-basic-example',
  /*Estilo para angular material para que cubra el 100% del ancho del div*/
  styleUrls: ['dashboard.component.css'],
  

}) 


export class DashboardComponent implements OnInit, OnDestroy {
  fecha=new Date();
  imagePath;
  imgURL: any="assets/img/avatars/sin_imagen.png";
  message: string;
  urlApi!:string;
  datos$!:Observable<any>;
  datosSubscripcion!: any;


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
  @ViewChild('mensajeFiltro') public mensajeFiltro: ModalDirective;
  @ViewChild("id_edit") public id_edit: ElementRef;
  @ViewChild("filtro") filtro: ElementRef;
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
  dataSource:any;

 
  
  //alumnos2:any//Alumno[]=[];
  constructor(
    private alumnosService: AlumnosService,
    @Inject(CONFIG)configuracion:API
    ){
    this.urlApi= configuracion.url;
  }

  
  ngOnInit(): void {
   /*this.alumnosService.obtenerAlumnos().then((alumnos)=>{
    this.dataSource=alumnos;
   }).catch((error)=>{

   }).finally(()=>{
    console.log('se ejecuta al final')
   });*/
   this.datos$=this.alumnosService.obtenerAlumnosObservable();
   this.datosSubscripcion= this.datos$.subscribe({
    next:(alumnos)=>{
       this.dataSource=alumnos;
       console.log(alumnos)
    },
    error:(error)=>{
       console.error('sicedio un error '+error)
    }
  });
 }

   ngOnDestroy(): void {
    this.datosSubscripcion.unsubscribe();
   }

  eliminaAlumno(id:number,calificacion:number){
    if(calificacion>5){
      this.mensajeAlerta.show();
      return;
    }
    this.alumnosService.eliminarAlumno(id);
    this.mensajeElimnado.show(); 
    this.table.renderRows()
  }

  editaAlumno(id:number){
    console.log(id);
    let form=this.profileForm;
    let alumnoEdit:any=[];
    if(id>0){
      //let alumno=this.alumnosService.editarAlumno(id);
      this.alumnosService.editarAlumno(id).then((alumno)=>{
      alumnoEdit=alumno;
     }).catch((error)=>{

     }).finally(()=>{
      console.log(alumnoEdit)
       /*this.txtName.nativeElement.value=alumnoEdit.name;
       this.txtPaterno.nativeElement.value=alumnoEdit.lastName;
       this.txtMaterno.nativeElement.value=alumnoEdit.motherLastName;
       this.txtEdad.nativeElement.value=alumnoEdit.age;
       this.txtGen.nativeElement.value=alumnoEdit.gender;
       this.txtCal.nativeElement.value=alumnoEdit.qualification;
       this.txtEmail.nativeElement.value=alumnoEdit.email;
       this.id_edit.nativeElement.value=alumnoEdit.id;
       this.imgURL=alumnoEdit.url;*/
       form.reset({
        name:alumnoEdit.name,
        lastName:alumnoEdit.lastName,
        motherLastName:alumnoEdit.motherLastName,
        age:alumnoEdit.age,
        gender:alumnoEdit.gender,
        qualification:alumnoEdit.qualification,
        email:alumnoEdit.email,
      });
       this.imgURL=alumnoEdit.url;
       this.id_edit.nativeElement.value=alumnoEdit.id;
       
 
     });
    }else{
      form.reset({
        name:"",
        lastName:"",
        motherLastName:"",
        age:"",
        gender:"",
        qualification:"",
        email:"",
      });
       this.id_edit.nativeElement.value=0;
       this.imgURL="assets/img/avatars/sin_imagen.png"
      /* this.txtName.nativeElement.value="";
       this.txtPaterno.nativeElement.value="";
       this.txtMaterno.nativeElement.value="";
       this.txtEdad.nativeElement.value="";
       this.txtGen.nativeElement.value="";
       this.txtCal.nativeElement.value="";
       this.txtEmail.nativeElement.value="";*/
       
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

    let alumno=this.profileForm.value;
    alumno.url=this.imgURL;
     
     if(this.id_edit.nativeElement.value!=0){
       this.alumnosService.agregarAlumno(alumno,this.id_edit.nativeElement.value);
     }else{
      this.alumnosService.agregarAlumno(alumno,0);
     }
      this.table.renderRows();
      this.clean();
      this.formulario.hide();
    
}

filtrar(){
  if(this.filtro.nativeElement.value==""){
    this.mensajeFiltro.show();
    return
  }
this.datos$=this.alumnosService.filtrarAlumno(this.filtro.nativeElement.value);
}

limpiarFiltro(){
this.filtro.nativeElement.value="";
this.datos$=this.alumnosService.obtenerAlumnosObservable()
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

