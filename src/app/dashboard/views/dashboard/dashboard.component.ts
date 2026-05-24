import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';

import { BitacoraModel } from '../../../bitacora/models/bitacora.model';
import { LoaderService } from '../../../_infra/shared/components/carga/loader/loader.service';
import { BitacoraFiltroModel } from '../../../bitacora/models/bitacora-filtro.model';
import { BitacorasStoreService } from '../../../bitacora/services/bitacoras.store.service';
import { BitacoraService } from '../../../bitacora/services/bitacoras.service';
import { UbicacionService } from '../../../_infra/shared/services/ubicacion.service';
import { Municipio, Provincia } from '../../../_infra/shared/models/ubicacion.model';
import { DrawerDetallePublicacionComponent } from '../../components/drawer-detalle-publicacion.component';
import { ConsultasStoreService } from '../../../maestros/consultas/service/consultas.store.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  publicaciones: BitacoraModel[] = [];

  loading = false;
  filtros: BitacoraFiltroModel;

  private subscriptions$ = new Subject<void>();

  provincias: Provincia[] = [];
  municipios: Municipio[] = [];
  todosLosMunicipios: Municipio[] = [];

  setas: any[] = [];

  provinciaSeleccionada: string | Provincia | null = null;
  municipioSeleccionado: string | Municipio | null = null;

  readonly imagenPublicacionDefault = 'assets/logos/3.png';

  imagenesPublicaciones = new Map<number, string>();
  private cargaImagenesVersion = 0;

  @ViewChild('drawerDetallePublicacion')
  drawerDetallePublicacionComponent!: DrawerDetallePublicacionComponent;

  constructor(
    private router: Router,
    private storeService: BitacorasStoreService,
    private bitacorasService: BitacoraService,
    private loaderService: LoaderService,
    private ubicacionService: UbicacionService,
    private consultasStoreService: ConsultasStoreService
  ) {}

  ngOnInit(): void {
    this.filtros = new BitacoraFiltroModel().initialize();
    this.filtros.publico = true;

    this.setas = this.consultasStoreService.obtenerListaValores('SETAS');

    this.cargarUbicaciones();
    this.cargarDatos();
  }

  private cargarUbicaciones(): void {
    this.ubicacionService.getUbicaciones().subscribe({
      next: data => {
        this.todosLosMunicipios = data.municipios;
        this.municipios = [...this.todosLosMunicipios];
      },
      error: err => {
        console.error('Error cargando municipios:', err);
      }
    });

    this.ubicacionService.getProvincias().subscribe({
      next: data => {
        this.provincias = data;
      },
      error: err => {
        console.error('Error cargando provincias:', err);
      }
    });
  }

  cargarDatos(): void {
    this.loading = true;
    this.loaderService.show();

    this.storeService
      // @ts-ignore
      .filtrados$(this.filtros)
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.deserializarElementos(response);

            // @ts-ignore
            this.filtros.total = response.total;

            void this.cargarImagenesPublicaciones();

            this.loading = false;
            this.loaderService.hide();
          }
        },
        error: () => {
          this.loading = false;
          this.loaderService.hide();
        },
        complete: () => {
          this.loading = false;
          this.loaderService.hide();
        }
      });
  }

  buscar(): void {
    this.filtros.pageIndex = 1;
    this.filtros.publico = true;

    const provinciaId = this.obtenerValorSeleccionado(this.provinciaSeleccionada);
    const municipioId = this.obtenerValorSeleccionado(this.municipioSeleccionado);

    this.filtros.provincia = provinciaId ? [provinciaId] : [];
    this.filtros.municipio = municipioId ? [municipioId] : [];

    this.loading = true;
    this.loaderService.show();

    this.storeService.setFiltrados(this.filtros);
  }

  limpiarFiltros(): void {
    this.filtros = new BitacoraFiltroModel().initialize();
    this.filtros.publico = true;

    this.provinciaSeleccionada = null;
    this.municipioSeleccionado = null;
    this.municipios = [...this.todosLosMunicipios];

    this.loading = true;
    this.loaderService.show();

    this.storeService.setFiltrados(this.filtros);
  }

  onProvinciaChange(valor: string | Provincia | null): void {
    this.provinciaSeleccionada = valor;

    const provinciaId = this.obtenerValorSeleccionado(valor);

    if (!provinciaId) {
      this.municipios = [...this.todosLosMunicipios];
      this.municipioSeleccionado = null;
      return;
    }

    this.municipios = this.todosLosMunicipios.filter(
      municipio => municipio.provinciaId === provinciaId
    );

    const municipioSeleccionadoId = this.obtenerValorSeleccionado(this.municipioSeleccionado);
    const sigueExistiendo = this.municipios.some(
      municipio => municipio.id === municipioSeleccionadoId
    );

    if (!sigueExistiendo) {
      this.municipioSeleccionado = null;
    }
  }

  obtenerProvinciaDescripcion(publicacion: BitacoraModel): string {
    if (!publicacion.provincia) {
      return '';
    }

    return this.provincias.find(
      provincia => provincia.id === publicacion.provincia
    )?.descripcion ?? '';
  }

  obtenerMunicipioDescripcion(publicacion: BitacoraModel): string {
    if (!publicacion.municipio) {
      return '';
    }

    return this.todosLosMunicipios.find(
      municipio => municipio.id === publicacion.municipio
    )?.descripcion ?? '';
  }

  obtenerUbicacionPublicacion(publicacion: BitacoraModel): string {
    const municipio = this.obtenerMunicipioDescripcion(publicacion);
    const provincia = this.obtenerProvinciaDescripcion(publicacion);

    if (municipio && provincia) {
      return `${municipio} (${provincia})`;
    }

    return municipio || provincia || '';
  }

  deserializarElementos(response: any): void {
    this.publicaciones = response.resultados.map(
      (e: BitacoraModel) => new BitacoraModel().deserialize(e)
    );
  }

  cambiarPagina(pagina: number): void {
    this.filtros.pageIndex = pagina;

    this.loading = true;
    this.loaderService.show();

    this.storeService.setFiltrados(this.filtros);
  }

  verDetalle(publicacion: BitacoraModel): void {
    const publicacionDetalle = new BitacoraModel().deserialize({
      ...publicacion,
      provinciaDescripcion:
        publicacion.provinciaDescripcion ||
        this.obtenerProvinciaDescripcion(publicacion),
      municipioDescripcion:
        publicacion.municipioDescripcion ||
        this.obtenerMunicipioDescripcion(publicacion)
    });

    this.drawerDetallePublicacionComponent.abrir(publicacionDetalle);
  }

  obtenerImagenPublicacion(publicacion: BitacoraModel): string {
    if (!publicacion.id) {
      return this.imagenPublicacionDefault;
    }

    return this.imagenesPublicaciones.get(publicacion.id)
      ?? this.imagenPublicacionDefault;
  }

  obtenerAltImagenPublicacion(publicacion: BitacoraModel): string {
    const primeraFoto = publicacion.fotos?.[0];

    return primeraFoto?.nombreArchivo
      || publicacion.tituloPublico
      || 'Publicación micológica';
  }

  trackById(index: number, item: BitacoraModel): number {
    return item.id;
  }

  private obtenerValorSeleccionado(
    valor: string | Provincia | Municipio | null | undefined
  ): string | null {
    if (!valor) {
      return null;
    }

    if (typeof valor === 'string') {
      return valor;
    }

    return valor.id ?? null;
  }

  private async cargarImagenesPublicaciones(): Promise<void> {
    const versionActual = ++this.cargaImagenesVersion;

    this.limpiarImagenesPublicaciones();

    const cargas = this.publicaciones.map(async publicacion => {
      const primeraFoto = publicacion.fotos?.[0];

      if (!publicacion.id || !primeraFoto?.id) {
        return;
      }

      try {
        const blob = await firstValueFrom(
          this.bitacorasService.obtenerFotoBlob(primeraFoto.id)
        );

        const src = URL.createObjectURL(blob);

        if (versionActual !== this.cargaImagenesVersion) {
          URL.revokeObjectURL(src);
          return;
        }

        this.imagenesPublicaciones.set(publicacion.id, src);
      } catch (error) {
        console.error(
          'Error cargando la imagen de la publicación',
          publicacion.id,
          error
        );
      }
    });

    await Promise.all(cargas);
  }

  private limpiarImagenesPublicaciones(): void {
    for (const src of this.imagenesPublicaciones.values()) {
      URL.revokeObjectURL(src);
    }

    this.imagenesPublicaciones.clear();
  }

  ngOnDestroy(): void {
    this.cargaImagenesVersion++;

    this.limpiarImagenesPublicaciones();

    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
