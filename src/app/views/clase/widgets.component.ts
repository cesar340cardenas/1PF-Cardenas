import { Component, OnInit, ViewChild, ElementRef,Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';
/*Se necesita para controlar la actualizacion de la tabla*/
import { MatTable } from '@angular/material/table';
import { Clase } from '../../models/Clase';
import { ClasesService } from '../../services/clases.service';
import { API,CONFIG } from 'src/app.config';
import { Observable } from 'rxjs';
   
@Component({
  templateUrl: 'widgets.component.html',
  selector: 'table-basic-example',
   styleUrls: ['widgets-component.css'],
})
export class WidgetsComponent implements OnInit, OnDestroy{

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
  @ViewChild("txtCurso_id") txtCurso_id: ElementRef;
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
     curso_id:  new FormControl('',[Validators.required]),
  });

  /*titulos de las columnas de la tabla*/
  displayedColumns: string[] = 
  [
    "url",
    "name",
    //"lastName",
    "curso_id",
    "acciones"
    ];
  /*variable que tedrá las filas de la columnas*/
  dataSource:any;
  constructor( private clasesService: ClasesService,
    @Inject(CONFIG)configuracion:API) {
    this.urlApi= configuracion.url;
  }
 
   ngOnInit(): void {
    this.datos$=this.clasesService.obtenerClaseObservable();
   this.datosSubscripcion= this.datos$.subscribe({
    next:(clases)=>{
       this.dataSource=clases;
       console.log(clases)
    },
    error:(error)=>{
       console.error('sicedio un error '+error)
    }
  });
  }

  ngOnDestroy(): void {
    this.datosSubscripcion.unsubscribe();
   }

   eliminaClase(id:number){
    
    this.clasesService.eliminarClase(id);
    this.mensajeElimnado.show(); 
    this.table.renderRows()
  }

  editaClase(id:number){
    console.log(id);
    let form=this.profileForm;
    let claseEdit:any=[];
    if(id>0){
      //let alumno=this.alumnosService.editarAlumno(id);
      this.clasesService.editarClase(id).then((clase)=>{
      claseEdit=clase;
     }).catch((error)=>{

     }).finally(()=>{
      console.log(claseEdit)
       form.reset({
        name:claseEdit.name,
        type:claseEdit.curso_id,
      });
       this.imgURL=claseEdit.url;
       this.id_edit.nativeElement.value=claseEdit.id;
       
 
     });
    }else{
      form.reset({
        name:"",
        curso_id:"",
      });
       this.id_edit.nativeElement.value=0;
       this.imgURL="assets/img/avatars/sin_imagen.png" 
    }
    this.formulario.show(); 
  }

  addClase() {
    if(this.txtName.nativeElement.value==''||
       this.txtCurso_id.nativeElement.value==''
      ){
          this.mensajeObligatorio.show();
          return;
    }

    let clase=this.profileForm.value;
    clase.url=this.imgURL;
     
     if(this.id_edit.nativeElement.value!=0){
       this.clasesService.agregarClase(clase,this.id_edit.nativeElement.value);
     }else{
      this.clasesService.agregarClase(clase,0);
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
this.datos$=this.clasesService.filtrarClase(this.filtro.nativeElement.value);
}

limpiarFiltro(){
this.filtro.nativeElement.value="";
this.datos$=this.clasesService.obtenerClaseObservable()
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
