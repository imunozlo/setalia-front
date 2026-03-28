import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-movil-paginacion',
  templateUrl: './movil-paginacion.component.html'
})
export class MovilPaginacionComponent {
  @Input() filtros: any;
  @Output() filtrosChange = new EventEmitter<any>();
  @Output() paginar = new EventEmitter();
  locale = {
    prevText: 'Anterior',
    nextText: 'Siguiente'
  };

  cambiarPagina(indice: any) {
    this.filtros.pageIndex = indice;
    this.filtrosChange.emit(this.filtros);
    this.paginar.emit();
  }

  obtenerTotalPaginas() {
    return Math.ceil(this.filtros.total / this.filtros.pageSize);
  }
}
