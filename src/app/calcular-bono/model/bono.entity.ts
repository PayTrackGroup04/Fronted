export interface Bono {
  valorNominal: number;
  tasaCupon: number;
  tipoTasa: 'Efectiva' | 'Nominal';
  capitalizacion?: 'Quincenal' | 'Mensual' | 'Bimestral' | 'Trimestral' | 'Cuatrimestral' | 'Semestral' | 'Anual';
  frecuenciaPago: number;
  plazoAnios: number;
  graciaTotal: number;
  graciaParcial: number;
  fechaEmision: Date;
  numeroDiasPorAno: 360 | 365;
  cavali: number;
  estructuracion: number;
  colocacion: number;
  metodoAmortizacion: 'Frances';
  moneda: 'Soles' | 'Dolares';
}
