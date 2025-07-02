import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-configuration-popup',
  imports: [
    FormsModule
  ],
  templateUrl: './configuration-popup.component.html',
  styleUrl: './configuration-popup.component.css'
})
export class ConfigurationPopupComponent {
  @Input() moneda: string = 'Soles';
  @Input() tipoTasa: string = 'Efectiva';
  @Input() capitalizacion: string = 'Mensual';

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ moneda: string; tipoTasa: string; capitalizacion: string }>();


  guardar() {
    this.save.emit({
      moneda: this.moneda,
      tipoTasa: this.tipoTasa,
      capitalizacion: this.capitalizacion
    });
    this.close.emit();
  }
}
