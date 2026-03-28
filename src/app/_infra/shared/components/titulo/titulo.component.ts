import { Component, Input } from '@angular/core';

import { I18NService } from '../../../core';

@Component({
  selector: 'lib-titulo',
  templateUrl: './titulo.component.html'
})
export class TituloComponent {
  @Input() titulo: string;
  @Input() descripcion: string;

  constructor(private i18n: I18NService) {}

  transformarTitulo() {
    return this.i18n.traducir(this.titulo);
  }

  transformarDescripcion() {
    return this.i18n.traducir(this.descripcion);
  }
}
