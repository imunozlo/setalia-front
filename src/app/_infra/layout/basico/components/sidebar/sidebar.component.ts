import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { I18nPipe } from '@delon/theme';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ModuloModel } from '../../../../../maestros/modulos/models/modulo.model';
import { RoutingService } from 'src/app/_infra/shared/services/routings.service';
import { UserModule } from 'src/app/maestros/usuarios/user.module';
import { SharedModule } from '../../../../shared/shared.module';
import { DialogConfirmacionComponent } from '../../../../shared/components/dialogs/confirmacion/dialog-confirmacion.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { I18NService } from '../../../../core';
import { LocalStoreService } from '../../../../shared/services/localStorage.service';
import { ModulosStoreService } from '../../../../../maestros/modulos/services/modulos.store.service';

@Component({
  selector: 'app-sidebar',
  styleUrls: ['sidebar.component.less'],
  templateUrl: 'sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzIconModule, CommonModule, I18nPipe, UserModule, SharedModule]
})
export class SidebarComponent implements OnInit {
  @Input() sidebarAbierto: boolean;
  @Input() modulos: ModuloModel[];
  @Output() readonly cambiarEstado = new EventEmitter();
  perfilSeleccionado: boolean;
  loading: boolean;
  modulosPrincipales: ModuloModel[];
  modulosSecundarios: ModuloModel[];

  constructor(
    private router: RoutingService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private i18n: I18NService,
    private localStoreService: LocalStoreService,
    private modulosStoreService: ModulosStoreService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.modulosPrincipales = this.modulos;
    //this.modulosSecundarios = this.modulos.filter(m => !m.principal);
    this.seleccionarModuloInicial();
  }

  seleccionarModuloInicial() {
    this.deseleccionarModulos();
    this.modulos.map(modulo => {
      if (this.router.url.includes(modulo.ruta)) {
        modulo.seleccionado = true;
      }
    });
  }

  mostrar(modulo: ModuloModel) {
    if (modulo.cabecera) {
      modulo.abierta = !modulo.abierta;
    } else {
      this.deseleccionarModulos();
      modulo.seleccionado = true;
      this.router.navegarUrl(modulo.ruta);
    }
  }

  inicio() {
    this.router.navigateByUrl('/dashboard');
  }

  deseleccionarModulos() {
    this.perfilSeleccionado = false;
    this.modulos.map(modulo => {
      modulo.seleccionado = false;
      if (modulo.opciones) {
        modulo.opciones.map(opcion => (opcion.seleccionado = false));
      }
    });
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
}
