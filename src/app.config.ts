import { InjectionToken } from '@angular/core';

export interface API{
	url?:string
}

export const ApiConfig:API={
	url:'https://626f2c7df75bcfbb35746673.mockapi.io/coder/'
}

export const CONFIG= new InjectionToken<API>('ApIConfig')