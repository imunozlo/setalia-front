import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { DataService } from '../../_infra/core/net/data.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivosFotosService {
  urlBase = `${environment.apiUrl}/archivos-avatares`;

  constructor(public dataService: DataService) {}

  obtenerAvatar(id: number, datos: any): Observable<any> {
    return this.dataService.post(`${this.urlBase}/obtener/${id}`, datos, false);
  }

  eliminarAvatar(id: number, datos: any): Observable<any> {
    return this.dataService.post(`${this.urlBase}/eliminar/${id}`, datos, false);
  }
}
