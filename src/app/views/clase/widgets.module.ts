import { NgModule,LOCALE_ID  } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { WidgetsComponent } from './widgets.component';
import { WidgetsRoutingModule } from './widgets-routing.module';
import { CommonModule,registerLocaleData } from '@angular/common';

  
import { ClasesService } from '../../services/clases.service';
import { CONFIG,ApiConfig } from 'src/app.config';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import localePy from '@angular/common/locales/es-PY';
registerLocaleData(localePy, 'es');

@NgModule({ 
  imports: [
    WidgetsRoutingModule,
    ChartsModule,
    CommonModule,
    BsDropdownModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
  ],
  providers: [ 
  { provide: LOCALE_ID, useValue: 'es-Ar' }, 
  ClasesService,
  {provide:CONFIG,useValue:ApiConfig}

  ],
  declarations: [ WidgetsComponent ]
})
export class WidgetsModule { }
