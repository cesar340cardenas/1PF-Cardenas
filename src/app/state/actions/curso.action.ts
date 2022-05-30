import {createAction,props} from "@ngrx/store";
import { Curso } from '../../models/Curso';

export const cargaCursos=createAction(
   '[Lista cursos] carga curso'
	);

export const cursosCargados=createAction(
   '[Lista cursos] cursos cargados',
   props<{cursos:Curso[]}>()
	);