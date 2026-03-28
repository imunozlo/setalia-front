import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SettingsService, User } from '@delon/theme';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-usuario',
  template: `
    <nz-avatar [nzSrc]="user.avatar" nzSize="small" class="mr-sm" />
    <span style="color: #FFF">{{ user.name }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzIconModule, NzAvatarComponent]
})
export class AppUsuarioComponent {
  private readonly settings = inject(SettingsService);

  get user(): User {
    return this.settings.user;
  }
}
