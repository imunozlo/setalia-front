import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { Subject, takeUntil } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { RoutingService } from 'src/app/_infra/shared/services/routings.service';
import { ConsultasStoreService } from 'src/app/maestros/consultas/service/consultas.store.service';
import { PerfilFormularioConfig } from 'src/app/_infra/shared/components/formularios/configuraciones/user/perfil-formulario.config';

@Component({
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit, OnDestroy {
  formulario = Object.assign([], PerfilFormularioConfig);
  usuari: UserModel;
  formularioValid: boolean;
  listasValores: any;
  subbscripcions: Subject<void> = new Subject();

  constructor(
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private router: RoutingService,
    private consultasStoreService: ConsultasStoreService,
    public usuarioService: UsersService
  ) {}

  ngOnInit() {
    this.usuari = new UserModel().initialize();
    this.obtenerDades();
    this.cargarDatosRelacionados();
  }

  obtenerDades() {
    const usuario = new UserModel().deserialize(this.tokenService.get());
    this.usuarioService
      .obtener(usuario.id)
      .pipe(takeUntil(this.subbscripcions))
      .subscribe((response: UserModel) => {
        this.usuari = new UserModel().deserialize(response);
      });
  }

  cargarDatosRelacionados() {
    this.listasValores = {
      arees: this.consultasStoreService.obtenerListaValores('AREES'),
      carrecs: this.consultasStoreService.obtenerListaValores('CARRECS')
    };
  }

  guardar() {
    this.usuarioService
      .guardar(this.usuari)
      .pipe(takeUntil(this.subbscripcions))
      .subscribe(response => {
        this.usuari = new UserModel().deserialize(response);
      });
  }

  cambiarContrasenya() {}

  volver() {
    this.router.navegarUrl('/dashboard');
  }

  ngOnDestroy() {
    this.subbscripcions.next();
  }
}
