import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject, ViewChild } from '@angular/core';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';

import { SharedModule } from '../../../../shared';
import { DialogPerfilUsuarioComponent } from 'src/app/maestros/usuarios/dialogs/dialog-perfil-usuario/dialog-perfil-usuario.component';
import { SettingsService, User } from '@delon/theme';
import { UserModule } from 'src/app/maestros/usuarios/user.module';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MensajesService } from 'src/app/mensajes/mensajes.service';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { DialogMensajesComponent } from './components/dialog-mensajes/dialog-mensajes.component';

@Component({
  selector: 'app-header',
  styleUrls: ['header.component.less'],
  templateUrl: 'header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NzRowDirective, NzColDirective, SharedModule, UserModule]
})
export class HeaderComponent implements AfterViewInit {
  loading: boolean;
  loadingMensajes: boolean;
  opcionSeleccionada: any;
  filtro: any; //TicketBuscadorGeneralFiltroModel;
  resultados: any; //;Array<TicketBuscadorGeneralModel>;
  total: number = 0;
  private readonly settings = inject(SettingsService);
  @ViewChild('drawerPerfil') drawerPerfilUsuarioComponent: DialogPerfilUsuarioComponent;
  @ViewChild('drawerMensajes') draweMensajesComponent: DialogMensajesComponent;

  constructor(
    private modal: NzModalService,
    private cdr: ChangeDetectorRef,
    private mensajesService: MensajesService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
  ) {}

  ngAfterViewInit(): void {
    // this.cargarMensajes();
  }

  mostrarPerfil(): void {
    this.drawerPerfilUsuarioComponent.abrir(true);
  }

  mostrarMensajes(): void {
    this.draweMensajesComponent.abrir();
  }

  filtrar(valor: string) {
    if (valor && valor.length >= 4) {
      /*this.loading = true;
      this.filtro = new TicketBuscadorGeneralFiltroModel().initialize();
      this.filtro.datos = valor;
      this.service.filtroGeneral(this.filtro).subscribe(
        response => {
          this.resultados = response.map(r => new TicketBuscadorGeneralModel().deserialize(r));
          this.loading = false;
          this.cdr.detectChanges();
        },
        () => {
          this.loading = false;
        }
      );*/
    } else {
      this.resultados = [];
    }
  }

  /*  cargarMensajes() {
    const filtros = new MensajeFiltroModel().initialize();
    const usuario = new UserModel().deserialize(this.tokenService.get());
    filtros.usuarioId = usuario.id;
    filtros.finalizadaId = 2;
    this.loadingMensajes = true;
    this.mensajesService.obtenerFiltradasPaginadas(filtros).subscribe(
      (response: any) => {
        this.total = response.total;
        this.loadingMensajes = false;
        this.cdr.detectChanges();
      },
      () => {
        this.loadingMensajes = false;
      }
    );
  }*/

  seleccionar() {
    /*const encontrado = this.resultados.find(dato => dato.id === this.opcionSeleccionada);
    if (encontrado) {
      this.modal.create({
        nzContent: DialogTicketComponent,
        nzData: { ticket: encontrado },
        nzClosable: false,
        nzWidth: '100%',
        nzStyle: { top: '3vh', height: '100vh' },
        nzBodyStyle: { height: '85vh', overflow: 'auto' },
        nzFooter: null
      });
    }*/
  }

  get user(): User {
    return this.settings.user;
  }
}
