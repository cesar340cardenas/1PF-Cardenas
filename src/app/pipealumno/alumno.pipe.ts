import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alumno'
})
export class AlumnoPipe implements PipeTransform {

  transform(nombre: string,apellidoPat?: string,): string {
    return nombre +" "+ apellidoPat;
  }

}
