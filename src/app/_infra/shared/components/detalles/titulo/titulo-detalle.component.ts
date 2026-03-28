import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-titulo-detalle',
  templateUrl: './titulo-detalle.component.html'
})
export class TituloDetalleComponent {
  @Input() titulo: string;
  @Input() descripcion: string;
}
