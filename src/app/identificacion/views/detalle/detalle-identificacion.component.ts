import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ConsultasStoreService } from 'src/app/maestros/consultas/service/consultas.store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../_infra/shared/components/carga/loader/loader.service';
import { UbicacionService } from '../../../_infra/shared/services/ubicacion.service';
import { Municipio, Provincia } from '../../../_infra/shared/models/ubicacion.model';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { UserModel } from '../../../maestros/usuarios/models/user.model';

import { IdentificacionModel } from '../../models/identificacion.model';
import { IdentificacionFiltroModel } from '../../models/identificacion-filtro.model';
import { IdentificacionSugerenciaModel } from '../../models/identificacion-sugerencia.model';
import { IdentificacionService } from '../../services/identificaciones.service';
import { IdentificacionesStoreService } from '../../services/identificaciones.store.service';
import { IdentificacionFormularioConfig } from '../../../_infra/shared/components/formularios/configuraciones/configuracion/identificacion-formulario.config';
import { DrawerSugerenciaIdentificacionComponent } from '../../dialogs/sugerencia/drawer-sugerencia-identificacion.component';

@Component({
  selector: 'app-detalle-identificacion',
  templateUrl: './detalle-identificacion.component.html',
  styleUrls: ['./detalle-identificacion.component.scss']
})
export class DetalleIdentificacionComponent implements OnInit, OnDestroy {
  loading: boolean;
  id: any;
  esNuevo: boolean;

  identificacion: IdentificacionModel;
  sugerencias: IdentificacionSugerenciaModel[] = [];

  destroy$ = new Subject<void>();

  formulario = Object.assign([], IdentificacionFormularioConfig);
  formularioValid: boolean;

  listasValores: any;
  provincias: Provincia[] = [];
  municipios: Municipio[] = [];
  todosLosMunicipios: Municipio[] = [];

  usuarioActual: UserModel;

  @ViewChild('drawerSugerencia')
  drawerSugerenciaComponent: DrawerSugerenciaIdentificacionComponent;

  constructor(
    private consultasStoreService: ConsultasStoreService,
    public service: IdentificacionService,
    public storeService: IdentificacionesStoreService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private ubicacionService: UbicacionService,
    private loaderService: LoaderService,
    private activatedRouter: ActivatedRoute
  ) {
    this.activatedRouter.params.subscribe(params => {
      this.id = params['id'];
      if (this.id === 'new') {
        this.esNuevo = true;
      } else {
        this.esNuevo = false;
      }
    });
  }

  ngOnInit(): void {
    this.listasValores = {
      setas: this.consultasStoreService.obtenerListaValores('SETAS')
    };

    this.usuarioActual = new UserModel().deserialize(this.tokenService.get());

    this.cargarUbicaciones();

    if (this.esNuevo) {
      this.identificacion = new IdentificacionModel().initialize();
      this.identificacion.usuarioId = this.usuarioActual.id;
      this.identificacion.estado = 'ABIERTA';
      this.sugerencias = [];
    } else {
      this.listasValores['municipios'] = this.todosLosMunicipios;
      this.cargarDatos();
    }
  }

  private cargarUbicaciones(): void {
    this.ubicacionService.getUbicaciones().subscribe({
      next: data => {
        this.todosLosMunicipios = data.municipios;
        this.listasValores['municipios'] = data.municipios;

        if (this.identificacion?.provincia) {
          this.filtrarMunicipios({ valor: this.identificacion.provincia });
        }
      },
      error: err => {
        console.error('Error cargando municipios:', err);
      }
    });

    this.ubicacionService.getProvincias().subscribe({
      next: data => {
        this.provincias = data;
        this.listasValores['provincias'] = data;
      },
      error: err => {
        console.error('Error cargando provincias:', err);
      }
    });
  }

