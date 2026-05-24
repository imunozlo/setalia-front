import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { DataService } from '../../_infra/core/net/data.service';
import { Observable } from 'rxjs';

import { IdentificacionSugerenciaFormModel } from '../models/identificacion-sugerencia-form.model';
import { IdentificacionSugerenciaModel } from '../models/identificacion-sugerencia.model';
import { IdentificacionModel } from '../models/identificacion.model';

@Injectable({ providedIn: 'root' })
export class IdentificacionSugerenciasService {
  private readonly urlBase = `${environment.apiUrl}/identificacion`;

  constructor(private dataService: DataService) {}

  guardarSugerencia(sugerencia: IdentificacionSugerenciaFormModel): Observable<IdentificacionModel> {
    return this.dataService.post(this.urlBase + '/sugerencias', sugerencia);
  }

  obtenerSugerencias(identificacionId: number): Observable<IdentificacionSugerenciaModel[]> {
    return this.dataService.get(this.urlBase + `/${identificacionId}/sugerencias`);
  }
}
