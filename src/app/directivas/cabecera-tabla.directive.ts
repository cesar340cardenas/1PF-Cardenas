import { Directive,ElementRef, Input, OnInit } from '@angular/core';

@Directive({ 
  selector: '[appCabeceraTabla]'
})
export class CabeceraTablaDirective implements OnInit{
@Input('appCabeceraTabla') estilos:any;
  constructor(private elemento:ElementRef) { }

  ngOnInit():void{
 this.elemento.nativeElement.style.background=this.estilos.backgroundColor;
 this.elemento.nativeElement.style.fontSize=this.estilos.fontSize;
 this.elemento.nativeElement.style.color=this.estilos.fontcolor;

 }

}
 