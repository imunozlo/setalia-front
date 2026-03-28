import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty',
  template: `
    <div style="display: table; width: 100%" [ngStyle]="{ height: this.height + '%' }">
      <nz-empty [nzNotFoundContent]="titulo | i18n" style="display: table-cell; vertical-align: middle" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyComponent {
  @Input() titulo: string = 'app.sinDatos';
  @Input() height: number = 100;
}
