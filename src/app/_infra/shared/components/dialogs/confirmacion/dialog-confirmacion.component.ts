import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  templateUrl: './dialog-confirmacion.component.html'
})
export class DialogConfirmacionComponent implements OnInit {
  pregunta: string;
  aceptar: string;
  cancelar: string;

  constructor(public modal: NzModalRef) {}

  ngOnInit(): void {
    if (this.modal.getConfig().nzData && this.modal.getConfig().nzData.pregunta) {
      this.pregunta = this.modal.getConfig().nzData.pregunta;
    }

    if (this.modal.getConfig().nzData && this.modal.getConfig().nzData.aceptar) {
      this.aceptar = this.modal.getConfig().nzData.aceptar;
    } else {
      this.aceptar = 'app.si';
    }

    if (this.modal.getConfig().nzData && this.modal.getConfig().nzData.cancelar) {
      this.cancelar = this.modal.getConfig().nzData.cancelar;
    } else {
      this.cancelar = 'app.no';
    }
  }

  seleccionar(value: boolean): void {
    this.modal.close(value);
  }
}
