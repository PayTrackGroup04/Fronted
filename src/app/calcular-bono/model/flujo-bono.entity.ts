export interface Bono {
  valorNominal: number;
  tasaCupon: number;
  tipoTasa: 'Efectiva' | 'Nominal';
  capitalizacion?: number;
  frecuenciaPago: number;
  plazoAnios: number;
  graciaTotal: number;
  graciaParcial: number;
  fechaEmision: string;
  cavali: number;
  estructuracion: number;
  colocacion: number;
  metodoAmortizacion: 'Frances';
  moneda: 'Soles' | 'Dolares';
}

export interface Cuota {
  t: number;
  fechaPago: string;
  tipoGracia: string;
  saldoInicial: number;
  interes: number;
  cuota: number;
  amortizacion: number;
  saldoFinal: number;
  flujoNeto: number;
  flujoActualizado: number;
}
