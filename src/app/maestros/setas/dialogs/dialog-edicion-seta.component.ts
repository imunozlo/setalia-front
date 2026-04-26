import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { I18NService } from '../../../_infra/core';
import { SetaModel } from '../models/seta.model';
import { ConsultasStoreService } from '../../consultas/service/consultas.store.service';
import { SetasService } from '../services/setas.service';
import { SetaFormularioConfig } from '../../../_infra/shared/components/formularios/configuraciones/configuracion/seta-formulario.config';

@Component({
  selector: 'app-drawer-seta',
  templateUrl: 'dialog-edicion-seta.component.html'
})
export class DialogEdicionSetaComponent implements OnDestroy {
  @Output() readonly refrescar = new EventEmitter();

  listasValores: any;
  seta: SetaModel;
  abierto = false;
  titulo: string;
  nuevo: boolean;
  formulario = Object.assign([], SetaFormularioConfig);
  formularioValid: boolean;
  subbscripcions: Subject<void> = new Subject();

  constructor(
    private i18n: I18NService,
    public service: SetasService,
    private consultasStoreService: ConsultasStoreService
  ) {}

  guardar() {
    if (this.formularioValid) {
      this.seta.prepare();
      this.service
        .guardar(this.seta)
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

  abrir(elemento: SetaModel): void {
    this.seta = elemento;
    this.abierto = true;
    if (this.seta.id) {
      this.titulo = this.i18n.traducir('app.editarValor');
      this.nuevo = false;
    } else {
      this.titulo = this.i18n.traducir('app.nuevoValor');
      this.nuevo = true;
    }
  }

  cerrar(): void {
    this.abierto = false;
    this.refrescar.emit();
  }

  ngOnDestroy() {
    this.subbscripcions.next();
  }
}
