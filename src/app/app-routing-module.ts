//import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroBonoComponent } from './calcular-bono/pages/registro-bono.component/registro-bono.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';

import { NosotrosComponent } from './nosotros/nosotros.component';
import { PrecioComponent } from './precio/precio.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  { path: '', component: RegistroBonoComponent }
];

@NgModule({
  imports: [CommonModule, FormsModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule {
   Routes = [
    { path: '', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'precio', component: PrecioComponent },
    // { path: '**', redirectTo: 'Inicio' } // Redirige cualquier ruta desconocida al inicio
  ];
}



