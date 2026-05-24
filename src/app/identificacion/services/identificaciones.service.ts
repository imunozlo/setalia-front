import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { DataService } from '../../_infra/core/net/data.service';
import { HttpClient } from '@angular/common/http';
import { ServiceBaseAbstract } from '../../_infra/shared/abstract/service-base.abstract';
import { Observable } from 'rxjs';

import { IdentificacionModel } from '../models/identificacion.model';
import { IdentificacionFiltroModel } from '../models/identificacion-filtro.model';

@Injectable({ providedIn: 'root' })
export class IdentificacionService extends ServiceBaseAbstract<IdentificacionModel, IdentificacionFiltroModel> {
  override urlBase = `${environment.apiUrl}/identificacion`;

  constructor(
    override dataService: DataService,
    private http: HttpClient
  ) {
    super(dataService);
    http: HttpClient;
  }

  subirFoto(file: File, identificacionId: number) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('identificacionId', String(identificacionId));

    return this.dataService.post(this.urlBase + '/subir-documento', formData, false, true);
  }

  obtenerFotoBlob(id: number): Observable<Blob> {
    return this.http.get(`${this.urlBase}/documentos/${id}/descargar`, { responseType: 'blob' });
  }

  eliminarFoto(id: number) {
    return this.dataService.delete(this.urlBase + '/documentos/eliminar/', id, true);
  }

  obtenerB64(id: number): Observable<string> {
    return this.http.get(`${this.urlBase}/ver-foto/${id}`, { responseType: 'text' });
  }
}
