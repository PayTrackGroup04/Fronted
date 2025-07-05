import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

import { NosotrosComponent } from './nosotros/nosotros.component';
import { PrecioComponent } from './precio/precio.component';
import { RegistroBonoComponent } from './calcular-bono/pages/registro-bono.component/registro-bono.component';
import { SignInComponent } from './login/pages/sign-in/sign-in.component';
import { SignUpComponent } from './login/pages/sign-up/sign-up.component';
import { ListadoBonosComponent } from './calcular-bono/pages/listado-bonos.component/listado-bonos.component';
import { authenticationGuard } from './login/services/authentication.guard';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'precio', component: PrecioComponent },
  { path: 'registro', component: RegistroBonoComponent, canActivate: [authenticationGuard] },
  { path: 'bonos', component: ListadoBonosComponent, canActivate: [authenticationGuard] },
  // { path: '**', redirectTo: '' }
];
