import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DataService } from '../../../_infra/core/net/data.service';
import { PermisModel } from '../models/permiso.model';
import { RolDetalleFiltroModel } from '../models/rol-detalle-filtro.model';
import { RolDetalleModel } from '../models/rol-detalle.model';
import { RolModel } from '../models/rol.model';
import { RolLlistaModel } from '../models/rol-lista.model';

@Injectable({ providedIn: 'root' })
export class RolsPermisosService {
  urlBase = `${environment.apiUrl}/roles-permisos`;

  constructor(public dataService: DataService) {}

  obtenerRoles(filtros: RolDetalleFiltroModel): Observable<RolLlistaModel[]> {
    return this.dataService.post(`${this.urlBase}/roles`, filtros, false);
  }

  obtenerPermisosPorRol(id: number): Observable<RolModel[]> {
    return this.dataService.get(`${this.urlBase}/por-rol/${id}`);
  }

  obtenerPermisos(): Observable<PermisModel[]> {
    return this.dataService.get(`${this.urlBase}/permisos`);
  }

  guardar(dada: RolDetalleModel): Observable<any> {
    return this.dataService.guardar(this.urlBase, dada);
  }

  guardarRol(dada: RolModel): Observable<any> {
    return this.dataService.guardar(this.urlBase + '/rol', dada);
  }

  eliminar(id: number): Observable<any> {
    return this.dataService.delete(this.urlBase, id);
  }
}
