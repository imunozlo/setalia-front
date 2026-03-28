import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { DataService } from '../../../_infra/core/net/data.service';
import { ConsultaModel } from '../models/consulta.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  urlBase = `${environment.apiUrl}/consultas`;

  constructor(private dataService: DataService) {}

  obtenerDatos(): Observable<ConsultaModel> {
    return this.dataService.get(this.urlBase);
  }
}
