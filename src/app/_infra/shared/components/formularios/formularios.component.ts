import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { FormularioCampoInterface } from './models/formulario-campo.interface';
import { FormularioInterface } from './models/formulario.interface';
import { FormularioRelacionInterface } from './models/formulario-relacion.interface';

@Component({
  selector: 'lib-formularios',
  templateUrl: './formularios.component.html'
})
export class FormulariosComponent implements OnInit, OnDestroy {
  @Input() formulario: FormularioInterface;
  @Input() modelo: any;
  @Input() listasValores: any = {};
  @Input() estado: boolean;
  @Input() id: number;
  @Output() readonly estadoChange = new EventEmitter<boolean>();
  @Output() readonly modeloChange = new EventEmitter<any>();
  @Output() readonly cambioValores = new EventEmitter();
  @Output() readonly campoRelacionadoChange = new EventEmitter<any>();
  @Output() readonly eventClickHover = new EventEmitter<number>();
  @Output() readonly campoSwitchChange = new EventEmitter<any>();
  errorFormularioText: string;
  errorFormulario: boolean;
  camposVisibles: FormularioCampoInterface[];
  camposOcultos: FormularioCampoInterface[];
  hayOcultos = false;
  mostrarOcultos = false;
  form: FormGroup;
  subbscripcions: Subject<void> = new Subject();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group(this.formulario.formulario);
    this.form.valueChanges.pipe(takeUntil(this.subbscripcions)).subscribe(() => {
      this.validarFormulario();
    });
    this.form.statusChanges.pipe(takeUntil(this.subbscripcions)).subscribe(response => {
      this.estado = response === 'VALID';
      this.estadoChange.emit(this.estado);
      this.modeloChange.emit(this.modelo);
      this.cambioValores.emit();
    });
    this.camposVisibles = this.obtenerCamposVisibles();
    this.camposOcultos = this.obtenerCamposOcultos();
  }

  validarFormulario() {
    let hayError = false;
    for (const field in this.form.controls) {
      const control = this.form.get(field);
      if (control?.errors && control?.dirty) {
        hayError = true;
      }
    }
    if (hayError) {
      this.errorFormulario = true;
      this.errorFormularioText = 'app.errorPrincipalFormulario';
    } else {
      this.errorFormulario = false;
      this.errorFormularioText = '';
    }
  }

  volverRelacion(valor: number, relacionado: boolean, nombre: string) {
    if (relacionado) {
      const datos: FormularioRelacionInterface = { valor: valor, nombre: nombre };
      this.campoRelacionadoChange.emit(datos);
    }
  }

  volverSwitch(valor: boolean, campo: string) {
    this.campoSwitchChange.emit({ valor: valor, campo: campo });
  }

  esText(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'text') {
      return true;
    } else {
      return false;
    }
  }

  esHour(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'hour') {
      return true;
    } else {
      return false;
    }
  }

  esNumero(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'number') {
      return true;
    } else {
      return false;
    }
  }

  esTextArea(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'textarea') {
      return true;
    } else {
      return false;
    }
  }

  esEditor(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'editor') {
      return true;
    } else {
      return false;
    }
  }

  esRangoMes(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'date-range-month') {
      return true;
    } else {
      return false;
    }
  }
  esMes(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'date-month') {
      return true;
    } else {
      return false;
    }
  }

  esContrasenya(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'password') {
      return true;
    } else {
      return false;
    }
  }

  esLista(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'select') {
      return true;
    } else {
      return false;
    }
  }

  esListaTree(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'tree') {
      return true;
    } else {
      return false;
    }
  }

  esListaMultiple(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'selectMulti') {
      return true;
    } else {
      return false;
    }
  }

  esSwitch(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'switch') {
      return true;
    } else {
      return false;
    }
  }

  esListaBuscador(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'selectSearch') {
      return true;
    } else {
      return false;
    }
  }

  esFecha(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'date') {
      return true;
    } else {
      return false;
    }
  }

  esRangoFecha(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'dateRange') {
      return true;
    } else {
      return false;
    }
  }

  esProgressBar(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'progress') {
      return true;
    } else {
      return false;
    }
  }

  esEtiquetas(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'etiquetas') {
      return true;
    } else {
      return false;
    }
  }

  esTextoSinInput(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'textoSinInput') {
      return true;
    } else {
      return false;
    }
  }

  obtenerTamanyoTextArea(campo: FormularioCampoInterface) {
    if (campo.input.rows) {
      return this.transformarSegunResolucion(campo.input.rows);
    } else {
      return { minRows: 4, maxRows: 4 };
    }
  }

  transformarSegunResolucion(rows: any) {
    const altura = screen.height;
    if (altura > 1024) {
      return { minRows: rows['rowsXlg'], maxRows: rows['rowsXlg'] };
    } else if (altura <= 1024 && altura > 864) {
      return { minRows: rows['rowsMd'], maxRows: rows['rowsMd'] };
    } else {
      return { minRows: rows['rowsXs'], maxRows: rows['rowsXs'] };
    }
  }

  obtenerCamposVisibles(): FormularioCampoInterface[] {
    return this.formulario.campos.filter(campo => !campo.oculto);
  }

  obtenerCamposOcultos(): FormularioCampoInterface[] {
    this.hayOcultos = this.formulario.campos.some(campo => campo.oculto);
    return this.formulario.campos.filter(campo => campo.oculto);
  }

  ngOnDestroy() {
    this.subbscripcions.next();
  }
}
