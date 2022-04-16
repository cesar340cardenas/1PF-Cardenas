import { InjectionToken } from '@angular/core';

export interface API{
	url:string
}

export const ApiConfig:API={
	url:'google.com'
}

export const CONFIG= new InjectionToken<API>('ApIConfig')