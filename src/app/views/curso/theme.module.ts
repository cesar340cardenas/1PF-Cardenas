// Angular
import { CommonModule,registerLocaleData } from '@angular/common';
import { NgModule,LOCALE_ID } from '@angular/core';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';
  
// Theme Routing 
//import { CabeceraTablaDirective } from '../../directivas/cabecera-tabla.directive';
import { ThemeRoutingModule } from './theme-routing.module';
import { CursosService } from '../../services/cursos.service';
import { CONFIG,ApiConfig } from 'src/app.config';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import localePy from '@angular/common/locales/es-PY';


registerLocaleData(localePy, 'es');

 
@NgModule({ 
  imports: [
    CommonModule,
    ThemeRoutingModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  providers: [ 
  { provide: LOCALE_ID, useValue: 'es-Ar' }, 
  CursosService,
  {provide:CONFIG,useValue:ApiConfig}

  ],
  declarations: [
    ColorsComponent,
    TypographyComponent,
    //CabeceraTablaDirective,
  ]
})
export class ThemeModule { }
