import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { I18NService } from '../../../../_infra/core';
import { DialogConfirmacionComponent } from '../../../../_infra/shared/components/dialogs/confirmacion/dialog-confirmacion.component';
import { UserModel } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { ACLService } from '@delon/acl';
import { UsuarioFormularioConfig } from 'src/app/_infra/shared/components/formularios/configuraciones/user/usuario-formulario.config';
import { ConsultasStoreService } from 'src/app/maestros/consultas/service/consultas.store.service';

@Component({
  selector: 'app-drawer-usuario',
  templateUrl: 'dialog-edicion-usuario.component.html'
})
export class DialogEdicionUsuarioComponent implements OnInit, OnDestroy {
  @Output() readonly refrescar = new EventEmitter();
  usuario: UserModel;
  abierto = false;
  titulo: string;
  nuevo: boolean;
  formulario = Object.assign([], UsuarioFormularioConfig);
  formularioValid: boolean;
  listasValores: any;
  subbscripcions: Subject<void> = new Subject();

  constructor(
    private i18n: I18NService,
    private aclService: ACLService,
    private modal: NzModalService,
    private consultasStoreService: ConsultasStoreService,
    public service: UsersService
  ) {}

  ngOnInit() {
    this.cargarDatosRelacionados();
  }

  cargarDatosRelacionados() {
    this.listasValores = {
      roles: this.consultasStoreService.obtenerListaValores('ROLES')
    };
  }

  guardar() {
    if (this.formularioValid) {
      this.service
        .guardar(this.usuario)
        .pipe(takeUntil(this.subbscripcions))
        .subscribe({
          complete: () => {
            this.cerrar();
          },
          next: () => {
            this.cerrar();
          }
        });
    }
  }

  eliminar() {
    const modal = this.modal.create({
      nzTitle: this.i18n.traducir('app.eliminarUsuarioTitulo'),
      nzContent: DialogConfirmacionComponent,
      nzData: { aceptar: 'app.siEliminar', cancelar: 'app.noCerrar' },
      nzClosable: false,
      nzFooter: null
    });
    modal.afterClose.subscribe((response: any) => {
      if (response) {
        this.service
          .eliminar(this.usuario.id)
          .pipe(takeUntil(this.subbscripcions))
          .subscribe(() => {
            this.cerrar();
          });
      }
    });
  }

  abrir(elemento: UserModel, titulo: string): void {
    this.usuario = new UserModel().deserialize(elemento);
    this.cargarDatosRelacionados();
    this.abierto = true;
    if (this.usuario.id) {
      this.formulario.campos[0].input.disabled = true;
      this.titulo = this.i18n.traducir(titulo);
      this.nuevo = false;
    } else {
      this.formulario.campos[0].input.disabled = false;
      this.titulo = this.i18n.traducir(titulo);
      this.nuevo = true;
    }
  }

  cerrar(): void {
    this.abierto = false;
    this.refrescar.emit();
  }

  ngOnDestroy() {
    this.subbscripcions.next();
  }

  tienePermisos() {
    if (this.aclService.can(['MODULO_CONFIGURACION_USUARIOS_EDICION'])) {
      return true;
    } else {
      return false;
    }
  }
}
