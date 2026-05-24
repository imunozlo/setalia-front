import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types/size';

import { Utils } from '../../../utils/Utils';
import { FuncionesInputs } from '../funciones';
import { ValidacionesInterface } from '../validaciones.interface';

@Component({
  selector: 'lib-input-select-multiple',
  templateUrl: './input-select-multiple.component.html'
})
export class InputSelectMultipleComponent implements OnInit, OnChanges {
  @Input() valor: any;
  @Input() elementos: any[];
  @Input() control: FormControl;
  @Input() size: NzSizeLDSType = 'default';
  @Input() disabled: boolean;

  @Input() ocultarSearch: boolean;
  @Input() ocultarClear: boolean;

  @Input() campo: string = 'descripcion';
  @Input() campoOrden: string = 'descripcion';
  @Input() tipusOrdre: string = 'ascend';
  @Input() campoMostrar: string = 'descripcion';
  @Input() ocultarNoActivos: boolean = false;
  @Input() placeholder = '';
  @Input() validaciones: ValidacionesInterface;

  descripcion: string | null;
  errorLabel = 'El campo es obligatorio';
  funcions = new FuncionesInputs();
  elementosFiltrados: any[];

  @Output() readonly valorChange = new EventEmitter<any>();
  @Output() readonly cambioValor = new EventEmitter();

  constructor() {
    this.valorChange = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.obtenerDescripcion();
    this.filtrarElmentosNoActivos();

    const valorInicial = Array.isArray(this.valor) ? this.valor : [];

    if (this.control) {
      this.control.setValue(valorInicial, { emitEvent: false });
    } else {
      this.control = this.funcions.crearNuevoControl(this.validaciones, valorInicial);
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
     * Si el padre limpia el valor con [] o null,
     * el control interno también se limpia.
     */
    if (changes['valor'] && this.control) {
      const nuevoValor = Array.isArray(this.valor) ? this.valor : [];
      this.control.setValue(nuevoValor, { emitEvent: false });
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

    if (!this.elementos || !this.elementos.length || !Array.isArray(this.valor)) {
      return;
    }

    const elementosSeleccionados = this.elementos.filter(ele => this.valor.includes(ele.id));

    if (elementosSeleccionados.length > 0) {
      this.descripcion = elementosSeleccionados.map(ele => ele[this.campoMostrar]).join(', ');
    }
  }

  filtrarElmentosNoActivos(): void {
    if (this.ocultarNoActivos && this.elementos) {
      this.elementosFiltrados = this.elementos.filter(ele => ele.activo);
    } else {
      this.elementosFiltrados = this.elementos;
    }

    if (this.elementosFiltrados) {
      Utils.ordenarTaula(this.tipusOrdre, this.campoOrden, this.elementosFiltrados);
    }
  }
}
