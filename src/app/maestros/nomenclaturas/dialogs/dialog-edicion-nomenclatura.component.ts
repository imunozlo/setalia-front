import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { I18NService } from '../../../_infra/core';
import { NomenclaturaFormularioConfig } from '../../../_infra/shared/components/formularios/configuraciones/configuracion/nomenclatura-formulario.config';
import { NomenclaturaModel } from '../models/nomenclatura.model';
import { NomenclaturaTipoModel } from '../models/tipo-nomenclatura.model';
import { NomenclaturasService } from '../services/nomenclaturas.service';
import { ConsultasStoreService } from '../../consultas/service/consultas.store.service';

@Component({
  selector: 'app-drawer-nomenclatura',
  templateUrl: 'dialog-edicion-nomenclatura.component.html'
})
export class DialogEdicionNomenclaturaComponent implements OnInit, OnDestroy {
  @Output() readonly refrescar = new EventEmitter();
  @Input() tipo: NomenclaturaTipoModel[];
  listasValores: any;
  nomenclatura: NomenclaturaModel;
  abierto = false;
  titulo: string;
  nuevo: boolean;
  formulario = Object.assign([], NomenclaturaFormularioConfig);
  formularioValid: boolean;
  subbscripcions: Subject<void> = new Subject();

  constructor(
    private i18n: I18NService,
    public service: NomenclaturasService,
    private consultasStoreService: ConsultasStoreService
  ) {}

  ngOnInit() {
    this.listasValores = {
      tipo: this.tipo
    };
  }

  guardar() {
    if (this.formularioValid) {
      this.nomenclatura.prepare();
      this.service
        .guardar(this.nomenclatura)
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

  abrir(elemento: NomenclaturaModel): void {
    this.nomenclatura = elemento;
    this.abierto = true;
    if (this.nomenclatura.id) {
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
