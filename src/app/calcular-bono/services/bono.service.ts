import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Bono} from '../model/bono.entity';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BonoService {
  private apiUrl = 'http://localhost:3000/bonos';

  constructor(private http: HttpClient) {}

  guardarBono(bono: Bono): Observable<any> {
    return this.http.post(this.apiUrl, bono);
  }
}
