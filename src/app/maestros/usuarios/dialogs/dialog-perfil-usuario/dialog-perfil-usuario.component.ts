import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { PerfilFormularioConfig } from 'src/app/_infra/shared/components/formularios/configuraciones/user/perfil-formulario.config';
import { DialogCambioContrasenyaComponent } from '../dialog-cambio-contrasenya/dialog-cambio-contrasenya.component';
import { I18NService } from 'src/app/_infra/core';
import { DialogConfirmacionComponent } from 'src/app/_infra/shared/components/dialogs/confirmacion/dialog-confirmacion.component';
import { RoutingService } from 'src/app/_infra/shared/services/routings.service';
import { LocalStoreService } from 'src/app/_infra/shared/services/localStorage.service';
import { ModulosStoreService } from 'src/app/maestros/modulos/services/modulos.store.service';

@Component({
  selector: 'app-drawer-perfil-usuario',
  templateUrl: 'dialog-perfil-usuario.component.html'
})
export class DialogPerfilUsuarioComponent implements OnInit, OnDestroy {
  formulario = Object.assign([], PerfilFormularioConfig);
  usuario: UserModel;
  formularioValid: boolean;
  listasValores: any;
  abierto = false;
  edicion: boolean = false;
  loading: boolean = true;
  subbscripcions: Subject<void> = new Subject();

  constructor(
    private modal: NzModalService,
    private i18n: I18NService,
    private router: RoutingService,
    private localStoreService: LocalStoreService,
    private modulosStoreService: ModulosStoreService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    public usuarioService: UsersService
  ) {}

  ngOnInit() {
    //this.usuario = new UserModel().initialize();
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.loading = true;
    const usuario = new UserModel().deserialize(this.tokenService.get());
    this.usuarioService
      .obtener(usuario.id)
      .pipe(takeUntil(this.subbscripcions))
      .subscribe(
        (response: UserModel) => {
          this.usuario = new UserModel().deserialize(response);
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }

  guardar() {
    if (this.edicion) {
      this.usuarioService
        .guardar(this.usuario)
        .pipe(takeUntil(this.subbscripcions))
        .subscribe(() => {
          this.obtenerDatos();
        });
    }
  }

  cambiarContrasenya() {
    if (this.edicion) {
      this.abierto = false;
      this.modal.create({
        nzTitle: this.i18n.traducir('app.cambiarContrasenya'),
        nzContent: DialogCambioContrasenyaComponent,
        nzWidth: '40%',
        nzData: { usuario: this.usuario },
        nzFooter: null
      });
    }
  }

  abrir(edicion: boolean): void {
    this.abierto = true;
    this.edicion = edicion;
    this.obtenerDatos();
  }

  cambiarAvatar() {
    window.location.reload();
  }

  cerrar(): void {
    this.abierto = false;
  }

  cerrarSesion(): void {
    const modal = this.modal.create({
      nzTitle: this.i18n.traducir('app.tituloCerrarSesion'),
      nzContent: DialogConfirmacionComponent,
      nzData: { pregunta: 'app.preguntaVolver', aceptar: 'app.siCerrar', cancelar: 'app.noCerrar' },
      nzClosable: false,
      nzFooter: null
    });
    modal.afterClose.subscribe((response: any) => {
      if (response) {
        this.tokenService.clear();
        this.modulosStoreService.limpiarDades();
        this.localStoreService.clear();
        this.router.navigateByUrl('/sesion/login', { skipLocationChange: true }).then(() => {
          window.location.reload();
        });
      }
    });
  }

  ngOnDestroy() {
    this.subbscripcions.next();
  }
}
