import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroBonoComponent } from './calcular-bono/pages/registro-bono.component/registro-bono.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', component: RegistroBonoComponent }
];

@NgModule({
  imports: [CommonModule, FormsModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
