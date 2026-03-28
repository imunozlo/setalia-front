import { APP_INITIALIZER, inject, Injectable, Provider } from '@angular/core';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ALAIN_I18N_TOKEN, SettingsService, TitleService } from '@delon/theme';
import { User } from '@delon/theme/src/services/settings/types';
import * as _ from 'lodash';
import { catchError, map, Observable, zip } from 'rxjs';

import { ConsultasStoreService } from '../../../maestros/consultas/service/consultas.store.service';
import { UserModel } from '../../../maestros/usuarios/models/user.model';
import { UsersService } from '../../../maestros/usuarios/services/users.service';
import { DADTOS_APLICACION } from '../../shared/constants/datos-aplicacion';
import { I18NService } from '../i18n/i18n.service';

export function provideStartup(): Provider[] {
  return [
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: (startupService: StartupService) => () => startupService.load(),
      deps: [StartupService],
      multi: true
    }
  ];
}

@Injectable()
export class StartupService {
  private settingService = inject(SettingsService);
  private aclService = inject(ACLService);
  private titleService = inject(TitleService);
  private usuarioService = inject(UsersService);
  private consultasStoreService = inject(ConsultasStoreService);
  private tokenService = inject<ITokenService>(DA_SERVICE_TOKEN);
  private i18n = inject<I18NService>(ALAIN_I18N_TOKEN);

  load(): Observable<void> {
    const usuario = new UserModel().deserialize(this.tokenService.get());
    if (!_.isEmpty(usuario) && usuario.id) {
      return this.obtenerInfoCompleta(usuario.id);
    } else {
      return this.obtenerInfoIdiomas();
    }
  }

  obtenerInfoCompleta(id: number) {
    return zip(
      this.i18n.obtenerDatosIdioma(this.i18n.defaultLang),
      this.usuarioService.obtener(id),
      this.consultasStoreService.cargarDatos()
    ).pipe(
      catchError(() => {
        return [];
      }),
      map(([langData, usuarioResponse, consultas]: [any[], UserModel, any]) => {
        this.generarDatosIdiomas(langData);
        this.generarDatos(new UserModel().deserialize(usuarioResponse));
        this.generarDatosAplicacion();
        if (consultas) {
        }
      })
    );
  }

  obtenerInfoIdiomas() {
    return zip(this.i18n.obtenerDatosIdioma(this.i18n.defaultLang)).pipe(
      catchError(() => {
        return [];
      }),
      map(([langData]: [any[]]) => {
        this.generarDatosIdiomas(langData);
        this.generarDatosAplicacion();
      })
    );
  }

  generarDatosAplicacion() {
    this.settingService.setApp(DADTOS_APLICACION.app);
    this.titleService.default = '';
    this.titleService.suffix = DADTOS_APLICACION.app.name;
  }

  generarDatos(usuariModel: UserModel) {
    const usuario: User = {
      name: `${usuariModel.nombre} ${usuariModel.apellidos}`,
      email: usuariModel.email,
      avatar: usuariModel.avatar
    };
    this.settingService.setUser(usuario);
    this.aclService.setFull(true);
    this.aclService.setRole(this.generarRoles(usuariModel.authorities));
  }

  generarRoles(authorities: any[]) {
    const roles = new Array<string>();
    if (authorities) {
      authorities.map(authoritie => {
        roles.push(authoritie.authority);
      });
    }
    return roles;
  }

  generarDatosIdiomas(langData: any) {
    this.i18n.use(this.i18n.defaultLang, langData);
  }
}
