import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importar esto para usar routerLink

@Component({
  selector: 'app-navbar',
  standalone: true,
   imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {}
