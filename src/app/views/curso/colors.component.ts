import { Component, OnInit, ViewChild, ElementRef,Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';
/*Se necesita para controlar la actualizacion de la tabla*/
import { MatTable } from '@angular/material/table';
import { Curso } from '../../models/Curso';
import { CursosService } from '../../services/cursos.service';
import { API,CONFIG } from 'src/app.config';
import { Observable } from 'rxjs';
     
   
@Component({  
  templateUrl: 'colors.component.html',
  selector: 'table-basic-example',
  /*Estilo para angular material para que cubra el 100% del ancho del div*/
  styleUrls: ['theme-component.css'],
})
export class ColorsComponent implements OnInit, OnDestroy  {

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
  @ViewChild("txtTipo") txtTipo: ElementRef;
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
     type:  new FormControl('',[Validators.required]),
   
  }); 

  /*titulos de las columnas de la tabla*/
  displayedColumns: string[] = 
  [
 
    "name",
    //"lastName",
    "type",
    "acciones"
    ];
  /*variable que tedrá las filas de la columnas*/
  dataSource:any;
  constructor( private cursosService: CursosService,
    @Inject(CONFIG)configuracion:API) {
    this.urlApi= configuracion.url;
  }

 
 
  ngOnInit(): void {
    this.datos$=this.cursosService.obtenerCursoObservable();
   this.datosSubscripcion= this.datos$.subscribe({
    next:(cursos)=>{
       this.dataSource=cursos;
       console.log(cursos)
    },
    error:(error)=>{
       console.error('sicedio un error '+error)
    }
  });
  }

  ngOnDestroy(): void {
    this.datosSubscripcion.unsubscribe();
   }

   eliminaCurso(id:number){
    
    this.cursosService.eliminarCurso(id);
    this.mensajeElimnado.show(); 
    this.table.renderRows()
  }

  editaCurso(id:number){
    console.log(id);
    let form=this.profileForm;
    let cursoEdit:any=[];
    if(id>0){
      //let alumno=this.alumnosService.editarAlumno(id);
      this.cursosService.editarCurso(id).then((curso)=>{
      cursoEdit=curso;
     }).catch((error)=>{

     }).finally(()=>{
      console.log(cursoEdit)
       form.reset({
        name:cursoEdit.name,
        type:cursoEdit.type,
      }); 
       this.imgURL=cursoEdit.url;
       this.id_edit.nativeElement.value=cursoEdit.id;
       
 
     });
    }else{
      form.reset({
        name:"",
        tipo:"",
      });
       this.id_edit.nativeElement.value=0;
       this.imgURL="assets/img/avatars/sin_imagen.png" 
    }
    this.formulario.show(); 
  } 

  addCurso() {
    if(this.txtName.nativeElement.value==''||
       this.txtTipo.nativeElement.value==''
      ){
          this.mensajeObligatorio.show();
          return;
    }

    let curso=this.profileForm.value;
    curso.url=this.imgURL;
     
     if(this.id_edit.nativeElement.value!=0){
       this.cursosService.agregarCurso(curso,this.id_edit.nativeElement.value);
     }else{
      this.cursosService.agregarCurso(curso,0);
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
this.datos$=this.cursosService.filtrarCurso(this.filtro.nativeElement.value);
}

limpiarFiltro(){
this.filtro.nativeElement.value="";
this.datos$=this.cursosService.obtenerCursoObservable()
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
