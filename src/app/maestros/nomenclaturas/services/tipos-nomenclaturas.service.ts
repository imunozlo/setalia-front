import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { DataService } from '../../../_infra/core/net/data.service';
import { NomenclaturaTipoModel } from '../models/tipo-nomenclatura.model';

@Injectable({
  providedIn: 'root'
})
export class NomenclaturasTiposService {
  urlBase = `${environment.apiUrl}/nomenclaturas-tipos`;

  constructor(private dataService: DataService) {}

  listar(): Observable<NomenclaturaTipoModel[]> {
    return this.dataService.get(this.urlBase);
  }
}
