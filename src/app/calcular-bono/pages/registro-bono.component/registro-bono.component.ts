import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Bono} from '../../model/bono.entity';
import {FlujoBono} from '../../model/flujo-bono.entity';

@Component({
  selector: 'app-registro-bono',
  templateUrl: './registro-bono.component.html',
  styleUrls: ['./registro-bono.component.css'],
standalone: true,
imports: [CommonModule, FormsModule]

})
export class RegistroBonoComponent {
  bono: Bono = {
    valorNominal: 10000,
    tasaCupon: 0.08,
    tipoTasa: 'Efectiva',
    capitalizacion: 'Mensual',
    frecuenciaPago: 'Mensual',
    plazoAnios: 3,
    graciaTotal: 0,
    graciaParcial: 1,
    fechaEmision: new Date(),
    numeroDiasPorAno: 360,
    cavali: 0.005,
    estructuracion: 0.01,
    colocacion: 0.002,
    metodoAmortizacion: 'Frances',
    moneda: 'Soles'
  };

  flujoBono: FlujoBono[] = [];
  tcea = 0;
  trea = 0;
  duracion = 0;
  duracionModificada = 0;
  convexidad = 0;
  precioBono = 0;


  calcularFlujo(): void {
    const n = this.bono.plazoAnios * this.periodosPorAno(this.bono.frecuenciaPago);
    const tasaEfectiva = this.obtenerTasaEfectiva(this.bono);
    const cuota = this.calcularCuota(this.bono.valorNominal, tasaEfectiva, n);


    const flujo: FlujoBono[] = [];
    let saldo = this.bono.valorNominal;
    let fecha = new Date(this.bono.fechaEmision);
    let valorActualTotal = 0;
    let dur = 0;
    let conv = 0;
    let flujoArrayEmisor = [];
    let flujoArrayInversionista = [];
    flujoArrayInversionista.push(-this.bono.valorNominal);
    flujoArrayEmisor.push(this.bono.valorNominal - (this.bono.valorNominal * this.bono.cavali) - (this.bono.valorNominal * this.bono.estructuracion) - (this.bono.valorNominal * this.bono.colocacion));

    flujo.push({
      t: 0,
      fechaPago: fecha.toISOString().split('T')[0],
      tipoGracia: '',
      saldoInicial: 0,
      interes: 0,
      cuota: 0,
      amortizacion: 0,
      saldoFinal: 0,
      flujoNeto: -this.bono.valorNominal,
      flujoActualizado: -this.bono.valorNominal
    });

    for (let t = 1; t <= n; t++) {
      fecha.setMonth(fecha.getMonth() + (12 / this.frecuenciaNumerica(this.bono.frecuenciaPago)));
      const tipoGracia = t <= this.bono.graciaTotal ? 'Total' : t <= this.bono.graciaTotal + this.bono.graciaParcial ? 'Parcial' : 'Ninguno';

      let interes = saldo * tasaEfectiva;
      let cuotaFinal = 0;
      let amortizacion = 0;

      if (tipoGracia === 'Total') {
        interes = 0;
        amortizacion = 0;
      } else if (tipoGracia === 'Parcial') {
        cuotaFinal = interes;
        amortizacion = 0;
      } else {
        cuotaFinal = cuota;
        amortizacion = cuota - interes;
      }

      const saldoFinal = saldo - amortizacion;
      const flujoNeto = cuotaFinal;
      flujoArrayEmisor.push(-cuotaFinal);
      flujoArrayInversionista.push(cuotaFinal);
      const factorDescuento = 1 / Math.pow(1 + tasaEfectiva, t);
      const flujoActualizado = flujoNeto * factorDescuento;

      valorActualTotal += flujoActualizado;
      dur += t * flujoActualizado;
      conv += t * (t + 1) * flujoActualizado;

      flujo.push({
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

    this.flujoBono = flujo;
    console.log(flujoArrayEmisor);
    const tirE = this.calcularTIR(flujoArrayEmisor);
    const tirI = this.calcularTIR(flujoArrayInversionista);
    this.tcea = Math.pow(1 + tirE, this.periodosPorAno(this.bono.frecuenciaPago)) - 1;
    this.trea = Math.pow(1 + tirI, this.periodosPorAno(this.bono.frecuenciaPago)) - 1;
    this.duracion = dur / valorActualTotal;
    this.duracionModificada = this.duracion / (1 + tasaEfectiva);
    this.convexidad = conv / (Math.pow(1 + tasaEfectiva, 2) * valorActualTotal);
    this.precioBono = valorActualTotal;

    //this.calcularTREA();
  }

  private calcularCuota(pv: number, tasaEfectiva: number, n: number): number {
    let cuota;
    cuota = pv * ((tasaEfectiva * Math.pow(1 + tasaEfectiva, n))/ (Math.pow(1 + tasaEfectiva, n) - 1));
    return cuota;
  }

  private obtenerTasaEfectiva(bono: Bono): number {
    const r = bono.tasaCupon / 100;
    const m = this.periodosPorAno(bono.capitalizacion ?? 'Mensual');
    const f = this.frecuenciaNumerica(bono.frecuenciaPago);
    const d = bono.numeroDiasPorAno;

    if (bono.tipoTasa === 'Nominal') {
      return Math.pow(1 + (r / m), m / f) - 1;
    } else { // Efectiva
      return Math.pow(1 + r, ((f * 30) / d)) - 1;
    }
  }

  private periodosPorAno(cap: string | number): number {
    switch (cap) {
      case 'Quincenal':
      case 15:
        return 24;
      case 'Mensual':
      case 1:
        return 12;
      case 'Bimestral':
      case 2:
        return 6;
      case 'Trimestral':
      case 3:
        return 4;
      case 'Cuatrimestral':
      case 4:
        return 3;
      case 'Semestral':
      case 6:
        return 2;
      case 'Anual':
      case 12:
        return 1;
      default: return 1;
    }
  }

  private frecuenciaNumerica(frec: string): number {
    switch (frec) {
      case 'Quincenal':
        return 15;
      case 'Mensual':
        return 1;
      case 'Bimestral':
        return 2;
      case 'Trimestral':
        return 3;
      case 'Cuatrimestral':
        return 4;
      case 'Semestral':
        return 6;
      case 'Anual':
        return 12;
      default:
        return 1;
    }
  }

  private calcularTIR(flujos: number[], guess: number = 0.1): number {
    const maxIter = 1000;
    const precision = 1e-7;
    let rate = guess;

    for (let i = 0; i < maxIter; i++) {
      let f = 0;
      let fPrime = 0;

      for (let t = 0; t < flujos.length; t++) {
        const denom = Math.pow(1 + rate, t);
        f += flujos[t] / denom;
        fPrime -= t * flujos[t] / (denom * (1 + rate));
      }

      const newRate = rate - f / fPrime;

      if (Math.abs(newRate - rate) < precision) {
        return newRate;
      }

      rate = newRate;
    }

    throw new Error("La TIR no converge");
  }

  calcularTREA(): void {
    let tasa = 0.01;
    const precision = 0.0000001;
    const maxIter = 100;
    let diferencia;
    let iter = 0;

    do {
      const vp = this.flujoBono.reduce((acc, cuota) => acc + cuota.flujoNeto / Math.pow(1 + tasa, cuota.t), 0);
      diferencia = this.precioBono - vp;
      const derivada = this.flujoBono.reduce((acc, cuota) => acc - cuota.t * cuota.flujoNeto / Math.pow(1 + tasa, cuota.t + 1), 0);
      const nuevaTasa = tasa - diferencia / derivada;
      if (Math.abs(nuevaTasa - tasa) < precision) break;
      tasa = nuevaTasa;
    } while (++iter < maxIter);

    this.trea = Math.pow(1 + tasa, this.frecuenciaNumerica(this.bono.frecuenciaPago)) - 1;
  }

  capitalizacionDeshabilitada(): boolean {
    return this.bono.tipoTasa === 'Efectiva';
  }

  mensajeAdvertenciaValorNominal = false;

  validarValorNominal() {
    this.mensajeAdvertenciaValorNominal = this.bono.valorNominal <= 1000;
  }

}
