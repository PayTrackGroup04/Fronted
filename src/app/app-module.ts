import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Registration } from './calculation-bond/pages/registration/registration';
import { RegistroBono } from './calcular-bono/pages/registro-bono/registro-bono';
import { RegistroBonoComponent } from './calcular-bono/pages/registro-bono.component/registro-bono.component';

@NgModule({
  declarations: [
    App,
    Registration,
    RegistroBono,
    RegistroBonoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
