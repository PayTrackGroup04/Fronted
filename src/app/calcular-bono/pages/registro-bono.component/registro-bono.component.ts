import {Component, OnInit} from '@angular/core';
import {Bono} from '../../model/bono.entity';

@Component({
  selector: 'registro-bono.component',
  standalone: false,
  templateUrl: './registro-bono.component.html',
  styleUrl: './registro-bono.component.css'
})
export class RegistroBonoComponent implements OnInit{
  bono: Bono = {
    precioDeVenta: 0,
    cuotaInicial: 0,
    prestamo: 0,
    frecuenciaPago: '',
    plazo: 0,
    tea: 0,
    numeroPeriodos: 0,
    plazoDeGracia: 0,
    fechaPrimerPago: ''
  };

  ngOnInit() {
    this.onSubmit();
  }

  onSubmit() {
    this.calcularBono(this.bono);
  }

  calcularCuotaFrancesa(prestamo: number, tasa: number, periodos: number): number {
    const i = tasa / 100;
    return prestamo * (i * Math.pow(1 + i, periodos)) / (Math.pow(1 + i, periodos) - 1);
  }

  calcularintereses(interes: number, saldo: number): number {
    return (interes * saldo) / 100;
  }

  calcularAmortizacion(cuota: number, interes: number): number {
    return cuota - interes;
  }
  calcularBono(bono: Bono): void {
    const cuota = this.calcularCuotaFrancesa(bono.prestamo, bono.tea, bono.numeroPeriodos);
    let saldo = bono.prestamo;
    let totalIntereses = 0;
    let totalAmortizacion = 0;

    for (let i = 0; i < bono.numeroPeriodos; i++) {
      const interes = this.calcularintereses(bono.tea, saldo);
      const amortizacion = this.calcularAmortizacion(cuota, interes);
      saldo -= amortizacion;
      totalIntereses += interes;
      totalAmortizacion += amortizacion;
    }

    console.log(`Cuota: ${cuota}, Total Intereses: ${totalIntereses}, Total Amortización: ${totalAmortizacion}`);
  }
}

