import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';


import { BitacoraModel } from '../models/bitacora.model';
import { BitacoraService } from '../services/bitacoras.service';
import { BitacoraFormularioConfig } from '../../_infra/shared/components/formularios/configuraciones/configuracion/bitacora-formulario.config';
import { I18NService } from '../../_infra/core';
import { ConsultasStoreService } from '../../maestros/consultas/service/consultas.store.service';

@Component({
  selector: 'app-drawer-bitacora',
  templateUrl: 'dialog-edicion-bitacora.component.html'
})
export class DialogEdicionBitacoraComponent implements OnDestroy {
  @Output() readonly refrescar = new EventEmitter();

  listasValores: any;
  seta: BitacoraModel;
  abierto = false;
  titulo: string;
  nuevo: boolean;
  formulario = Object.assign([], BitacoraFormularioConfig);
  formularioValid: boolean;
  subbscripcions: Subject<void> = new Subject();

  constructor(
    private i18n: I18NService,
    public service: BitacoraService,
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

  abrir(elemento: BitacoraModel): void {
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
