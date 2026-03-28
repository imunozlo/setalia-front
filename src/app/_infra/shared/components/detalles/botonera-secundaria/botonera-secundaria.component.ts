import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BotoneraExtraInterface } from '../botonera/botonera-extra.interface';

@Component({
  selector: 'lib-botonera-secundaria',
  templateUrl: './botonera-secundaria.component.html'
})
export class BotoneraSecundariaComponent {
  @Input() listaBotonera: BotoneraExtraInterface[];
  @Input() listaBotoneraSecundaria: BotoneraExtraInterface[];
  @Output() readonly listaBotoneraEvent = new EventEmitter<string>();
  @Output() readonly listaBotoneraSecundariaEvent = new EventEmitter<string>();
  @Input() opcionSeleccionada: string;
  @Output() readonly opcionSeleccionadaChange = new EventEmitter();
  @Output() readonly cambiosEvent = new EventEmitter();
  constructor() {}

  cambiarOpcionLista(opcion: BotoneraExtraInterface) {
    this.opcionSeleccionada = opcion.nombre;
    this.opcionSeleccionadaChange.emit(this.opcionSeleccionada);
    this.listaBotoneraEvent.emit(opcion.valor);
    this.cambiosEvent.emit();
  }

  cambiarOpcionSecundariaLista(opcion: BotoneraExtraInterface) {
    this.listaBotoneraSecundariaEvent.emit(opcion.valor);
    this.cambiosEvent.emit();
  }
}
