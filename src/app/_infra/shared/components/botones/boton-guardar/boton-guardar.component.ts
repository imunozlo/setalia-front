import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';

import { I18NService } from '../../../../core';
import { DialogConfirmacionComponent } from '../../dialogs/confirmacion/dialog-confirmacion.component';

@Component({
  selector: 'lib-boton-guardar',
  templateUrl: './boton-guardar.component.html'
})
export class BotonGuardarComponent {
  @Input() titulo: string = 'app.guardar';
  @Input() aceptarModal: string = 'app.siGuardar';
  @Input() cancelarModal: string = 'app.noCerrar';
  @Input() tituloModal: string = 'app.guardarTitulo';
  @Input() nzBlock: boolean;
  @Input() permisos: string[];
  @Input() disabled: boolean;
  @Input() type: any = 'default';
  @Input() size: NzButtonSize = 'default';
  @Output() readonly guardarEvent = new EventEmitter();

  constructor(
    private i18n: I18NService,
    private modal: NzModalService
  ) {}

  guardar(): void {
    /*const modal = this.modal.create({
      nzTitle: this.i18n.traducir(this.tituloModal),
      nzContent: DialogConfirmacionComponent,
      nzData: { aceptar: this.aceptarModal, cancelar: this.cancelarModal },
      nzClosable: false,
      nzFooter: null
    });
    modal.afterClose.subscribe((response: any) => {
      if (response) {*/
    this.guardarEvent.emit();
    //}
    //});
  }
}
