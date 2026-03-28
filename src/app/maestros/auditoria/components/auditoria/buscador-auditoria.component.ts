import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subject, takeUntil } from 'rxjs';
import { ConsultasStoreService } from '../../../consultas/service/consultas.store.service';
import { AuditoriaModel } from '../../models/auditoria.model';
import { AuditoriaFiltroModel } from '../../models/auditoria-filtro.model';
import { AuditoriaService } from '../../services/auditoria.service';
import { AuditoriaConfig } from 'src/app/_infra/shared/components/tablas/tabla/configuracions/maestros/auditoria.config';
import { GraficoModel } from 'src/app/_infra/shared/components/graficos/models/grafico.model';

@Component({
  selector: 'app-buscador-auditoria',
  templateUrl: './buscador-auditoria.component.html'
})
export class BuscadorAuditoriaComponent implements OnInit, OnDestroy {
  loading: boolean;
  auditoria: AuditoriaModel[];
  graficoAgrupado: GraficoModel[];
  graficoEvolucion: GraficoModel[];
  listasValores: any;
  columnas = Object.assign([], AuditoriaConfig);
  filtros: AuditoriaFiltroModel;
  subbscripcions: Subject<void> = new Subject();
  ancho: number;

  constructor(
    private service: AuditoriaService,
    private consultasStoreService: ConsultasStoreService
  ) {}

  ngOnInit() {
    this.filtros = new AuditoriaFiltroModel().iniciarFiltro(this.columnas);
    this.cargarDatos();
    this.obtenerTamnyoGrafico();
  }

  carregaInicialDades(): Observable<any[]> {
    return forkJoin([
      this.service.obtenerFiltrados(this.filtros),
      this.service.obtenerGraficoAgrupado(this.filtros),
      this.service.obtenerGraficoEvolucion(this.filtros)
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
            this.auditoria = responseList[0].map((aud: AuditoriaModel) => new AuditoriaModel().deserialize(aud));
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
    this.auditoria = new Array<AuditoriaModel>();
    this.filtros = new AuditoriaFiltroModel().iniciarFiltro(this.columnas);
    this.loading = true;
    this.cargarDatos();
  }

  obtenerTamnyoGrafico() {
    this.ancho = screen.width - 500;
  }

  ngOnDestroy() {
    this.subbscripcions.next();
  }
}
