import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-tabla-titulo',
  templateUrl: './tabla-titulo.component.html'
})
export class TablaTituloComponent {
  @Input() titulo: string;
  @Input() descripcion: string;

  constructor() {}
}
