import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { VistaInterface } from '../../models/vista.interface';

@Component({
  selector: 'lib-tabla-botonera-principal',
  templateUrl: './tabla-botonera-principal.component.html'
})
export class TablaBotoneraPrincipalComponent implements OnChanges {
  @Input() vistas: VistaInterface[];
  @Input() mostrarExportar: boolean = false;
  @Input() mostrarBuscador: boolean = false;
  @Input() mostrarBotonBuscar: boolean = false;
  @Input() valorBuscadorGeneral: string;
  @Input() mostrarFiltro: boolean = false;
  @Input() mostrarFiltroMarcado: boolean = false;
  @Input() titulo: string;
  @Input() maximizado: boolean;
  @Input() vistaSeleccionada: string;
  @Output() readonly exportarEvent = new EventEmitter();
  @Output() readonly filtrosEvent = new EventEmitter();
  @Output() readonly refrescarFiltrosEvent = new EventEmitter();
  @Output() readonly maximizadoChange = new EventEmitter<boolean>();
  @Output() readonly cambiarVistaEvent = new EventEmitter<string>();
  @Output() readonly buscadorGeneralEvent = new EventEmitter<string>();
  valorBuscador: string = '';
  buscar: boolean = true;
  private ultimoValorEmitido: string | null = null;
  constructor() {
    this.valorBuscador = this.valorBuscadorGeneral;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (this.vistas && this.vistas.length > 0 && !this.vistaSeleccionada) {
      this.vistaSeleccionada = this.vistas[0].nombre;
    }
  }

  filtrarBuscador() {
    if (this.valorBuscador && this.valorBuscador.length > 1) {
      if (this.valorBuscador !== this.ultimoValorEmitido) {
        this.buscadorGeneralEvent.emit(this.valorBuscador);
        this.ultimoValorEmitido = this.valorBuscador;
      }
    } else if (this.valorBuscador === "" && this.ultimoValorEmitido !== "") {
      this.buscadorGeneralEvent.emit('');
      this.ultimoValorEmitido = '';
    }

    if (this.valorBuscadorGeneral) {
      this.valorBuscador = this.valorBuscadorGeneral;
    }
  }

  maximizar() {
    this.maximizado = !this.maximizado;
    this.maximizadoChange.emit(this.maximizado);
  }

  cambiarVista(vista: VistaInterface) {
    this.vistaSeleccionada = vista.nombre;
    this.cambiarVistaEvent.emit(vista.valor);
  }
}
