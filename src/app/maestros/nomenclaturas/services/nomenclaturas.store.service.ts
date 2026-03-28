import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NomenclaturasService } from './nomenclaturas.service';
import { I18NService } from '../../../_infra/core';
import { ColumnaInterface } from '../../../_infra/shared/components/tablas/models/columna.interface';
import { LocalStoreService } from '../../../_infra/shared/services/localStorage.service';
import { NomenclaturaFiltroModel } from '../models/nomenclatura-filtro.model';
import { NomenclaturaModel } from '../models/nomenclatura.model';

@Injectable({
  providedIn: 'root'
})
export class NomenclaturesStoreService {
  // @ts-ignore
  protected _nomenclatures: BehaviorSubject<NomenclaturaModel[]> = new BehaviorSubject(null);
  // @ts-ignore
  protected _nomenclaturesFiltrades: BehaviorSubject<NomenclaturaModel[]> = new BehaviorSubject(null);
  cacheDatos: string = 'NOMANCLATURAS';
  cacheFiltros: string = 'NOMANCLATURAS_FILTROS';

  constructor(
    public service: NomenclaturasService,
    private i18n: I18NService,
    private localStoreService: LocalStoreService
  ) {}

  public get nomenclaturas$(): Observable<NomenclaturaModel[]> {
    if (this._nomenclatures.getValue() == null) {
      this.setNomenclatures();
    }
    return this._nomenclatures.asObservable();
  }

  setNomenclatures() {
    this.service.obtenerNomenclaturas().subscribe({
      error: () => {
        this._nomenclatures.next([]);
      },
      next: response => {
        const datos = response.map((nom: NomenclaturaModel) => new NomenclaturaModel().deserialize(nom));
        this._nomenclatures.next(datos);
      }
    });
  }

  public filtrados$(filtros: NomenclaturaFiltroModel): Observable<NomenclaturaModel[]> {
    if (this._nomenclaturesFiltrades.getValue() == null) {
      this.setFiltrados(filtros);
    } else if (this.localStoreService.existItem(this.cacheDatos)) {
      this._nomenclaturesFiltrades.next(this.obtenerDatosCache());
    }
    return this._nomenclaturesFiltrades.asObservable();
  }

  setFiltrados(filtros: NomenclaturaFiltroModel) {
    this.service.obtenerFiltradas(filtros).subscribe({
      complete: () => {
        this.localStoreService.setItem(this.cacheDatos, this._nomenclaturesFiltrades.value);
        this.localStoreService.setItem(this.cacheFiltros, filtros);
      },
      error: () => {
        this._nomenclaturesFiltrades.next([]);
      },
      next: response => {
        const datos = response.map((nom: NomenclaturaModel) => new NomenclaturaModel().deserialize(nom));
        this._nomenclaturesFiltrades.next(datos);
      }
    });
  }

  obtenerDatosCache() {
    const datos = this.localStoreService.getItem(this.cacheDatos);
    return datos.map((nom: NomenclaturaModel) => new NomenclaturaModel().deserialize(nom));
  }

  obtenerFiltros(columnas: ColumnaInterface[]) {
    if (this.localStoreService.existItem(this.cacheFiltros)) {
      return new NomenclaturaFiltroModel().deserializeFiltros(this.localStoreService.getItem(this.cacheFiltros), columnas);
    } else {
      return new NomenclaturaFiltroModel().initialize();
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
    return new NomenclaturaFiltroModel().initialize();
  }
}
