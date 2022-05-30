import {createReducer,ActionReducerMap} from "@ngrx/store";
import { CursoState } from '../models/Curso.state';
import { cursosReducer } from './reducers/curso.reducer';

export interface AppState{
	cursos:CursoState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState>={
	cursos:cursosReducer
}