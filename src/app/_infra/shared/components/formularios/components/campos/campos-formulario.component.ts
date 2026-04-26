import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormularioCampoInterface } from '../../models/formulario-campo.interface';
import { FormularioRelacionInterface } from '../../models/formulario-relacion.interface';


@Component({
  selector: 'lib-campos-formulario',
  templateUrl: './campos-formulario.component.html'
})
export class CamposFormularioComponent implements OnInit {
  @Input() campos: FormularioCampoInterface[];
  @Input() modelo: any;
  @Input() listasValores: any = {};
  @Input() id: number;
  @Input() form: FormGroup;
  @Output() readonly modeloChange = new EventEmitter<any>();
  @Output() readonly campoRelacionadoChange = new EventEmitter<any>();
  @Output() readonly eventClickHover = new EventEmitter<number>();
  @Output() readonly campoSwitchChange = new EventEmitter<any>();
  @Output() readonly validarFormularioChange = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['modelo']) {
      console.log('modelo cambiado', this.modelo);
      this.cdr.detectChanges();
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

  esEtiquetasEdicion(campo: FormularioCampoInterface) {
    if (!campo.blank && campo.input.tipo === 'etiquetas-edicion') {
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
}
