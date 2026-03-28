import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, catchError, map, takeUntil, zip } from 'rxjs';
import { ModuloModel } from 'src/app/maestros/modulos/models/modulo.model';
import { ModulosStoreService } from 'src/app/maestros/modulos/services/modulos.store.service';

import { RolsPermisosService } from '../../services/roles-permisos.service';
import { PermisModel } from '../../models/permiso.model';
import { RolDetalleFiltroModel } from '../../models/rol-detalle-filtro.model';
import { RolDetalleModel } from '../../models/rol-detalle.model';
import { PermisosConfig } from 'src/app/_infra/shared/components/tablas/tabla/configuracions/maestros/permisos.config';
import { RolLlistaModel } from '../../models/rol-lista.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { I18NService } from 'src/app/_infra/core';
import { DialogConfirmacionComponent } from 'src/app/_infra/shared/components/dialogs/confirmacion/dialog-confirmacion.component';
import { DialogEdicionRolComponent } from '../../dialogs/dialog-edicion-rol/dialog-edicion-rol.component';
import { RolModel } from '../../models/rol.model';
import { ConsultasStoreService } from 'src/app/maestros/consultas/service/consultas.store.service';

@Component({
  selector: 'app-buscador-permisos',
  templateUrl: './buscador-permisos.component.html'
})
export class BuscadorPermisosComponent implements OnInit, OnDestroy {
  loading: boolean;
  rols: RolLlistaModel[];
  rolsFiltrats: RolLlistaModel[];
  columnas = Object.assign([], PermisosConfig);
  listasValores: any;
  filtros: RolDetalleFiltroModel;
  subbscripcions: Subject<void> = new Subject();
  @ViewChild('drawerRol') drawerRolComponent: DialogEdicionRolComponent;
  @Output() refrescar = new EventEmitter();

  constructor(
    private rolsPermisosService: RolsPermisosService,
    private modulosStoreService: ModulosStoreService,
    private consultasStoreService: ConsultasStoreService,
    private modal: NzModalService,
    private i18n: I18NService
  ) {}

  ngOnInit() {
    this.filtros = new RolDetalleFiltroModel().iniciarFiltro(this.columnas);
    this.obtenerRoles();
  }

  refrescarDatos() {
    this.refrescar.emit();
    this.obtenerRoles();
  }

  obtenerRoles() {
    this.loading = true;
    this.rolsPermisosService
      .obtenerRoles(this.filtros)
      .pipe(takeUntil(this.subbscripcions))
      .subscribe({
        next: response => {
          this.rols = response.map(r => new RolLlistaModel().deserialize(r));
          this.rolsFiltrats = this.rols;
          this.cargarDatosRelacionados();
        }
      });
  }

  cargarDatosRelacionados() {
    zip(this.modulosStoreService.modulosActivos$(), this.rolsPermisosService.obtenerPermisos())
      .pipe(
        catchError(() => {
          return [];
        }),
        map(([modulos, permisos]: [ModuloModel[], PermisModel[]]) => {
          this.listasValores = {
            modulos: modulos.map(mod => new ModuloModel().deserialize(mod)),
            permisos: permisos.map(mod => new PermisModel().deserialize(mod))
          };
          this.loading = false;
        })
      )
      .subscribe();
  }

  filtrar() {
    this.filtros = new RolDetalleFiltroModel().iniciarFiltro(this.columnas);
    this.obtenerRoles();
  }

  expandir(dada: RolLlistaModel) {
    dada.expand = !dada.expand;
  }

  guardar(dada: RolDetalleModel) {
    this.rolsPermisosService
      .guardar(dada)
      .pipe(takeUntil(this.subbscripcions))
      .subscribe({
        next: response => {
          dada.rolPermisoId = response;
        }
      });
  }

  nuevoElemento() {
    const nuevo = new RolModel().initialize();
    this.drawerRolComponent.abrir(nuevo);
  }

  editarElemento(rol: RolModel) {
    this.drawerRolComponent.abrir(rol);
  }

  eliminarRol(id: number) {
    const modal = this.modal.create({
      nzTitle: this.i18n.traducir('configuracion.eliminarRol'),
      nzContent: DialogConfirmacionComponent,
      nzData: { pregunta: 'configuracion.eliminarRolPregunta', aceptar: 'app.siEliminar', cancelar: 'app.noTancar' },
      nzClosable: false,
      nzFooter: null
    });
    modal.afterClose.subscribe((response: any) => {
      if (response) {
        this.eliminar(id);
      }
    });
  }

  eliminar(id: number) {
    this.rolsPermisosService
      .eliminar(id)
      .pipe(takeUntil(this.subbscripcions))
      .subscribe(() => {
        this.consultasStoreService.cargarDatos().subscribe(() => {
          this.refrescar.emit();
          this.obtenerRoles();
        });
      });
  }

  ngOnDestroy() {
    this.subbscripcions.next();
  }
}
