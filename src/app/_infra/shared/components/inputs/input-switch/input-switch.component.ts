import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'lib-input-switch',
  templateUrl: './input-switch.component.html'
})
export class InputSwitchComponent {
  @Input() valor: any;
  @Input() size: NzSizeLDSType = 'default';
  @Input() disabled: boolean;
  @Input() tooltip: string = '';
  @Output() readonly valorChange = new EventEmitter<any>();
  @Output() readonly cambioValor = new EventEmitter();

  constructor() {
    this.valorChange = new EventEmitter<any>();
  }

  cambiar(): void {
    this.valorChange.emit(this.valor);
    this.cambioValor.emit();
  }
}
