import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  imports: [
    MatIcon
  ],
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {
  constructor(private router: Router) {}

  goToConfig() {
    this.router.navigate(['/configuracion']);
  }
}
