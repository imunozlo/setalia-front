import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-boton-expandir',
  templateUrl: './boton-expandir.component.html'
})
export class BotonExpandirComponent {
  @Input() expandido: boolean = false;
  @Output() expandidoChange = new EventEmitter<boolean>();

  constructor() {}

  cambiarEstado() {
    this.expandido = !this.expandido;
    this.expandidoChange.emit(this.expandido);
  }
}
