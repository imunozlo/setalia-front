import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/_infra/core/net/data.service';
import { ConfiguracionModel } from '../models/configuracion.model';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracioService {
  urlBase = `${environment.apiUrl}/configuracion`;

  constructor(private dataService: DataService) {}

  obtenerConfiguracionPasswords(): Observable<ConfiguracionModel[]> {
    return this.dataService.get(`${this.urlBase}/requisitos-contrasenyas`);
  }
}
