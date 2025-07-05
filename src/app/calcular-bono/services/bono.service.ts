import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Bono} from '../model/bono.entity';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BonoService {
  private apiUrl = environment.serverBasePath + '/bonos';

  constructor(private http: HttpClient) {}

  guardarBono(bono: Bono): Observable<any> {
    return this.http.post(this.apiUrl, bono);
  }

  obtenerBonos(): Observable<Bono[]> {
    return this.http.get<Bono[]>(this.apiUrl);
  }
  obtenerBonosPorUsuario(): Observable<Bono[]> {
    const userId = localStorage.getItem('userId');
    return this.http.get<Bono[]>(`${this.apiUrl}/usuario/${userId}`);
  }

  actualizarBono(id: number, bono: Bono): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, bono);
  }

}
