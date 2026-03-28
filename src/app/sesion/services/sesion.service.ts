import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { DataService } from '../../_infra/core/net/data.service';

@Injectable()
export class SesionService {
  urlBase = `${environment.apiUrl}/sesion`;

  constructor(public dataService: DataService) {}

  login(datos: any): Observable<any> {
    return this.dataService.post(`${this.urlBase}/login`, datos, false);
  }

  recuperarContrasenya(datos: any): Observable<any> {
    return this.dataService.post(`${this.urlBase}/recuperar-contrasenya`, datos, false);
  }

  actualizarContrasenya(datos: any): Observable<any> {
    return this.dataService.post(`${this.urlBase}/actualizar-contrasenya`, datos, true, true);
  }
}
