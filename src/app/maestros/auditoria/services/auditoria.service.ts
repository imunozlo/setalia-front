import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { DataService } from '../../../_infra/core/net/data.service';
import { AuditoriaModel } from '../models/auditoria.model';
import { AuditoriaFiltroModel } from '../models/auditoria-filtro.model';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {
  urlBase = `${environment.apiUrl}/auditoria`;

  constructor(private dataService: DataService) {}

  purgarAuditoria(datos: any): Observable<any> {
    return this.dataService.post(`${this.urlBase}/purgar`, datos, false);
  }

  obtenerFiltrados(filtros: AuditoriaFiltroModel): Observable<AuditoriaModel[]> {
    return this.dataService.post(`${this.urlBase}/filtrados`, filtros, false);
  }

  obtenerGraficoAgrupado(filtros: AuditoriaFiltroModel): Observable<AuditoriaModel[]> {
    return this.dataService.post(`${this.urlBase}/grafico-agrupado`, filtros, false);
  }

  obtenerGraficoEvolucion(filtros: AuditoriaFiltroModel): Observable<AuditoriaModel[]> {
    return this.dataService.post(`${this.urlBase}/grafico-evolucion`, filtros, false);
  }
}
