export interface Bono {
  valorNominal: number;
  tasaCupon: number;
  tipoDeTasa: 'Nominal' | 'Efectiva';
  capitalizacion: 'Mensual' | 'Bimestral' | 'Trimestral' | 'Semestral' | 'Anual';
  frecuenciaPago: number;
  plazo: number;
  graciaTotal: number;
  graciaParcial: number;
  fechaInicio: Date;
}
