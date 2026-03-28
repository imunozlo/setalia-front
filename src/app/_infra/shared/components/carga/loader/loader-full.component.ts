import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader-full',
  template: `
    <div
      *ngIf="loading"
      style="position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    z-index: 100000;"
    >
      <nz-spin nzSimple [nzSize]="'large'" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderFullComponent {
  @Input() loading: boolean;
}
