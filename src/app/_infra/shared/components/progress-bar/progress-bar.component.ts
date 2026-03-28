import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { ValidacionesInterface } from '../inputs/validaciones.interface';
import { FuncionesInputs } from '../inputs/funciones';

@Component({
  selector: 'lib-progress-bar',
  templateUrl: './progress-bar.component.html'
})
export class ProgressBarComponent implements OnInit{

  @Input() valor: any;
  @Input() tipo = 'progress';
  @Input() disabled: boolean;
  @Input() control: FormControl;
  @Input() size: NzSizeLDSType = 'default';

  @Input() validaciones: ValidacionesInterface;

  errorLabel = '';
  funciones = new FuncionesInputs();
  obligatorio: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.control) {
      this.control.setValue(this.valor);
    }else{
      this.control = this.funciones.crearNuevoControl(this.validaciones, this.valor);
    }
    if (this.disabled) this.control.disable();
  }

  
}
