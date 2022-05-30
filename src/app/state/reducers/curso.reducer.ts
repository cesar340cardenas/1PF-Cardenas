import {createReducer,on} from "@ngrx/store";
import { CursoState } from '../../models/Curso.state';
import { cargaCursos, cursosCargados } from '../actions/curso.action';

export const estadoInicial:CursoState={
  cargando:false,
  cursos:[]

  };

export const cursosReducer=createReducer(
   estadoInicial, 
   on(cargaCursos,(estado)=>{
      return {...estado,cargando:true}
   }),

   on(cursosCargados,(estado,{cursos})=>{
      return {...estado,cargando:false,cursos}
   })
  );