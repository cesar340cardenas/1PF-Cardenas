import {createSelector} from "@ngrx/store";
import { AppState } from '../app.state';
import { CursoState } from '../../models/Curso.state';

export const selectorCurso=(state: AppState)=>state.cursos;

export const selectorCargandoCursos=createSelector(
   selectorCurso,
   (state:CursoState)=>state.cargando
	) 

export const selectorListaCursos=createSelector(
   selectorCurso,
   (state:CursoState)=>state.cursos
	)