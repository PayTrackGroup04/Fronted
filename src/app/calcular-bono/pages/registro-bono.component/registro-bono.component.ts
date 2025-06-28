import {Component, Injectable, OnInit} from '@angular/core';
import {Bono} from '../../model/bono.entity';
import {FlujoBono} from '../../model/flujo-bono.entity';

@Component({
  selector: 'registro-bono',
  standalone: false,
  templateUrl: './registro-bono.component.html',
  styleUrl: './registro-bono.component.css'
})
@Injectable({ providedIn: 'root' })
export class RegistroBonoComponent{

  bono: Bono = {
    valorNominal: 0,
    tasaCupon: 0,
    tipoDeTasa: 'Nominal',
    capitalizacion: 'Mensual',
    frecuenciaPago: 0,
    plazo: 0,
    graciaTotal: 0,
    graciaParcial: 0,
    fechaInicio: new Date()
  };

  flujoBono: FlujoBono[] = [];

  onSubmit() {
    const periodos = this.bono.plazo * this.bono.frecuenciaPago;
    const tasa = this.obtenerTasaEfectiva(this.bono);
    const cuota = this.calcularCuota(this.bono.valorNominal, tasa, periodos);

    const flujo: FlujoBono[] = [];
    let saldo = this.bono.valorNominal;
    let fecha = new Date(this.bono.fechaInicio);

    for (let i = 1; i <= periodos; i++) {
      const estaEnGraciaTotal = i <= this.bono.graciaTotal;
      const estaEnGraciaParcial = i <= this.bono.graciaTotal + this.bono.graciaParcial && !estaEnGraciaTotal;

      let interes = saldo * tasa;
      let amortizacion = 0;
      let cuotaReal = 0;

      if (estaEnGraciaTotal) {
        interes = 0;
        amortizacion = 0;
        cuotaReal = 0;
      } else if (estaEnGraciaParcial) {
        amortizacion = 0;
        cuotaReal = interes;
      } else {
        amortizacion = cuota - interes;
        cuotaReal = cuota;
      }

      const saldoFinal = saldo - amortizacion;
      const flujoEmisor = cuotaReal;
      const flujoInversionista = -cuotaReal;

      flujo.push({
        periodo: i,
        fecha: new Date(fecha),
        saldoInicial: saldo,
        cuota: cuotaReal,
        interes,
        amortizacion,
        saldoFinal,
        flujoEmisor,
        flujoInversionista
      });

      saldo = saldoFinal;
      fecha.setMonth(fecha.getMonth() + (12 / this.bono.frecuenciaPago));
    }

    this.flujoBono = flujo;
  }

  private obtenerTasaEfectiva(bono: Bono): number {
    const tasa = bono.tasaCupon / 100;
    const capitalizacion = this.periodosPorAno(bono.capitalizacion);
    const frecuencia = bono.frecuenciaPago;

    if (bono.tipoDeTasa === 'Nominal') {
      return Math.pow(1 + (tasa / capitalizacion), capitalizacion / frecuencia) - 1;
    } else {
      return Math.pow(1 + tasa, 1 / frecuencia) - 1;
    }
  }

  private calcularCuota(pv: number, tasa: number, n: number): number {
    return (pv * tasa) / (1 - Math.pow(1 + tasa, -n));
  }

  private periodosPorAno(cap: string): number {
    switch (cap) {
      case 'Mensual': return 12;
      case 'Bimestral': return 6;
      case 'Trimestral': return 4;
      case 'Semestral': return 2;
      case 'Anual': return 1;
      default: return 1;
    }
  }
}

