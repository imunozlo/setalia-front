import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types/size';

import { Utils } from '../../../utils/Utils';
import { FuncionesInputs } from '../funciones';
import { ValidacionesInterface } from '../validaciones.interface';

@Component({
  selector: 'lib-input-select',
  templateUrl: './input-select.component.html'
})
export class InputSelectComponent implements OnInit, OnChanges {
  @Input() valor: any;

  @Input() elementos: any[];
  @Input() control: FormControl;
  @Input() size: NzSizeLDSType = 'default';
  @Input() disabled: boolean;
  @Input() disabledSelect: boolean = false;

  @Input() ocultarSearch: boolean;
  @Input() ocultarClear: boolean;

  @Input() campo: string = 'texto';
  @Input() campoOrden: string = 'texto';
  @Input() tipusOrdre: string = 'ascend';
  @Input() campoMostrar: string = 'texto';
  @Input() ocultarNoActivos: boolean = true;
  @Input() placeholder = '';
  @Input() validaciones: ValidacionesInterface;

  descripcion: string | null;
  errorLabel = 'El campo es obligatorio';
  funcions = new FuncionesInputs();
  elementosFiltrados: any[];

  @Output() readonly valorChange = new EventEmitter<any>();
  @Output() readonly cambioValor = new EventEmitter();
  @Output() readonly busquedaEvent = new EventEmitter<string>();

  constructor() {
    this.valorChange = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.obtenerDescripcion();
    this.filtrarElmentosNoActivos();

    if (this.control) {
      this.control.setValue(this.valor, { emitEvent: false });
    } else {
      this.control = this.funcions.crearNuevoControl(this.validaciones, this.valor);
    }

    this.cambiar();

    if (this.disabled) {
      this.control.disable();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.obtenerDescripcion();
    this.filtrarElmentosNoActivos();

    /**
     * Importante:
     * Sincronizamos el valor externo con el FormControl interno
     * también cuando llega null, undefined o ''.
     * Esto permite que "Limpiar filtros" vacíe visualmente el select.
     */
    if (changes['valor'] && this.control) {
      this.control.setValue(this.valor ?? null, { emitEvent: false });
      this.descripcion = null;
      this.obtenerDescripcion();
    }
  }

  cambiar(): void {
    this.valor = this.control.value;
    this.errorLabel = this.funcions.obtenerError(this.control);

    if (this.control.valid) {
      this.valorChange.emit(this.valor);
      this.cambioValor.emit();
      this.obtenerDescripcion();
    } else {
      this.cambioValor.emit();
    }
  }

  obtenerDescripcion(): void {
    this.descripcion = null;

    if (this.elementos && this.elementos.length > 0) {
      const elemento = this.elementos.filter(ele => ele.id === this.valor);

      if (elemento && elemento.length > 0) {
        this.descripcion = elemento[0][this.campoMostrar];
      }
    }
  }

  filtrarElmentosNoActivos(): void {
    if (this.ocultarNoActivos && this.elementos) {
      this.elementosFiltrados = this.elementos.filter(ele => ele.activo);
      this.anyadirNoActivoActual();
    } else {
      this.elementosFiltrados = this.elementos;
    }

    if (this.elementosFiltrados) {
      Utils.ordenarTaula(this.tipusOrdre, this.campoOrden, this.elementosFiltrados);
    }
  }

  anyadirNoActivoActual(): void {
    if (this.valor && this.ocultarNoActivos) {
      const encontrado = this.elementos.find(ele => ele.id === this.valor);
      const encontradoEnFiltrados = this.elementosFiltrados.find(ele => ele.id === this.valor);

      if (encontrado && !encontradoEnFiltrados) {
        this.elementosFiltrados.push(encontrado);
      }
    }
  }

  busqueda(event: any): void {
    this.busquedaEvent.emit(event);
  }
}
