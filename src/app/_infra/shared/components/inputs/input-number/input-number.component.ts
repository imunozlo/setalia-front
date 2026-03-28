import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types/size';

import { FuncionesInputs } from '../funciones';
import { ValidacionesInterface } from '../validaciones.interface';

@Component({
  selector: 'lib-input-number',
  templateUrl: './input-number.component.html'
})
export class InputNumberComponent implements OnInit, OnChanges {
  @Input() valor: number;
  @Input() control: FormControl;
  @Input() disabled: boolean;
  @Input() size: NzSizeLDSType = 'default';
  @Input() placeholder = '';
  @Input() step: number = 5;
  @Input() max: number;
  @Input() min: number;
  @Input() precision: number = 2;
  @Input() simbolo: string = '';

  @Input() validaciones: ValidacionesInterface;

  @Output() readonly valorChange = new EventEmitter<any>();
  @Output() readonly cambioChange = new EventEmitter();

  errorLabel = '';
  funciones = new FuncionesInputs();
  valorTransformado: string = '0';
  obligatorio: boolean = false;

  constructor() {
    this.valorChange = new EventEmitter<any>();
  }

  ngOnInit(): void {
    if (this.control) {
      this.control.setValue(this.valor);
    } else {
      this.control = this.funciones.crearNuevoControl(this.validaciones, this.valor);
    }
    this.comprobarOblogatorio();
    if (!this.valor && this.obligatorio) {
      this.valor = 0;
    }
    this.cambiar();
    if (this.disabled) this.control.disable();
  }

  ngOnChanges() {
    if (this.control && this.valor) {
      this.control.setValue(this.valor);
    } else if (this.control && !this.valor) {
      this.control.setValue(null);
    }
  }

  cambiar(): void {
    this.valor = this.control.value;
    this.errorLabel = this.funciones.obtenerError(this.control);
    if (this.control.valid) {
      this.valorChange.emit(this.valor);
      this.cambioChange.emit();
    } else {
      this.cambioChange.emit();
    }
  }

  conversion = (value: string) => value.trim().replace(',', '.');

  formatter(value: number) {
    if (value) {
      const transformValue = new Intl.NumberFormat('de-DE', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: this.precision
      }).format(value);
      if (this.simbolo) {
        this.valorTransformado = transformValue + this.simbolo;
        return value.toString().trim();
      } else {
        this.valorTransformado = transformValue;
        return value.toString().trim();
      }
    }
  }

  comprobarOblogatorio() {
    if (this.control != null && this.control.validator) {
      // @ts-ignore
      const validador = this.control.validator({} as AbstractControl);
      if (validador && validador['required']) {
        this.obligatorio = true;
      }
    }
  }
}
