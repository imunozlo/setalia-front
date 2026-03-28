import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { I18NService } from '../../../../_infra/core';
import { DialogConfirmacionComponent } from 'src/app/_infra/shared/components/dialogs/confirmacion/dialog-confirmacion.component';
import { RolModel } from '../../models/rol.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RolsPermisosService } from '../../services/roles-permisos.service';
import { RolFormularioConfig } from 'src/app/_infra/shared/components/formularios/configuraciones/user/rol-formulario.config';
import { ConsultasStoreService } from 'src/app/maestros/consultas/service/consultas.store.service';

@Component({
  selector: 'app-drawer-edicion-rol',
  templateUrl: 'dialog-edicion-rol.component.html'
})
export class DialogEdicionRolComponent implements OnDestroy {
  @Output() readonly refrescarEvent = new EventEmitter();
  rol: RolModel;
  abierto = false;
  titulo: string;
  nuevo: boolean;
  formulario = Object.assign([], RolFormularioConfig);
  formularioValid: boolean;
  listasValores: any;
  subbscripcions: Subject<void> = new Subject();

  constructor(
    private i18n: I18NService,
    private modal: NzModalService,
    public service: RolsPermisosService,
    private consultasStoreService: ConsultasStoreService
  ) {}

  guardar() {
    if (this.formularioValid) {
      this.service
        .guardarRol(this.rol)
        .pipe(takeUntil(this.subbscripcions))
        .subscribe({
          complete: () => {
            this.consultasStoreService.cargarDatos().subscribe(() => {
              this.cerrar();
            });
          },
          next: () => {
            this.consultasStoreService.cargarDatos().subscribe(() => {
              this.cerrar();
            });
          }
        });
    }
  }

  eliminarRol() {
    const modal = this.modal.create({
      nzTitle: this.i18n.traducir('configuracion.eliminarRol'),
      nzContent: DialogConfirmacionComponent,
      nzData: { pregunta: 'configuracion.eliminarRolPregunta', aceptar: 'app.siEliminar', cancelar: 'app.noTancar' },
      nzClosable: false,
      nzFooter: null
    });
    modal.afterClose.subscribe((response: any) => {
      if (response) {
        this.eliminar();
      }
    });
  }

  eliminar() {
    this.service
      .eliminar(this.rol.id)
      .pipe(takeUntil(this.subbscripcions))
      .subscribe(() => {
        this.consultasStoreService.cargarDatos().subscribe(() => {
          this.cerrar();
        });
      });
  }

  abrir(elemento: RolModel): void {
    this.rol = elemento;
    this.abierto = true;
    if (this.rol.id) {
      this.titulo = this.i18n.traducir('configuracion.editarRol');
      this.nuevo = false;
    } else {
      this.titulo = this.i18n.traducir('configuracion.nouRol');
      this.nuevo = true;
    }
  }

  cerrar(): void {
    this.abierto = false;
    this.refrescarEvent.emit();
  }

  ngOnDestroy() {
    this.subbscripcions.next();
  }
}
