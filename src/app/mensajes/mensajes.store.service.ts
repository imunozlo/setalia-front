import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStoreService } from 'src/app/_infra/shared/services/localStorage.service';
import { ColumnaInterface } from 'src/app/_infra/shared/components/tablas/models/columna.interface';
import { MensajesService } from './mensajes.service';
import { MensajeFiltroModel } from './mensaje-filtro.model';
import { MensajeModel } from './mensaje.model';

@Injectable({
  providedIn: 'root'
})
export class MensajesStoreService {
  // @ts-ignore
  protected _mensajesFiltrados: BehaviorSubject<any> = new BehaviorSubject(null);
  cacheDatos: string = 'MENSAJES';
  cacheFiltros: string = 'MENSAJES_FILTROS';

  constructor(
    public service: MensajesService,
    private localStoreService: LocalStoreService
  ) {}

  public filtrados$(filtros: MensajeFiltroModel): Observable<any> {
    if (this._mensajesFiltrados.getValue() == null) {
      this.setFiltrados(filtros);
    } else if (this.localStoreService.existItem(this.cacheDatos)) {
      this._mensajesFiltrados.next(this.obtenerDatosCache());
    }
    return this._mensajesFiltrados.asObservable();
  }

  setFiltrados(filtros: MensajeFiltroModel) {
    this.service.obtenerFiltradasPaginadas(filtros).subscribe({
      complete: () => {
        this.localStoreService.setItem(this.cacheDatos, this._mensajesFiltrados.value);
        this.localStoreService.setItem(this.cacheFiltros, filtros);
      },
      error: () => {
        this._mensajesFiltrados.next([]);
      },
      next: (response: any) => {
        const datos = {
          resultados: response.resultados.map((nom: MensajeModel) => new MensajeModel().deserialize(nom)),
          total: response.total
        };
        this._mensajesFiltrados.next(datos);
      }
    });
  }

  obtenerDatosCache() {
    const datos = this.localStoreService.getItem(this.cacheDatos);
    return {
      resultados: datos.resultados.map((e: MensajeModel) => new MensajeModel().deserialize(e)),
      total: datos.total
    };
  }

  obtenerFiltros(columnas: ColumnaInterface[]) {
    if (this.localStoreService.existItem(this.cacheFiltros)) {
      return new MensajeFiltroModel().deserializeFiltros(this.localStoreService.getItem(this.cacheFiltros), columnas);
    } else {
      return new MensajeFiltroModel().initialize();
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
    return new MensajeFiltroModel().initialize();
  }
}
