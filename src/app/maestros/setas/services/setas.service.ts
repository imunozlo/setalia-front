import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

import { DataService } from '../../../_infra/core/net/data.service';
import { SetaFiltroModel } from '../models/seta-filtro.model';
import { SetaModel } from '../models/seta.model';
import { ServiceBaseAbstract } from '../../../_infra/shared/abstract/service-base.abstract';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetasService extends ServiceBaseAbstract<SetaModel, SetaFiltroModel> {
  override urlBase = `${environment.apiUrl}/setas`;

  constructor(
    override dataService: DataService,
    private http: HttpClient
  ) {
    super(dataService);
    http: HttpClient;
  }
}
