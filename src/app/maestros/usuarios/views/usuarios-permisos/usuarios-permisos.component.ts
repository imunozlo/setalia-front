import { Component, ViewChild } from '@angular/core';
import { BuscadorUsuariosComponent } from '../buscador/buscador-usuarios.component';

@Component({
  templateUrl: './usuarios-permisos.component.html'
})
export class UsuariosPermisosComponent {
  seleccionado: number;
  @ViewChild('usuarios') buscadorUsuariosComponent: BuscadorUsuariosComponent;

  constructor() {}

  refrescar() {
    this.buscadorUsuariosComponent.cargarDatosRelacionados();
  }
}
