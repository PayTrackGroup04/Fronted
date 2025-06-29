export interface FlujoBono {
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
