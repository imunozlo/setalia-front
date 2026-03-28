import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { DataService } from '../../../_infra/core/net/data.service';
import { NomenclaturaFiltroModel } from '../models/nomenclatura-filtro.model';
import { NomenclaturaModel } from '../models/nomenclatura.model';

@Injectable({
  providedIn: 'root'
})
export class NomenclaturasService {
  urlBase = `${environment.apiUrl}/nomenclaturas`;

  constructor(private dataService: DataService) {}

  obtenerNomenclaturas(): Observable<NomenclaturaModel[]> {
    return this.dataService.get(this.urlBase);
  }

  obtenerFiltradas(filtros: NomenclaturaFiltroModel): Observable<NomenclaturaModel[]> {
    return this.dataService.post(`${this.urlBase}/filtradas`, filtros, false);
  }

  guardar(datos: NomenclaturaModel): Observable<NomenclaturaModel> {
    return this.dataService.guardar(this.urlBase, datos, datos.id);
  }
}
