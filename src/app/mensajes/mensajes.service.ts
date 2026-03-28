import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/_infra/core/net/data.service';
import { MensajeFiltroModel } from './mensaje-filtro.model';
import { MensajeModel } from './mensaje.model';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  urlBase = `${environment.apiUrl}/mensajes`;

  constructor(private dataService: DataService) {}

  obtenerFiltradas(filtros: MensajeFiltroModel): Observable<MensajeModel[]> {
    return this.dataService.post(`${this.urlBase}/filtradas`, filtros, false);
  }

  obtenerFiltradasPaginadas(filtros: MensajeFiltroModel): Observable<any> {
    return this.dataService.post(`${this.urlBase}/filtradas-paginadas`, filtros, false);
  }

  guardar(datos: MensajeModel): Observable<MensajeModel> {
    return this.dataService.guardar(this.urlBase, datos, datos.id);
  }
}
