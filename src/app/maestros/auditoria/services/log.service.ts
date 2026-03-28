import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { DataService } from '../../../_infra/core/net/data.service';
import { LogFiltroModel } from '../models/log-filtro.model';
import { LogModel } from '../models/log.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  urlBase = `${environment.apiUrl}/logs`;

  constructor(private dataService: DataService) {}

  purgarAuditoria(datos: any): Observable<any> {
    return this.dataService.post(`${this.urlBase}/purgar`, datos, false);
  }

  obtenerLogsFiltrada(filtros: LogFiltroModel): Observable<LogModel[]> {
    return this.dataService.post(`${this.urlBase}/filtrades`, filtros, false);
  }

  obtenergraficoAgrupado(filtros: LogFiltroModel): Observable<LogModel[]> {
    return this.dataService.post(`${this.urlBase}/grafic-agrupat`, filtros, false);
  }

  obtenergraficoEvolucion(filtros: LogFiltroModel): Observable<LogModel[]> {
    return this.dataService.post(`${this.urlBase}/grafic-evolucio`, filtros, false);
  }
}
