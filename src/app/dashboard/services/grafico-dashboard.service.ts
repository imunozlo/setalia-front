import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { DataService } from 'src/app/_infra/core/net/data.service';
import { GraficoDashboardFormModel } from '../models/grafico-dashboard-form';
import { GraficoDashboardFiltroModel } from '../models/grafico-dashobard.filtro';

@Injectable({
  providedIn: 'root'
})
export class GraficoDashboardService {
  urlBase = `${environment.apiUrl}/graficos`;

  constructor(protected dataService: DataService) { }

  //TODO Cambiar el modelo para que funcione con ngx-charts. Tomar el DTO del back
  filtrar(datos: GraficoDashboardFiltroModel){
    return this.dataService.post(`${this.urlBase}/filtrar`, datos);
  }
  obtenerTodos() {
    return this.dataService.get(`${this.urlBase}`);
  }

  guardarGrafico(datos: GraficoDashboardFormModel) {
    return this.dataService.post(`${this.urlBase}`, datos);
  }

  modificarGrafico(datos: GraficoDashboardFormModel) {
    return this.dataService.put(`${this.urlBase}`, datos, datos.id);
  }

  eliminarGrafic(dato: number){
    return this.dataService.delete(`${this.urlBase}`, dato);
  }

}
