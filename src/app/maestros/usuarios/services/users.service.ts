import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DataService } from '../../../_infra/core/net/data.service';
import { RolModel } from '../models/rol.model';
import { UserFiltroModel } from '../models/user-filtro.model';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  urlBase = `${environment.apiUrl}/users`;

  constructor(public dataService: DataService) {}

  obtener(id: number): Observable<UserModel> {
    return this.dataService.get(`${this.urlBase}/${id}`);
  }

  obtenerRoles(): Observable<RolModel[]> {
    return this.dataService.get(`${this.urlBase}/roles`);
  }

  obtenerUsuarios(): Observable<UserModel[]> {
    return this.dataService.get(this.urlBase);
  }

  obtenerFiltrados(filtros: UserFiltroModel): Observable<UserModel[]> {
    return this.dataService.post(`${this.urlBase}/filtradas`, filtros, false);
  }

  guardar(datos: UserModel): Observable<UserModel> {
    return this.dataService.guardar(this.urlBase, datos, datos.id);
  }

  eliminar(id: number): Observable<any> {
    return this.dataService.delete(this.urlBase, id);
  }
}
