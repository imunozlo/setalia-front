import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ConsultasStoreService } from '../../../maestros/consultas/service/consultas.store.service';
import { IdentificacionModel } from '../../models/identificacion.model';
import { IdentificacionSugerenciaFormModel } from '../../models/identificacion-sugerencia-form.model';
import { IdentificacionSugerenciasService } from '../../services/identificacion-sugerencias.service';
import { UserModel } from '../../../maestros/usuarios/models/user.model';

import { IdentificacionSugerenciaFormularioConfig } from '../../../_infra/shared/components/formularios/configuraciones/configuracion/identificacion-sugerencia-formulario.config';

@Component({
  selector: 'app-drawer-sugerencia-identificacion',
  templateUrl: './drawer-sugerencia-identificacion.component.html',
  styleUrls: ['./drawer-sugerencia-identificacion.component.scss']
})
export class DrawerSugerenciaIdentificacionComponent {
  @Output() readonly refrescar = new EventEmitter<void>();

  abierto = false;
  formularioValid = false;

  identificacion: IdentificacionModel;
  sugerencia: IdentificacionSugerenciaFormModel;

  formulario = Object.assign([], IdentificacionSugerenciaFormularioConfig);
  listasValores: any;

  private subbscripcions: Subject<void> = new Subject<void>();

  constructor(
    private sugerenciasService: IdentificacionSugerenciasService,
    private consultasStoreService: ConsultasStoreService
  ) {}

  abrir(identificacion: IdentificacionModel, usuario: UserModel): void {
    this.identificacion = identificacion;

    this.sugerencia = new IdentificacionSugerenciaFormModel().initialize();
    this.sugerencia.identificacionId = identificacion.id;
    this.sugerencia.usuarioId = usuario.id;

    this.listasValores = {
      setas: this.consultasStoreService.obtenerListaValores('SETAS')
    };

    this.abierto = true;
  }

  cerrar(): void {
    this.abierto = false;
  }

  guardar(): void {
    if (!this.formularioValid) {
      return;
    }

    this.sugerenciasService
      .guardarSugerencia(this.sugerencia)
      .pipe(takeUntil(this.subbscripcions))
      .subscribe({
        next: () => {
          this.refrescar.emit();
          this.cerrar();
        },
        error: err => {
          console.error('Error guardando sugerencia:', err);
        }
      });
  }
}
