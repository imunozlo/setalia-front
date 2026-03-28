import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UsersService } from './users.service';
import { ColumnaInterface } from '../../../_infra/shared/components/tablas/models/columna.interface';
import { LocalStoreService } from '../../../_infra/shared/services/localStorage.service';
import { UserFiltroModel } from '../models/user-filtro.model';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersStoreService {
  // @ts-ignore
  private _usuariosFiltrados: BehaviorSubject<UserModel[]> = new BehaviorSubject(null);
  cacheDatos: string = 'USUARIOS';
  cacheFiltros: string = 'USUARIOS_FILTROS';

  constructor(
    public service: UsersService,
    private localStoreService: LocalStoreService
  ) {}

  public usuariosFiltrados$(filtros: UserFiltroModel): Observable<UserModel[]> {
    if (this._usuariosFiltrados.getValue() == null) {
      this.setUsuariosFiltrados(filtros);
    } else if (this.localStoreService.existItem(this.cacheDatos)) {
      this._usuariosFiltrados.next(this.obtenerDatosCache());
    }
    return this._usuariosFiltrados.asObservable();
  }

  setUsuariosFiltrados(filtros: any) {
    this.service.obtenerFiltrados(filtros).subscribe({
      complete: () => {
        this.localStoreService.setItem(this.cacheDatos, this._usuariosFiltrados.value);
        this.localStoreService.setItem(this.cacheFiltros, filtros);
      },
      error: () => {
        this._usuariosFiltrados.next([]);
      },
      next: response => {
        const datos = response.map((usu: UserModel) => new UserModel().deserialize(usu));
        this._usuariosFiltrados.next(datos);
      }
    });
  }

  obtenerDatosCache() {
    const datos = this.localStoreService.getItem(this.cacheDatos);
    return datos.map((dato: UserModel) => new UserModel().deserialize(dato));
  }

  obtenerFiltros(columnas: ColumnaInterface[]) {
    if (this.localStoreService.existItem(this.cacheFiltros)) {
      return new UserFiltroModel().deserializeFiltros(this.localStoreService.getItem(this.cacheFiltros), columnas);
    } else {
      return new UserFiltroModel().initialize();
    }
  }

  hayFiltros() {
    if (this.localStoreService.existItem(this.cacheFiltros)) {
      return true;
    } else {
      return false;
    }
  }

  limpiarFiltros() {
    this.localStoreService.removeItem(this.cacheFiltros);
    return new UserFiltroModel().initialize();
  }
}
