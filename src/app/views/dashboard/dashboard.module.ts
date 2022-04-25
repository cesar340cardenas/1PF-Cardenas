import {  LOCALE_ID,NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BrowserModule } from '@angular/platform-browser';
/*eSTA LIBRERIA ES NECESARIA IMPORTAR PARA USAR LAS DIRECTIVAS*/
import { registerLocaleData,CommonModule } from '@angular/common';
/*libreria para dar formato de hora en diferentes idiomas*/
import localePy from '@angular/common/locales/es-PY';
import { ReactiveFormsModule } from '@angular/forms';

// Modal Component 
import { ModalModule } from 'ngx-bootstrap/modal';
import { CabeceraTablaDirective } from '../../directivas/cabecera-tabla.directive';
import { AlumnoPipe } from '../../pipealumno/alumno.pipe';
import {MatTableModule} from '@angular/material/table';
import { AlumnosService } from '../../services/alumnos.service';
import { CONFIG,ApiConfig } from 'src/app.config';
import { HttpClientModule } from '@angular/common/http';
 
registerLocaleData(localePy, 'es');

@NgModule({
  imports: [
  /*SE IMPORTA AQUI*/
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    MatTableModule,
    HttpClientModule
  ],
  providers: [ 
  { provide: LOCALE_ID, useValue: 'es-Ar' }, 
  AlumnosService,
  {provide:CONFIG,useValue:ApiConfig}
  ],
  declarations: [ 
  DashboardComponent,
  CabeceraTablaDirective,
  AlumnoPipe,
 

  ],
  bootstrap: [DashboardComponent],
})
export class DashboardModule { }
