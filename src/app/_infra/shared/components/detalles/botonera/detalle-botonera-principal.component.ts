import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BotoneraExtraInterface } from './botonera-extra.interface';

@Component({
  selector: 'lib-detalle-botonera-principal',
  templateUrl: './detalle-botonera-principal.component.html'
})
export class DetalleBotoneraPrincipalComponent {
  @Input() ocultarBotonGuardar: boolean = false;
  @Input() botoneraExtra: BotoneraExtraInterface[];
  @Input() permisos: string[];
  @Input() tituloGuardar: string = 'app.guardar';
  @Input() tituloReabrir: string = 'app.reabrir';
  @Input() disabled: boolean = false;
  @Input() mostrarEliminar: boolean = false;
  @Input() tituloEliminar: string;
  @Input() esFinal: boolean = false;
  @Output() readonly guardarEvent = new EventEmitter();
  @Output() readonly reabrirEvent = new EventEmitter();
  @Output() readonly eliminarEvent = new EventEmitter();
  @Output() readonly botoneraExtraEvent = new EventEmitter<string>();

  constructor() {}

  opcionExtra(opcion: BotoneraExtraInterface) {
    this.botoneraExtraEvent.emit(opcion.valor);
  }
}
