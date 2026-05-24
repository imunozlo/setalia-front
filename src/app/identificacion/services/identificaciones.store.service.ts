import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LocalStoreService } from '../../_infra/shared/services/localStorage.service';
import { ColumnaInterface } from '../../_infra/shared/components/tablas/models/columna.interface';
import { StoreServiceBaseAbstract } from '../../_infra/shared/abstract/store-service-base.abstract';

import { IdentificacionService } from './identificaciones.service';
import { IdentificacionModel } from '../models/identificacion.model';
import { IdentificacionFiltroModel } from '../models/identificacion-filtro.model';

@Injectable({ providedIn: 'root' })
export class IdentificacionesStoreService extends StoreServiceBaseAbstract<
  IdentificacionModel,
  IdentificacionFiltroModel,
  IdentificacionService
> {
  override _datos: BehaviorSubject<any> = new BehaviorSubject(null);
  override cacheDatos: string = 'IDENTIFICACIONES';
  override cacheFiltros: string = 'IDENTIFICACIONES_FILTROS';

  constructor(
    override service: IdentificacionService,
    override localStoreService: LocalStoreService
  ) {
    super(service, localStoreService);
  }

  override deserializarElementos(response: any): any {
    return {
      resultados: response.resultados.map((item: IdentificacionModel) => new IdentificacionModel().deserialize(item)),
      total: response.total
    };
  }

  override iniciarFiltros(): any {
    return new IdentificacionFiltroModel().initialize();
  }

  override deserializarFiltros(columnas: ColumnaInterface[]): any {
    return new IdentificacionFiltroModel().deserializeFiltros(this.localStoreService.getItem(this.cacheFiltros), columnas);
  }
}
