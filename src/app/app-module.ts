import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { RegistroBonoComponent } from './calcular-bono/pages/registro-bono.component/registro-bono.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    RegistroBonoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
