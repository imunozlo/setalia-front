import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { BuscadorBaseAbstract } from 'src/app/_infra/shared/abstract/buscador-base.abstract';
import { I18NService } from 'src/app/_infra/core';
import { ExcelService } from 'src/app/_infra/shared/services/excelService';
import { RoutingService } from '../../../_infra/shared/services/routings.service';
import { UbicacionesResponse } from '../../../_infra/shared/models/ubicacion.model';
import { UbicacionService } from '../../../_infra/shared/services/ubicacion.service';

import { IdentificacionModel } from '../../models/identificacion.model';
import { IdentificacionFiltroModel } from '../../models/identificacion-filtro.model';
import { IdentificacionesStoreService } from '../../services/identificaciones.store.service';
import { IdentificacionesConfig } from '../../../_infra/shared/components/tablas/tabla/configuracions/maestros/identificaciones.config';

@Component({
  selector: 'app-buscador-identificaciones',
  templateUrl: './buscador-identificaciones.component.html'
})
export class BuscadorIdentificacionesComponent
  extends BuscadorBaseAbstract<
    IdentificacionModel,
    IdentificacionFiltroModel,
    IdentificacionesStoreService
  >
  implements OnInit, OnDestroy
{
  override columnas = Object.assign([], IdentificacionesConfig);
  override filtros: IdentificacionFiltroModel;
  override elementos: IdentificacionModel[];
  override loading: boolean;
  override subbscripcions: Subject<void> = new Subject<void>();

  listasValores: any;
  maximizado = false;
  ubicaciones: UbicacionesResponse | null = null;

  private readonly estadosIdentificacion = [
    {
      id: 'ABIERTA',
      descripcion: 'Abierta'
    },
    {
      id: 'RESUELTA',
      descripcion: 'Resuelta'
    }
  ];

  constructor(
    override i18n: I18NService,
    override excelService: ExcelService,
    override storeService: IdentificacionesStoreService,
    private router: RoutingService,
    private ubicacionService: UbicacionService
  ) {
    super(storeService, i18n, excelService);
  }

  ngOnInit(): void {
    this.filtros = this.storeService.obtenerFiltros(this.columnas);

    this.ubicacionService.getUbicaciones().subscribe({
      next: data => {
        this.ubicaciones = data;
        this.cargarDatosRelacionados();
        this.cargarDatos();
      },
      error: err => {
        console.error('Error cargando ubicaciones:', err);
        this.cargarDatosRelacionados();
        this.cargarDatos();
      }
    });
  }

  nuevoElemento(): void {
    this.router.navegar('identificacion/detalle', 'new');
  }

  editarElemento(id: number): void {
    this.router.navegar('identificacion/detalle', id);
  }

  obtenerEstadoDescripcion(estado: 'ABIERTA' | 'RESUELTA'): string {
    return this.estadosIdentificacion.find(
      item => item.id === estado
    )?.descripcion ?? '';
  }

  obtenerClaseEstado(estado: 'ABIERTA' | 'RESUELTA'): string {
    if (estado === 'RESUELTA') {
      return 'estado-identificacion estado-identificacion--resuelta';
    }

    return 'estado-identificacion estado-identificacion--abierta';
  }

  override deserializarElementos(response: any): void {
    this.elementos = response.resultados.map((e: IdentificacionModel) => {
      const item = new IdentificacionModel().deserialize(e);

      if (this.ubicaciones) {
        const provincia = this.ubicaciones.provincias.find(
          p => p.id === item.provincia
        );

        const municipio = this.ubicaciones.municipios.find(
          m =>
            m.id === item.municipio &&
            m.provinciaId === item.provincia
        );

        item.provinciaDescripcion = provincia?.descripcion ?? '';
        item.municipioDescripcion = municipio?.descripcion ?? '';
      }

      return item;
    });
  }

  override filtrar(): void {
    this.loading = true;
    this.elementos = new Array<IdentificacionModel>();
    this.filtros.iniciarFiltro(this.columnas);
    this.storeService.setFiltrados(this.filtros);
  }

  override cargarDatosRelacionados(): void {
    this.listasValores = {
      estadosIdentificacion: this.estadosIdentificacion,
      provincias: this.ubicaciones?.provincias ?? [],
      municipios: this.ubicaciones?.municipios ?? []
    };
  }

  ngOnDestroy(): void {
    this.subbscripcions.next();
    this.subbscripcions.complete();
  }
}
