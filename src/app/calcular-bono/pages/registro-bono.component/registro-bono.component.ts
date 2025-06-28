import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

@Component({
  selector: 'app-registro-bono',
  templateUrl: './registro-bono.component.html',
  styleUrls: ['./registro-bono.component.css'],
standalone: true,
imports: [CommonModule, FormsModule]

})
export class RegistroBonoComponent {
  bono: Bono = {
    valorNominal: 1000,
    tasaCupon: 0.08,
    tipoTasa: 'Efectiva',
    capitalizacion: 1,
    frecuenciaPago: 2,
    plazoAnios: 3,
    graciaTotal: 0,
    graciaParcial: 1,
    fechaEmision: '2025-06-15',
    cavali: 0.005,
    estructuracion: 0.01,
    colocacion: 0.002,
    metodoAmortizacion: 'Frances',
    moneda: 'Soles'
  };

  cuadro: Cuota[] = [];
  tcea = 0;
  trea = 0;
  duracion = 0;
  duracionModificada = 0;
  convexidad = 0;
  precioBono = 0;

  calcularFlujo(): void {
    const { valorNominal, tasaCupon, tipoTasa, capitalizacion, frecuenciaPago, plazoAnios, graciaTotal, graciaParcial } = this.bono;
    const n = plazoAnios * frecuenciaPago;
    const tasaEfectiva = tipoTasa === 'Nominal'
      ? Math.pow(1 + tasaCupon / (capitalizacion!), capitalizacion! / frecuenciaPago) - 1
      : Math.pow(1 + tasaCupon, 1 / frecuenciaPago) - 1;

    const cuota = valorNominal * (tasaEfectiva / (1 - Math.pow(1 + tasaEfectiva, -n)));
    const cuadro: Cuota[] = [];
    let saldo = valorNominal;
    let fecha = new Date(this.bono.fechaEmision);
    let valorActualTotal = 0;
    let dur = 0;
    let conv = 0;

    for (let t = 1; t <= n; t++) {
      fecha.setMonth(fecha.getMonth() + (12 / frecuenciaPago));
      const tipoGracia = t <= graciaTotal ? 'Total' : t <= graciaTotal + graciaParcial ? 'Parcial' : 'Ninguno';
      let interes = saldo * tasaEfectiva;
      let cuotaFinal = 0;
      let amortizacion = 0;

      if (tipoGracia === 'Total') {
        interes = 0;
      } else if (tipoGracia === 'Parcial') {
        cuotaFinal = interes;
      } else {
        cuotaFinal = cuota;
        amortizacion = cuota - interes;
      }

      const saldoFinal = saldo - amortizacion;
      const flujoNeto = cuotaFinal;
      const flujoActualizado = flujoNeto / Math.pow(1 + tasaEfectiva, t);

      valorActualTotal += flujoActualizado;
      dur += t * flujoActualizado;
      conv += t * (t + 1) * flujoActualizado;

      cuadro.push({
        t,
        fechaPago: fecha.toISOString().split('T')[0],
        tipoGracia,
        saldoInicial: saldo,
        interes,
        cuota: cuotaFinal,
        amortizacion,
        saldoFinal,
        flujoNeto,
        flujoActualizado
      });

      saldo = saldoFinal;
    }

    this.cuadro = cuadro;
    this.tcea = Math.pow(valorNominal / valorActualTotal, frecuenciaPago) - 1;
    this.duracion = dur / valorActualTotal;
    this.duracionModificada = this.duracion / (1 + tasaEfectiva);
    this.convexidad = conv / (Math.pow(1 + tasaEfectiva, 2) * valorActualTotal);
    this.precioBono = valorActualTotal;

    this.calcularTREA();
  }

  calcularTREA(): void {
    let tasa = 0.01;
    const precision = 0.0000001;
    const maxIter = 100;
    let diferencia;
    let iter = 0;

    do {
      const vp = this.cuadro.reduce((acc, cuota) => acc + cuota.flujoNeto / Math.pow(1 + tasa, cuota.t), 0);
      diferencia = this.precioBono - vp;
      const derivada = this.cuadro.reduce((acc, cuota) => acc - cuota.t * cuota.flujoNeto / Math.pow(1 + tasa, cuota.t + 1), 0);
      const nuevaTasa = tasa - diferencia / derivada;
      if (Math.abs(nuevaTasa - tasa) < precision) break;
      tasa = nuevaTasa;
    } while (++iter < maxIter);

    this.trea = Math.pow(1 + tasa, this.bono.frecuenciaPago) - 1;
  }
}
