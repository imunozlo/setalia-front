import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'lib-boton',
  templateUrl: './boton.component.html'
})
export class BotonComponent {
  @Input() titulo: string;
  @Input() icono: string;
  @Input() nzBlock: boolean;
  @Input() width: string = ""
  @Input() disabled: boolean;
  @Input() type: any = 'default';
  @Input() size: NzButtonSize = 'default';
  @Input() colorFondo: string = '#64BDBE';
  @Input() color: string = '#FFF';
  @Input() borderRadius: string = "4px !important"
  @Input() border: string = "1px solid #64BDBE !important;"
  @Input() cambiarOrdenIcono = false;

  @Output() readonly enviarEvent = new EventEmitter();

  constructor() {}

  enviar() {
    this.enviarEvent.emit()
  }
}
