import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ConsultasStoreService } from 'src/app/maestros/consultas/service/consultas.store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../_infra/shared/components/carga/loader/loader.service';
import { BitacoraService } from '../../services/bitacoras.service';
import { BitacoraModel } from '../../models/bitacora.model';
import { BitacoraFormularioConfig } from '../../../_infra/shared/components/formularios/configuraciones/configuracion/bitacora-formulario.config';
import { Municipio, Provincia } from '../../../_infra/shared/models/ubicacion.model';
import { UbicacionService } from '../../../_infra/shared/services/ubicacion.service';

@Component({
  selector: 'app-detalle-bitacora',
  templateUrl: './detalle-bitacora.component.html',
  styleUrls: ['./detalle-bitacora.component.scss']
})
export class DetalleBitacoraComponent implements OnInit, OnDestroy {
  loading: boolean;
  id: any;
  esNuevo: boolean;
  bitacora: BitacoraModel;
  destroy$ = new Subject<void>();
  formulario = Object.assign([], BitacoraFormularioConfig);
  formularioValid: boolean;
  listasValores: any;
  provincias: Provincia[] = [];
  municipios: Municipio[] = [];
  todosLosMunicipios: Municipio[] = [];

  constructor(
    private consultasStoreService: ConsultasStoreService,
    public service: BitacoraService,
    private router: Router,
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
    this.cargarUbicaciones();
    if (this.esNuevo) {
      this.bitacora = new BitacoraModel().initialize();
    } else {
      this.listasValores['municipios'] = this.todosLosMunicipios;
      this.cargarDatos();
    }
  }

  private cargarUbicaciones() {
    this.ubicacionService.getUbicaciones().subscribe({
      next: data => {
        this.todosLosMunicipios = data.municipios;
      },
      error: err => {
        console.error('Error cargando JSON:', err);
      }
    });
    this.ubicacionService.getProvincias().subscribe({
      next: data => {
        this.listasValores['provincias'] = data;
      },
      error: err => {
        console.error('Error cargando JSON:', err);
      }
    });
  }

  cargarDatos() {
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
        error: () => {
          this.loading = false;
          this.loaderService.hide();
        },
        next: response => {
          if (response) {
            this.bitacora = new BitacoraModel().deserialize(response);
            //this.obtenerMunicipios(this.bitacora.provincia);
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
    this.service
      .guardar(this.bitacora)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          if (response) {
            // Si estamos creando una nueva plantilla, redirigir al detalle
            if (this.esNuevo && response.id) {
              const baseRuta = '/bitacora/detalle';
              this.bitacora = new BitacoraModel().deserialize(response);
              // Redirige a la URL de detalle con el ID creado
              this.router.navigate([`${baseRuta}/${response.id}`]);
            } else {
              // Si no es nueva, solo recargar los datos
              this.cargarDatos();
            }
          }
        },
        error: err => {
          console.error('Error al guardar plantilla:', err);
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  filtrarMunicipios(provincia: any): void {
    this.listasValores['municipios'] = this.todosLosMunicipios.filter(municipio => municipio.provinciaId === provincia.valor);

    //this.bitacora.municipio = null;
    /*    this.formulario.formulario.patchValue({
      municipio: ''
    });*/
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCoordenadasMapaChange(event: { latitud: number | null; longitud: number | null }): void {
    this.bitacora.latitud = event.latitud;
    this.bitacora.longitud = event.longitud;
  }

}
