import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BotoneraExtraInterface } from '../../../detalles/botonera/botonera-extra.interface';

@Component({
  selector: 'lib-tabla-botonera-secundaria',
  templateUrl: './tabla-botonera-secundaria.component.html'
})
export class PaginacionTablasComponent {
  @Input() loading: boolean;
  @Input() soloMostrarPaginacion: boolean=false;
  @Input() ocultarNuevo: boolean = false;
  @Input() ocultarPaginacion: boolean = false;
  @Input() tituloNuevo: string = 'app.nuevo';
  @Input() iconoNuevo: string = 'file-add';
  @Input() permisos: any;
  @Input() filtros: any;
  @Input() botonesExtra: BotoneraExtraInterface[];
  @Output() readonly filtrar = new EventEmitter<any>();
  @Output() readonly nuevoEvent = new EventEmitter();
  @Output() readonly botonExtraEvent = new EventEmitter<string>();

  constructor() {}

  masUnaPagina() {
    const pagines = this.filtros.total / this.filtros.pageSize;
    if (pagines > 1) {
      return true;
    } else {
      return false;
    }
  }
}
