import { Subject, takeUntil } from 'rxjs';
import { I18NService } from '../../core';
import { ExcelService } from '../services/excelService';
import { ColumnaInterface } from '../components/tablas/models/columna.interface';

export abstract class BuscadorBaseAbstract<Model, Filtros, StoreService> {
  protected elementos: Model[];
  protected filtros: Filtros;
  protected columnas: any;
  public loading: boolean;
  protected subbscripcions: Subject<void> = new Subject();

  constructor(
    protected storeService: StoreService,
    protected i18n: I18NService,
    protected excelService: ExcelService
  ) {}

  cargarDatos() {
    this.loading = true;
    this.storeService
      //@ts-ignore
      .filtrados$(this.filtros)
      .pipe(takeUntil(this.subbscripcions))
      .subscribe({
        complete: () => {
          //this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
        next: (response: any) => {
          if (response) {
            this.deserializarElementos(response);
            //@ts-ignore
            this.filtros.total = response.total;
            this.cargarDatosRelacionados();
            this.loading = false;
          }
        }
      });
  }

  exportar(titulo: string) {
    this.loading = true;
    //@ts-ignore
    this.storeService.service.obtenerFiltradas(this.filtros).subscribe(
      (response: any) => {
        //const elementos = response.map((el: UsuariModel) => new UsuariModel().deserialize(el));
        //@ts-ignore
        this.excelService.exportar(this.i18n.traducir(titulo), this.columnas, response);
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  cargarDatosRelacionados() {}

  deserializarElementos(response: any) {
    console.log(response);
  }

  filtrarPaginacion(filtros: Filtros) {
    this.loading = true;
    this.filtros = filtros;
    this.filtrar();
  }

  filtrar() {
    this.loading = true;
    this.elementos = new Array<Model>();
    //@ts-ignore
    this.filtros.iniciarFiltro(this.columnas);
    //@ts-ignore
    this.storeService.setFiltrados(this.filtros);
  }

  filtroGeneral(valor: string) {
    this.loading = true;
    this.elementos = new Array<Model>();
    //Limpiamos los filtros
    this.columnas.map((columna: ColumnaInterface) => {
      columna.valorFiltro = null;
      columna.filtroActivo = false;
    });
    //@ts-ignore
    this.filtros = this.storeService.limpiarFiltros();
    //asignamos el filtro general
    //@ts-ignore
    this.filtros.general = valor.trim() === '' ? null : valor;
    //@ts-ignore
    this.storeService.setFiltrados(this.filtros);
  }

  limpiarFiltros() {
    //@ts-ignore
    this.filtros = this.storeService.limpiarFiltros();
    this.filtrar();
  }

  hayFiltros() {
    //@ts-ignore
    return this.storeService.hayFiltros();
  }
}
