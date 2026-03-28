import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-input-checkbox',
  templateUrl: './input-checkbox.component.html'
})
export class InputCheckboxComponent {
  @Input() valor: boolean;
  @Output() readonly valorChange = new EventEmitter<any>();
  @Output() readonly cambioValor = new EventEmitter();
  @Input() disabled: boolean;
  @Input() etiqueta = '';

  constructor() {
    this.valorChange = new EventEmitter<any>();
  }

  cambiar(valor: any): void {
    this.valor = valor;
    this.valorChange.emit(this.valor);
    this.cambioValor.emit();
  }
}
