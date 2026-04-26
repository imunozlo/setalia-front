import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColumnaInterface } from '../../../_infra/shared/components/tablas/models/columna.interface';
import { LocalStoreService } from '../../../_infra/shared/services/localStorage.service';
import { StoreServiceBaseAbstract } from '../../../_infra/shared/abstract/store-service-base.abstract';
import { SetaModel } from '../models/seta.model';
import { SetaFiltroModel } from '../models/seta-filtro.model';
import { SetasService } from './setas.service';

@Injectable({
  providedIn: 'root'
})
export class SetasStoreService extends StoreServiceBaseAbstract<SetaModel, SetaFiltroModel, SetasService> {
  override _datos: BehaviorSubject<any> = new BehaviorSubject(null);
  override cacheDatos: string = 'SETAS';
  override cacheFiltros: string = 'SETAS_FILTROS';

  constructor(
    override service: SetasService,
    override localStoreService: LocalStoreService
  ) {
    super(service, localStoreService);
  }

  override deserializarElementos(response: any): any {
    return {
      resultados: response.resultados.map((con: SetaModel) => new SetaModel().deserialize(con)),
      total: response.total
    };
  }

  override iniciarFiltros(): any {
    return new SetaFiltroModel().initialize();
  }

  override deserializarFiltros(columnas: ColumnaInterface[]): any {
    return new SetaFiltroModel().deserializeFiltros(this.localStoreService.getItem(this.cacheFiltros), columnas);
  }
}
