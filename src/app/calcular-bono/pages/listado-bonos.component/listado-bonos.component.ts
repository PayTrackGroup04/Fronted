import {Component, OnInit} from '@angular/core';
import {Bono} from '../../model/bono.entity';
import {BonoService} from '../../services/bono.service';
import {Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-listado-bonos.component',
  imports: [
    NgForOf,
    FormsModule,
    MatCard,
    NgIf
  ],
  templateUrl: './listado-bonos.component.html',
  styleUrl: './listado-bonos.component.css'
})
export class ListadoBonosComponent implements OnInit {
  bonos: Bono[] = [];
  editandoId: null | number | undefined;

  constructor(
    private bonoService: BonoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bonoService.obtenerBonosPorUsuario().subscribe({
      next: (bonos) => this.bonos = bonos,
      error: () => alert('Error al cargar los bonos')
    });
  }

  toggleEditar(bono: Bono): void {
    this.editandoId = this.editandoId === bono.id ? null : bono.id;
  }

  guardarCambios(bono: Bono): void {
    if (!bono.id) {
      alert('ID del bono no definido');
      return;
    }

    this.bonoService.actualizarBono(bono.id, bono).subscribe({
      next: () => alert(`Bono #${bono.id} actualizado exitosamente`),
      error: () => alert(`Error al actualizar el bono #${bono.id}`)
    });
  }

  verCalculo(bono: Bono): void {
    if (!bono.id) {
      alert('ID del bono no definido');
      return;
    }

    this.router.navigate(['/registro'], {
      queryParams: { id: bono.id }
    });
  }
}
