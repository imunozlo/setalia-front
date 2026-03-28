import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div
      *ngIf="loading"
      style="position: absolute;
    top: 0;
    width: 50%;
    margin-left: 25%;
    margin-top: 15%;
    left: 0;
    display: flex;
    height: 50vh;
    align-items: center;
    justify-content: center;
    z-index: 100000;"
    >
      <nz-spin nzSimple [nzSize]="'large'" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  @Input() loading: boolean;
}