  cargarDatos(): void {
    this.loaderService.show();
    this.loading = true;

    this.service
      .obtener(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => {
          this.loading = false;
          this.loaderService.hide();
        },
        error: err => {
          console.error('Error cargando identificación:', err);
          this.loading = false;
          this.loaderService.hide();
        },
        next: response => {
          if (response) {
            this.identificacion = new IdentificacionModel().deserialize(response);
            this.sugerencias = this.identificacion.sugerencias ?? [];

            if (this.identificacion.provincia) {
              this.filtrarMunicipios({ valor: this.identificacion.provincia });
            }

            this.loading = false;
            this.loaderService.hide();
          }
        }
      });
  }

  datosValido(): boolean {
    if (this.formularioValid) {
      return true;
    } else {
      return false;
    }
  }

  guardar(): void {
    if (!this.puedeGuardar()) {
      return;
    }

    this.identificacion.usuarioId = this.identificacion.usuarioId || this.usuarioActual.id;

    this.service
      .guardar(this.identificacion)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          if (response) {
            if (this.esNuevo && response.id) {
              const baseRuta = '/identificacion/detalle';
              this.identificacion = new IdentificacionModel().deserialize(response);
              this.router.navigate([`${baseRuta}/${response.id}`]);
            } else {
              this.cargarDatos();
            }

            const filtros = new IdentificacionFiltroModel().initialize();
            this.storeService.setFiltrados(filtros);
          }
        },
        error: err => {
          debugger;
          console.error('Error al guardar identificación:', err);
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  filtrarMunicipios(provincia: any): void {
    const provinciaId = provincia?.valor ?? provincia;

    if (!provinciaId) {
      this.listasValores['municipios'] = this.todosLosMunicipios;
      return;
    }

    this.listasValores['municipios'] = this.todosLosMunicipios.filter(
      municipio => municipio.provinciaId === provinciaId
    );
  }

  abrirDrawerSugerencia(): void {
    if (!this.puedeSugerir()) {
      return;
    }

    this.drawerSugerenciaComponent.abrir(this.identificacion, this.usuarioActual);
  }

  refrescarTrasSugerencia(): void {
    this.cargarDatos();
  }

  esCreador(): boolean {
    return !!this.identificacion?.usuarioId &&
      !!this.usuarioActual?.id &&
      this.identificacion.usuarioId === this.usuarioActual.id;
  }

  estaResuelta(): boolean {
    return this.identificacion?.estado === 'RESUELTA';
  }

  puedeGuardar(): boolean {
    if (this.esNuevo) {
      return this.datosValido();
    }

    return this.esCreador() && this.datosValido() && !this.estaResuelta();
  }

  puedeGestionarFotos(): boolean {
    return !this.esNuevo && this.esCreador() && !this.estaResuelta();
  }

  puedeSugerir(): boolean {
    return !this.esNuevo && !this.esCreador() && !this.estaResuelta();
  }

  obtenerEstadoTexto(): string {
    if (this.identificacion?.estado === 'RESUELTA') {
      return 'Resuelta';
    }

    return 'Abierta';
  }

  obtenerClaseEstado(): string {
    if (this.identificacion?.estado === 'RESUELTA') {
      return 'estado-identificacion estado-identificacion--resuelta';
    }

    return 'estado-identificacion estado-identificacion--abierta';
  }

  obtenerSetaResuelta(): string {
    if (!this.identificacion?.setaResueltaNombreCientifico && !this.identificacion?.setaResueltaNombreComun) {
      return '';
    }

    if (this.identificacion.setaResueltaNombreComun && this.identificacion.setaResueltaNombreCientifico) {
      return `${this.identificacion.setaResueltaNombreComun} · ${this.identificacion.setaResueltaNombreCientifico}`;
    }

    return this.identificacion.setaResueltaNombreComun || this.identificacion.setaResueltaNombreCientifico || '';
  }

  trackBySugerenciaId(index: number, item: IdentificacionSugerenciaModel): number {
    return item.id ?? index;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
