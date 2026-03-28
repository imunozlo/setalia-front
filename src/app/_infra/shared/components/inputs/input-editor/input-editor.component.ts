import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { Toolbar, Editor } from 'ngx-editor';
import { FuncionesInputs } from '../funciones';
import { FormControl } from '@angular/forms';
import { ValidacionesInterface } from '../validaciones.interface';

@Component({
  selector: 'lib-input-editor',
  templateUrl: './input-editor.component.html'
})
export class InputEditorComponent implements OnInit {
  @Input() valor: any;
  @Input() size: NzSizeLDSType = 'default';
  @Input() disabled: boolean;
  @Input() control: FormControl;
  @Input() rows = { minRows: 1, maxRows: 20 };

  @Input() placeholder = '';
  @Input() validaciones: ValidacionesInterface;

  @Output() readonly valorChange = new EventEmitter<any>();
  @Output() readonly cambioChange = new EventEmitter();

  errorLabel = '';
  funciones = new FuncionesInputs();
  obligatorio: boolean = false;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    ['align_left', 'align_center', 'align_right', 'align_justify']
  ];
  editor: Editor;
  locals = {
    bold: 'Negreta',
    italic: 'Cursiva',
    underline: 'Subratllat',
    strike: 'Ratllat',
    text_color: 'Color del text',
    background_color: 'Color de fons',
    align_left: "Alinear a l'esquerra",
    align_center: 'Centrar',
    align_right: 'Alinear a la dreta',
    align_justify: 'Justificar'
  };

  constructor() {
    this.valorChange = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.editor = new Editor();
    if (this.control) {
      this.control.setValue(this.valor);
    } else {
      this.control = this.funciones.crearNuevoControl(this.validaciones, this.valor);
    }
    this.cambiar();
    if (this.disabled) this.control.disable();
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
