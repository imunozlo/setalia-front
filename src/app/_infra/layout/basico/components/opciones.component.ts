import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { I18nPipe, SettingsService, User } from '@delon/theme';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HeaderFullScreenComponent } from './fullscreen/fullscreen.component';
import { RoutingService } from 'src/app/_infra/shared/services/routings.service';

@Component({
  selector: 'header-opciones',
  template: `
    <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown nzPlacement="bottomRight" [nzDropdownMenu]="userMenu">
      <nz-avatar [nzSrc]="user.avatar" nzSize="small" class="mr-sm" />
      {{ user.name }}
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <div nz-menu-item (click)="mostrarPerfil()"> </div>

        <div nz-menu-divider></div>

        <div nz-menu-item>
          <header-fullscreen />
        </div>

        <div nz-menu-divider></div>

        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'app.logout' | i18n }}
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzDropDownModule, NzMenuModule, NzIconModule, I18nPipe, NzAvatarModule, HeaderFullScreenComponent]
})
export class HeaderOpcionesComponent {
  private readonly settings = inject(SettingsService);
  private readonly router = inject(RoutingService);
  private readonly tokenService = inject(DA_SERVICE_TOKEN);

  get user(): User {
    return this.settings.user;
  }

  logout(): void {
    this.tokenService.clear();
    this.router.salir();
  }

  mostrarPerfil(): void {
    this.router.navegarUrl('/usuarios/perfil');
  }
}
