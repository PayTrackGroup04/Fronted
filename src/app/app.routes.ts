import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';

import { NosotrosComponent } from './nosotros/nosotros.component';
import { PrecioComponent } from './precio/precio.component';
import { RegistroBonoComponent } from './calcular-bono/pages/registro-bono.component/registro-bono.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'precio', component: PrecioComponent },
  { path: 'registro', component: RegistroBonoComponent }
  // { path: '**', redirectTo: '' }
];
