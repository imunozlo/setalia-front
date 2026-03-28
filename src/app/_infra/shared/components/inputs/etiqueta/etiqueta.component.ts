import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-etiqueta',
  templateUrl: './etiqueta.component.html'
})
export class EtiquetaComponent {
  @Input() etiqueta: string;
  @Input() bold: boolean = false;
  @Input() icono: string;
  @Input() iconoHover: string;
  @Input() obligatorio: boolean = false;
  @Input() defecto: boolean = false;
  @Output() eventClickHover = new EventEmitter();
  constructor() {}
}
