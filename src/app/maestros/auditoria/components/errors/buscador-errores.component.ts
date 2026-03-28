import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subject, takeUntil } from 'rxjs';
import { ConsultasStoreService } from '../../../consultas/service/consultas.store.service';
import { GraficoModel } from 'src/app/_infra/shared/components/graficos/models/grafico.model';
import { LogModel } from '../../models/log.model';
import { LogService } from '../../services/log.service';
import { LogFiltroModel } from '../../models/log-filtro.model';
import { LogConfig } from 'src/app/_infra/shared/components/tablas/tabla/configuracions/maestros/log.config';

@Component({
  selector: 'app-buscador-errores',
  templateUrl: './buscador-errores.component.html'
})
export class BuscadorErroresComponent implements OnInit, OnDestroy {
  loading: boolean;
  logs: LogModel[];
  graficoAgrupado: GraficoModel[];
  graficoEvolucion: GraficoModel[];
  listasValores: any;
  columnas = Object.assign([], LogConfig);
  filtros: LogFiltroModel;
  subbscripcions: Subject<void> = new Subject();
  ample: number;

  constructor(
    private service: LogService,
    private consultasStoreService: ConsultasStoreService
  ) {}

  ngOnInit() {
    this.filtros = new LogFiltroModel().iniciarFiltro(this.columnas);
    this.cargarDatos();
    this.obtenerTamanyoGrafico();
  }

  carregaInicialDades(): Observable<any[]> {
    return forkJoin([
      this.service.obtenerLogsFiltrada(this.filtros),
      this.service.obtenergraficoAgrupado(this.filtros),
      this.service.obtenergraficoEvolucion(this.filtros)
    ]);
  }

  cargarDatos() {
    this.loading = true;
    this.carregaInicialDades()
      .pipe(takeUntil(this.subbscripcions))
      .subscribe({
        complete: () => {
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
        next: (responseList: Array<any>) => {
          if (responseList[0] && responseList[1] && responseList[2]) {
            this.logs = responseList[0].map((aud: LogModel) => new LogModel().deserialize(aud));
            this.graficoAgrupado = responseList[1].map((aud: GraficoModel) => new GraficoModel().deserialize(aud));
            this.graficoEvolucion = responseList[2].map((aud: GraficoModel) => new GraficoModel().deserialize(aud));
            this.cargarDatosRelacionados();
            this.loading = false;
          }
        }
      });
  }

  cargarDatosRelacionados() {
    this.listasValores = {
      rols: this.consultasStoreService.obtenerListaValores('ROLS'),
      activos: this.consultasStoreService.obtenerListaValores('ACTIVOS')
    };
  }

  filtrar() {
    this.logs = new Array<LogModel>();
    this.filtros = new LogFiltroModel().iniciarFiltro(this.columnas);
    this.loading = true;
    this.cargarDatos();
  }

  obtenerTamanyoGrafico() {
    this.ample = screen.width - 500;
  }

  ngOnDestroy() {
    this.subbscripcions.next();
  }
}
