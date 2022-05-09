import { Component, OnInit, ViewChild, ElementRef,Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';
/*Se necesita para controlar la actualizacion de la tabla*/
import { MatTable } from '@angular/material/table';
import { Alumno } from '../../models/Alumno';
import { AlumnosService } from '../../services/alumnos.service';
import { API,CONFIG } from 'src/app.config';
import { Observable } from 'rxjs';
import { AutentificacionService } from '../../services/autentificacion.service';
    
    
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
  editar:boolean;
  eliminar:boolean;
  agregar:boolean;


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
    "motherLastName",
    "age",
    "gender",
    "qualification",
    "email",
    "acciones"];
  /*variable que tedrá las filas de la columnas*/
  dataSource:any;

 
  constructor(
    private alumnosService: AlumnosService,
    @Inject(CONFIG)configuracion:API,
     private auth:AutentificacionService,
    ){
    this.urlApi= configuracion.url;
  }

  
  ngOnInit(): void {
    let usuarioPrmiso:any;
    usuarioPrmiso=this.auth.obtenerUsuarioActual();
    if(usuarioPrmiso.profile=="Admin"){
      this.editar=true;
      this.eliminar=true;
      this.agregar=true;
    }
    if(usuarioPrmiso.profile=="User"){
      this.editar=false;
      this.eliminar=false;
      this.agregar=false;
    }

  this.refresh();
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
    this.refresh();
    this.mensajeElimnado.show(); 
    this.table.renderRows()
  }

  editaAlumno(id:number){
    let form=this.profileForm;
    let alumnoEdit:any=[];
    if(id>0){
      this.alumnosService.editarAlumno(id).then((alumno)=>{
      alumnoEdit=alumno;
     }).catch((error)=>{

     }).finally(()=>{
      console.log(alumnoEdit)
      
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
      this.refresh();
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
this.refresh();
}

clean(){
    this.profileForm.reset();
 }


 refresh(){
    this.datos$=this.alumnosService.obtenerAlumnosObservable();
   this.datosSubscripcion= this.datos$.subscribe({
    next:(alumnos)=>{

       this.dataSource=alumnos;
       this.dataSource.url=this.dataSource.url+(new Date()).getTime()
    },
    error:(error)=>{
       console.error('sicedio un error '+error)
    }
  });
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

