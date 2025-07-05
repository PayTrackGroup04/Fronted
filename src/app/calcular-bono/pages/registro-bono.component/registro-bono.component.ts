import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Bono} from '../../model/bono.entity';
import {FlujoBono} from '../../model/flujo-bono.entity';
import {ConfigurationComponent} from '../../components/configuration.component/configuration.component';
import {ConfigurationPopupComponent} from '../../components/configuration-popup.component/configuration-popup.component';
import {BonoService} from '../../services/bono.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-bono',
  templateUrl: './registro-bono.component.html',
  styleUrls: ['./registro-bono.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ConfigurationComponent, ConfigurationPopupComponent, HttpClientModule]

})
export class RegistroBonoComponent {
  bono: Bono = {
    valorNominal: 10000,
    tasaCupon: 0.08,
    tipoTasa: 'EFECTIVA',
    capitalizacion: 'MENSUAL',
    frecuenciaPago: 'MENSUAL',
    plazoAnios: 3,
    graciaTotal: 0,
    graciaParcial: 1,
    fechaEmision: new Date(),
    numeroDiasPorAno: 360,
    cavali: 0.005,
    estructuracion: 0.01,
    colocacion: 0.002,
    metodoAmortizacion: 'FRANCES',
    moneda: 'PEN'
  };

  flujoBono: FlujoBono[] = [];
  tcea = 0;
  trea = 0;
  duracion = 0;
  duracionModificada = 0;
  convexidad = 0;

  mostrarPopup = false;

  constructor(private bonoService: BonoService, private router: Router) {}

  irAListadoBonos() {
    this.router.navigate(['/bonos']);
  }

  abrirConfiguracion() {
    this.mostrarPopup = true;
  }

  cerrarPopup() {
    this.mostrarPopup = false;
  }

  guardarConfiguracion(config: { moneda: string; tipoTasa: string; capitalizacion: string }) {
    this.bono.moneda = config.moneda as any;
    this.bono.tipoTasa = config.tipoTasa as any;
    this.bono.capitalizacion = config.capitalizacion as any;
    this.cerrarPopup();
  }

