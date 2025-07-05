export interface Bono {
  id?: number;
  valorNominal: number;
  tasaCupon: number;
  tipoTasa: 'EFECTIVA' | 'NOMINAL';
  capitalizacion?: 'QUINCENAL' | 'MENSUAL' | 'BIMESTRAL' | 'TRIMESTRAL' | 'CUATRIMESTRAL' | 'SEMESTRAL' | 'ANUAL';
  frecuenciaPago: 'QUINCENAL' | 'MENSUAL' | 'BIMESTRAL' | 'TRIMESTRAL' | 'CUATRIMESTRAL' | 'SEMESTRAL' | 'ANUAL';
  plazoAnios: number;
  graciaTotal: number;
  graciaParcial: number;
  fechaEmision: Date;
  numeroDiasPorAno: 360 | 365;
  cavali: number;
  estructuracion: number;
  colocacion: number;
  metodoAmortizacion: 'FRANCES';
  moneda: 'PEN' | 'USD';

}
