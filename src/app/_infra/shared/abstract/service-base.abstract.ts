import { Observable } from 'rxjs';
import { DataService } from '../../core/net/data.service';

export abstract class ServiceBaseAbstract<Model, Filtros> {
  protected urlBase: string;

  constructor(protected dataService: DataService) { }

  obtenerFiltradas(filtros: Filtros): Observable<Model[]> {
    return this.dataService.post(`${this.urlBase}/filtradas`, filtros, false);
  }

  obtenerFiltradasPaginadas(filtros: Filtros): Observable<any> {
    return this.dataService.post(`${this.urlBase}/filtradas-paginadas`, filtros, false);
  }

  obtener(id: number): Observable<Model> {
    return this.dataService.get(this.urlBase + '/' + id);
  }

  guardar(datos: Model): Observable<Model> {
    //@ts-ignore
    return this.dataService.guardar(this.urlBase, datos, datos.id);
  }

  eliminar(data: any): Observable<any> {
    return this.dataService.delete(`${this.urlBase}`, data, true);
  }

  guardarMultiple(datos: Model[]): Observable<any> {
    return this.dataService.post(`${this.urlBase}/multiple`, datos, false);
  }
}
