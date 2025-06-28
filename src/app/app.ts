import { Component } from '@angular/core';
import { RegistroBonoComponent } from './calcular-bono/pages/registro-bono.component/registro-bono.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<app-registro-bono></app-registro-bono>`,
  imports: [RegistroBonoComponent],
  styleUrls: ['./app.css']
})
export class App{
  protected title = 'PayTrack-Fronted';
}
