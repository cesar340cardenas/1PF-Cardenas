import { Curso } from './Curso';

export interface CursoState{
	cargando:boolean,
	cursos:Curso[],
}