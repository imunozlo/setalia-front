import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DataService } from '../../../_infra/core/net/data.service';

@Injectable({ providedIn: 'root' })
export class UsuariosContrasenyasService {
  urlBase = `${environment.apiUrl}/contrasenyas`;

  constructor(public dataService: DataService) {}

  cambiarContrasenya(datos: any): Observable<any> {
    return this.dataService.post(`${this.urlBase}/cambiar-contrasenya`, datos, true, true);
  }
}
