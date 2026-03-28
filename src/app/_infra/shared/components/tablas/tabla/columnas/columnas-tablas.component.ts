import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Utils } from '../../../../utils/Utils';
import { ColumnaInterface } from '../../models/columna.interface';

@Component({
  selector: 'lib-columnas-tablas',
  templateUrl: './columnas-tablas.component.html'
})
export class ColumnasTablasComponent {
  @Input() columnas: ColumnaInterface[];
  @Input() elementos: any;
  @Input() ordenLocal: boolean = false;
  @Input() listasValores: any;
  @Input() ocultarCabecera: boolean = false;
  @Output() readonly columnesChange = new EventEmitter<ColumnaInterface[]>();
  @Output() readonly buscarEvent = new EventEmitter();

  constructor() {}

  buscarOrdenado(event: any, columna: ColumnaInterface) {
    if (this.ordenLocal) {
      Utils.ordenar(event, this.columnas, columna, this.elementos);
    } else {
      Utils.ordenarColumna(event, this.columnas, columna);
      this.buscar(columna);
    }
  }

  buscar(columna: ColumnaInterface) {
    columna.filtroActivo = false;
    this.columnesChange.emit(this.columnas);
    this.buscarEvent.emit();
  }

  borrarFiltro(columna: ColumnaInterface) {
    columna.valorFiltro = null;
    columna.filtroActivo = false;
    this.columnesChange.emit(this.columnas);
    this.buscarEvent.emit();
  }

  obtenerElementosLista(columna: ColumnaInterface) {
    let elementos = new Array<any>();
    if (columna && this.listasValores && columna.campoLista) {
      elementos = this.listasValores[columna.campoLista];
    }
    return elementos;
  }

  tieneElementosLista(columna: ColumnaInterface) {
    if (
      columna &&
      columna.campoLista &&
      this.listasValores[columna.campoLista] != null &&
      this.listasValores[columna.campoLista].length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  protected readonly Utils = Utils;
}
