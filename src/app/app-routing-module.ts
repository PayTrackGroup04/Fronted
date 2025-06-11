//import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';

import { NosotrosComponent } from './nosotros/nosotros.component';
import { PrecioComponent } from './precio/precio.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'precio', component: PrecioComponent },
  // { path: '**', redirectTo: 'Inicio' } // Redirige cualquier ruta desconocida al inicio
];


