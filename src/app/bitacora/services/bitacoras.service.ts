import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { DataService } from '../../_infra/core/net/data.service';
import { HttpClient } from '@angular/common/http';
import { ServiceBaseAbstract } from '../../_infra/shared/abstract/service-base.abstract';
import { BitacoraModel } from '../models/bitacora.model';
import { BitacoraFiltroModel } from '../models/bitacora-filtro.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BitacoraService extends ServiceBaseAbstract<BitacoraModel, BitacoraFiltroModel> {
  override urlBase = `${environment.apiUrl}/bitacora`;

  constructor(
    override dataService: DataService,
    private http: HttpClient
  ) {
    super(dataService);
    http: HttpClient;
  }

  subirFoto(file: File, bitacoraId: number) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bitacoraId', String(bitacoraId));

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
