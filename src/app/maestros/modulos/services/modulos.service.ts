import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { DataService } from '../../../_infra/core/net/data.service';
import { ModuloModel } from '../models/modulo.model';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {
  urlBase = `${environment.apiUrl}/modulos`;

  constructor(private dataService: DataService) {}

  obtenerModulosActivos(): Observable<ModuloModel[]> {
    return this.dataService.get(this.urlBase);
  }

  obtenerModulos(): Observable<ModuloModel[]> {
    return this.dataService.get(this.urlBase + '/todos');
  }
}
