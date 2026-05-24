import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { I18NService } from '../../../_infra/core';
import { BitacoraModel } from '../../models/bitacora.model';
import { PublicarFormularioConfig } from '../../../_infra/shared/components/formularios/configuraciones/configuracion/publicar-formulario.config';
import { BitacoraService } from '../../services/bitacoras.service';
import { ConsultasStoreService } from '../../../maestros/consultas/service/consultas.store.service';

@Component({
  selector: 'app-drawer-publicar',
  templateUrl: './drawer-publicar.component.html',
  styleUrls: ['./drawer-publicar.component.scss']
})
export class DrawerPublicarComponent implements OnDestroy {
  @Output() readonly refrescar = new EventEmitter<void>();

  bitacora: BitacoraModel;
  abierto = false;
  titulo = '';
  nuevo = true;

  formulario = Object.assign([], PublicarFormularioConfig);
  formularioValid: boolean;

  subbscripcions: Subject<void> = new Subject<void>();

  constructor(
    private i18n: I18NService,
    public service: BitacoraService,
    private consultasStoreService: ConsultasStoreService
  ) {}

  guardar(): void {
    if (this.formularioValid) {
      this.bitacora.prepare();
      this.bitacora.fechaPublico = new Date();

      this.service
        .guardar(this.bitacora)
        .pipe(takeUntil(this.subbscripcions))
        .subscribe({
          complete: () => {
            this.consultasStoreService.cargarDatos().subscribe(() => {
              this.cerrar();
            });
          },
          error: () => {},
          next: () => {
            this.consultasStoreService.cargarDatos().subscribe(() => {
              this.cerrar();
            });
          }
        });
    }
  }

  abrir(elemento: BitacoraModel): void {
    this.bitacora = elemento;
    this.abierto = true;

    if (this.bitacora.tituloPublico) {
      this.titulo = this.i18n.traducir('bitacora.crear.publicacion.editar');
      this.nuevo = false;
    } else {
      this.titulo = this.i18n.traducir('bitacora.crear.publicacion.nueva');
      this.nuevo = true;
    }
  }

  cerrar(): void {
    this.abierto = false;
    this.refrescar.emit();
  }

  ngOnDestroy(): void {
    this.subbscripcions.next();
    this.subbscripcions.complete();
  }
}
