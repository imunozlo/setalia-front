import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStoreService } from '../../_infra/shared/services/localStorage.service';
import { BitacoraService } from './bitacoras.service';
import { BitacoraFiltroModel } from '../models/bitacora-filtro.model';
import { BitacoraModel } from '../models/bitacora.model';
import { ColumnaInterface } from '../../_infra/shared/components/tablas/models/columna.interface';
import { StoreServiceBaseAbstract } from '../../_infra/shared/abstract/store-service-base.abstract';
import { SetaFiltroModel } from '../../maestros/setas/models/seta-filtro.model';

@Injectable({ providedIn: 'root' })
export class BitacorasStoreService extends StoreServiceBaseAbstract<BitacoraModel, BitacoraFiltroModel, BitacoraService> {
  override _datos: BehaviorSubject<any> = new BehaviorSubject(null);
  override cacheDatos: string = 'BITACORA';
  override cacheFiltros: string = 'BITACORA_FILTROS';

  constructor(
    override service: BitacoraService,
    override localStoreService: LocalStoreService
  ) {
    super(service, localStoreService);
  }

  override deserializarElementos(response: any): any {
    return {
      resultados: response.resultados.map((con: BitacoraModel) => new BitacoraModel().deserialize(con)),
      total: response.total
    };
  }

  override iniciarFiltros(): any {
    return new BitacoraFiltroModel().initialize();
  }

  override deserializarFiltros(columnas: ColumnaInterface[]): any {
    return new SetaFiltroModel().deserializeFiltros(this.localStoreService.getItem(this.cacheFiltros), columnas);
  }
}
