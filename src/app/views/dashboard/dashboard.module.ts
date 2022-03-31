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
    ModalModule.forRoot()
  ],
   providers: [ { provide: LOCALE_ID, useValue: 'es-Ar' } ],
  declarations: [ 
  DashboardComponent,
  ]
})
export class DashboardModule { }
