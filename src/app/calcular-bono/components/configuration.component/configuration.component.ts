import {Component, EventEmitter, Output} from '@angular/core';
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

  @Output() openPopup = new EventEmitter<void>();

  abrirPopup() {
    this.openPopup.emit();
  }
}
