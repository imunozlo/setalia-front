import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types/size';

import { FuncionesInputs } from '../funciones';
import { ValidacionesInterface } from '../validaciones.interface';

@Component({
  selector: 'lib-input-hour',
  templateUrl: './input-hour.component.html'
})
export class InputHourComponent implements OnInit, OnChanges {
  @Input() valor: any;
  @Input() tipo = 'text';
  @Input() disabled: boolean;
  @Input() control: FormControl;
  @Input() size: NzSizeLDSType = 'default';

  @Input() placeholder = '';
  @Input() validaciones: ValidacionesInterface;

  @Output() readonly valorChange = new EventEmitter<any>();
  @Output() readonly cambioChange = new EventEmitter();

  errorLabel = '';
  funciones = new FuncionesInputs();
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
