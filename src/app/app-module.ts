import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';

import { RegistroBonoComponent } from './calcular-bono/pages/registro-bono.component/registro-bono.component';
import {MatIcon} from '@angular/material/icon';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RegistroBonoComponent,
    MatIcon,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
