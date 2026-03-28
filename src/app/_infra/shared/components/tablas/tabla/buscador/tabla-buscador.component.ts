import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Utils } from '../../../../utils/Utils';

@Component({
  selector: 'lib-tabla-buscador',
  templateUrl: './tabla-buscador.component.html'
})
export class TablaBuscadorComponent {
  @Input() placeholder: string = 'app.buscar';
  @Input() elementos: any[];
  @Input() elementosFiltrados: any[];
  @Output() readonly elementsFiltratsChange = new EventEmitter<any[]>();
  @Output() readonly cambiarEvent = new EventEmitter();
  valorFiltro: any;

  cambiarFiltroGeneral() {
    this.elementosFiltrados = Utils.filtrarElementos(this.valorFiltro, this.elementos);
    this.elementsFiltratsChange.emit(this.elementosFiltrados);
    this.cambiarEvent.emit();
  }
}
