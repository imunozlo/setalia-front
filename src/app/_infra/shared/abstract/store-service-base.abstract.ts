import { Observable } from 'rxjs';
import { LocalStoreService } from '../services/localStorage.service';
import { ColumnaInterface } from '../components/tablas/models/columna.interface';

export abstract class StoreServiceBaseAbstract<Model, Filtros, Service> {
  // @ts-ignore
  protected _datos: BehaviorSubject<any>;
  protected cacheDatos: string = 'CACHE';
  protected cacheFiltros: string = 'CACHE_FILTROS';

  constructor(
    protected service: Service,
    protected localStoreService: LocalStoreService
  ) {}

  public filtrados$(filtros: Filtros): Observable<Model[]> {
    if (this._datos.getValue() == null) {
      this.setFiltrados(filtros);
    } else if (this.localStoreService.existItem(this.cacheDatos)) {
      this._datos.next(this.obtenerDatosCache());
    }
    return this._datos.asObservable();
  }

  setFiltrados(filtros: Filtros) {
    //@ts-ignore
    this.service.obtenerFiltradasPaginadas(filtros).subscribe({
      complete: () => {
        this.localStoreService.setItem(this.cacheDatos, this._datos.value);
        this.localStoreService.setItem(this.cacheFiltros, filtros);
      },
      error: () => {
        this._datos.next([]);
      },
      next: (response: any) => {
        this._datos.next(this.deserializarElementos(response));
      }
    });
  }

  obtenerDatosCache() {
    const datos = this.localStoreService.getItem(this.cacheDatos);
    return this.deserializarElementos(datos);
  }

  obtenerFiltros(columnas: ColumnaInterface[]): any {
    if (this.localStoreService.existItem(this.cacheFiltros)) {
      return this.deserializarFiltros(columnas);
    } else {
      return this.iniciarFiltros();
    }
  }

  hayFiltros() {
    if (this.localStoreService.existItem(this.cacheFiltros)) {
      return true;
    } else {
      return false;
    }
  }

  limpiarFiltros() {
    this.localStoreService.removeItem(this.cacheFiltros);
    return this.iniciarFiltros();
  }

  limpiarCache() {
    this.localStoreService.removeItem(this.cacheDatos);
    return this.iniciarFiltros();
  }

  deserializarElementos(response: any) {
    console.log(response);
  }

  iniciarFiltros() {
  }

  deserializarFiltros(columnas: ColumnaInterface[]) {
    console.log(columnas);
  }

  guardarFiltros(filtros: Filtros) {
    this.localStoreService.setItem(this.cacheFiltros, filtros);
  }

}
