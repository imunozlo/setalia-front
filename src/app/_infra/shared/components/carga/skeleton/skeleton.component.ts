import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-skelteon',
  template: `
    <div class="padding-xlg">
      <nz-skeleton [nzParagraph]="{ rows: files }" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent {
  @Input() files: number;
}
