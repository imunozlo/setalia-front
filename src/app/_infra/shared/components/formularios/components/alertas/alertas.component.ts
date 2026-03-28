import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-alertas',
  templateUrl: './alertas.component.html'
})
export class AlertasComponent implements OnInit {
  @Input() errorFormulario: boolean;
  @Input() errorFormularioText: string;
  @Input() tipo: string; //success, error, warning, info
  color: string;
  icono: string;

  ngOnInit() {
    if (this.tipo === 'success') {
      this.color = '#52C41A';
      this.icono = 'check-circle';
    } else if (this.tipo === 'error') {
      this.color = '#FF4D4F';
      this.icono = 'close-circle';
    } else if (this.tipo === 'warning') {
      this.color = '#FAAD14';
      this.icono = 'info-circle';
    } else {
      this.color = '#2194FF';
      this.icono = 'info-circle';
    }
  }
}
