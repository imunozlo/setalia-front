import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-tabla-activo',
  templateUrl: './tabla-activo.component.html'
})
export class TablaActivoComponent {
  @Input() activo: boolean;
  @Input() textoActivo: string = 'app.activo';
  @Input() textoInactivo: string = 'app.noActivo';
}