  calcularFlujo(): void {
    const n = this.bono.plazoAnios * this.periodosPorAno(this.bono.frecuenciaPago);
    const tasaEfectiva = this.obtenerTasaEfectiva(this.bono);
    let cuotaCalculada = 0;

    const flujo: FlujoBono[] = [];
    let saldo = this.bono.valorNominal;
    let fecha = new Date(this.bono.fechaEmision);
    let valorActualTotal = 0;
    let dur = 0;
    let conv = 0;
    let flujoArrayEmisor = [];
    let flujoArrayInversionista = [];

    const costosIniciales = this.bono.valorNominal *
      (this.bono.cavali + this.bono.estructuracion + this.bono.colocacion);

    const valorRecibidoPorInversionista = this.bono.valorNominal - costosIniciales;

    flujoArrayEmisor.push(this.bono.valorNominal);

    flujoArrayInversionista.push(-valorRecibidoPorInversionista);

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
      flujoActualizado: -valorRecibidoPorInversionista
    });

    for (let t = 1; t <= n; t++) {
      fecha.setMonth(fecha.getMonth() + (12 / this.frecuenciaNumerica(this.bono.frecuenciaPago)));
      const tipoGracia =
        t <= this.bono.graciaTotal ? 'Total' :
          t <= this.bono.graciaTotal + this.bono.graciaParcial ? 'Parcial' : 'Ninguno';

      const interes = saldo * tasaEfectiva;
      let cuotaFinal = 0;
      let amortizacion = 0;
      let saldoFinal = saldo;

      if (tipoGracia === 'Total') {
        // Interés se capitaliza al saldo
        amortizacion = 0;
        cuotaFinal = 0;
        saldoFinal = saldo + interes;
      } else if (tipoGracia === 'Parcial') {
        cuotaFinal = interes;
        amortizacion = 0;
      } else {
        // Calcula cuota constante al entrar por primera vez a "Ninguno"
        if (cuotaCalculada === 0) {
          const cuotasRestantes = n - t + 1;
          cuotaCalculada = this.calcularCuota(saldo, tasaEfectiva, cuotasRestantes);
        }

        if (t === n) {
          amortizacion = saldo;
          cuotaFinal = interes + amortizacion;
        } else {
          cuotaFinal = cuotaCalculada;
          amortizacion = cuotaFinal - interes;
        }

        saldoFinal = saldo - amortizacion;
      }

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
    const tirE = this.calcularTIR(flujoArrayEmisor);
    const tirI = this.calcularTIR(flujoArrayInversionista);
    this.tcea = Math.pow(1 + tirE, this.periodosPorAno(this.bono.frecuenciaPago)) - 1;
    this.trea = Math.pow(1 + tirI, this.periodosPorAno(this.bono.frecuenciaPago)) - 1;
    const precioActual = valorActualTotal;
    const f = this.periodosPorAno(this.bono.frecuenciaPago); // frecuencia de pagos al año

// Duración en años
    this.duracion = (dur / precioActual) / f;

// Duración modificada en años
    this.duracionModificada = this.duracion / (1 + tasaEfectiva);

// Convexidad anualizada
    this.convexidad = conv / (Math.pow(1 + tasaEfectiva, 2) * precioActual * f * f);

    //duracion es menos de 4
    //convexidad es mas de 4
    //tasa cupon no mayor a 10%
  }


  private calcularCuota(pv: number, tasaEfectiva: number, n: number): number {
    return pv * ((tasaEfectiva * Math.pow(1 + tasaEfectiva, n)) / (Math.pow(1 + tasaEfectiva, n) - 1));
  }

  private obtenerTasaEfectiva(bono: Bono): number {
    const r = bono.tasaCupon/100;
    const m = this.periodosPorAno(bono.capitalizacion ?? 'MENSUAL');
    const f = this.periodosPorAno(bono.frecuenciaPago);
    const d = bono.numeroDiasPorAno;

    if (bono.tipoTasa === 'NOMINAL') {
      return Math.pow(1 + (r / m), m / f) - 1;
    } else {
      return Math.pow(1 + r, ((360 / f) / d)) - 1;
    }
  }

  private periodosPorAno(frecuencia: string): number {
    switch (frecuencia.toLowerCase()) {
      case 'QUINCENAL': return 24;
      case 'MENSUAL': return 12;
      case 'BIMESTRAL': return 6;
      case 'TRIMESTRAL': return 4;
      case 'CUATRIMESTRAL': return 3;
      case 'SEMESTRAL': return 2;
      case 'ANUAL': return 1;
      default: return 1;
    }
  }

  private frecuenciaNumerica(frec: string): number {
    switch (frec.toLowerCase()) {
      case 'QUINCENAL': return 15;
      case 'MENSUAL': return 1;
      case 'BIMESTRAL': return 2;
      case 'TRIMESTRAL': return 3;
      case 'CUATRIMESTRAL': return 4;
      case 'SEMESTRAL': return 6;
      case 'ANUAL': return 12;
      default: return 1;
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

  //validaciones

  valorNominalValido = true;
  valorTasaCuponValido = true;
  valorPlazoAniosValido = true;
  valorPlazoGraciaTotalValido = true;
  valorPlazoGraciaParcialValido = true;
  valorGraciaValida = true;
  mensajeAdvertenciaValorNominal = false;
  mensajeAdvertenciaTasa = false;
  mensajeAdvertenciaPlazoAnios = false;
  mensajeAdvertenciaPlazoGraciaTotal = false;
  mensajeAdvertenciaPlazoGraciaParcial = false;
  mensajeAdvertenciaSumaGracia = false;

  validarValorNominal() {
    const valor = this.bono.valorNominal;

    const fueraDeRango = valor < 1000 || valor > 10000000;
    //const advertenciaMultiplo = valor % 1000 !== 0;

    this.mensajeAdvertenciaValorNominal = fueraDeRango; // || advertenciaMultiplo;
    this.valorNominalValido = !this.mensajeAdvertenciaValorNominal;
  }

  validarTasaCupon() {
    const tasa = this.bono.tasaCupon;
    this.mensajeAdvertenciaTasa = tasa < 1 || tasa > 20;
    this.valorTasaCuponValido= !this.mensajeAdvertenciaTasa;
  }

  validarPlazoAnios() {
    const plazo = this.bono.plazoAnios;
    this.mensajeAdvertenciaPlazoAnios = plazo < 1 || plazo > 30;
    this.valorPlazoAniosValido = !this.mensajeAdvertenciaPlazoAnios;
  }

  validarPlazosDeGracia() {
    const totalGracia = this.bono.graciaTotal;
    const parcialGracia = this.bono.graciaParcial;
    const periodos = this.bono.plazoAnios * this.periodosPorAno(this.bono.frecuenciaPago);

    const sumaGracia = totalGracia + parcialGracia;

    this.mensajeAdvertenciaPlazoGraciaTotal = totalGracia > periodos * 0.25;
    this.mensajeAdvertenciaPlazoGraciaParcial = parcialGracia > periodos * 0.4;

    this.mensajeAdvertenciaSumaGracia = sumaGracia >= periodos;

    this.valorGraciaValida = !(
      this.mensajeAdvertenciaPlazoGraciaTotal ||
      this.mensajeAdvertenciaPlazoGraciaParcial ||
      this.mensajeAdvertenciaSumaGracia
    );
  }

  guardarBono() {
    this.bonoService.guardarBono(this.bono).subscribe({
      next: () => alert('¡Bono guardado exitosamente!'),
      error: (err) => {
        console.error('Error al guardar el bono', err);
        alert('Hubo un error al guardar el bono');
      }
    });
  }

}

