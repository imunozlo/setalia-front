import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModulosService } from './modulos.service';
import { ModuloModel } from '../models/modulo.model';

@Injectable({ providedIn: 'root' })
export class ModulosStoreService {
  // @ts-ignore
  public _modulos: BehaviorSubject<ModuloModel[]> = new BehaviorSubject(null);
  // @ts-ignore
  public _modulosTodos: BehaviorSubject<ModuloModel[]> = new BehaviorSubject(null);
  public modulos: Array<ModuloModel>;

  constructor(public service: ModulosService) {}

  public modulosActivos$(): Observable<ModuloModel[]> {
    if (this._modulos.getValue() == null) {
      this.setModulosActivos();
    }
    return this._modulos.asObservable();
  }

  public modulos$(): Observable<ModuloModel[]> {
    if (this._modulosTodos.getValue() == null) {
      this.setModuls();
    }
    return this._modulosTodos.asObservable();
  }

  setModulosActivos() {
    this.service.obtenerModulosActivos().subscribe({
      error: () => {
        this._modulos.next([]);
      },
      next: response => {
        const datos = response.map((mod: ModuloModel) => new ModuloModel().deserialize(mod));
        this._modulos.next(datos);
        this.modulos = datos;
      }
    });
  }

  setModuls() {
    this.service.obtenerModulos().subscribe({
      error: () => {
        this._modulosTodos.next([]);
      },
      next: response => {
        const datos = response.map((mod: ModuloModel) => new ModuloModel().deserialize(mod));
        this._modulosTodos.next(datos);
        this.modulos = datos;
      }
    });
  }

  limpiarDades() {
    // @ts-ignore
    this._modulos = new BehaviorSubject(null);
    // @ts-ignore
    this._modulosTodos = new BehaviorSubject(null);
    // @ts-ignore
    this.modulos = null;
  }
  obtenerColor(modul: string) {
    if (this.modulos) {
      const modulos = this.modulos.map(mod => new ModuloModel().deserialize(mod));
      const moduloEncontrado = modulos.find(mod => mod.permisos === modul);
      if (moduloEncontrado) {
        return moduloEncontrado.color;
      } else {
        return '#000';
      }
    } else {
      return '#000';
    }
  }

  obtenerTitulo(modulo: string) {
    if (this.modulos) {
      const modulos = this.modulos.map(mod => new ModuloModel().deserialize(mod));
      const moduloEncontrado = modulos.find(mod => mod.permisos === modulo);
      if (moduloEncontrado) {
        return moduloEncontrado.descripcion;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
}
