import { Component } from '@angular/core';
import { RegistroBonoComponent } from './calcular-bono/pages/registro-bono.component/registro-bono.component';
import { RouterModule } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  styleUrl: './app.css'
})
export class App {
  protected title = 'PayTrack-Fronted';
}
