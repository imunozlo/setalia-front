import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types/size';
import { NzDatePickerI18nInterface } from 'ng-zorro-antd/i18n';

import { FuncionesInputs } from '../funciones';
import { ValidacionesInterface } from '../validaciones.interface';

@Component({
  selector: 'lib-input-date-range',
  templateUrl: './input-date-range.component.html'
})
export class InputDateRangeComponent implements OnInit, OnChanges {
  @Input() valor: Date[];
  @Input() control: FormControl;
  @Input() disabled: boolean;
  @Input() size: NzSizeLDSType = 'small';
  @Input() rangos: [];

  @Input() placeholder = '';

  @Input() tipo: string; // date | week | month | year
  @Input() fechaMinima: Date;
  @Input() fechaMaxima: Date;

  @Input() validaciones: ValidacionesInterface;

  @Output() readonly valorChange = new EventEmitter<Date[]>();
  @Output() readonly cambioValor = new EventEmitter<Date[]>();

  format: string;
  dateFormat = 'dd/MM/yyyy';
  monthFormat = 'MM/yyyy';
  yearFormat = 'yyyy';
  errorLabel = '';
  funciones = new FuncionesInputs();

  locale: NzDatePickerI18nInterface = {
    lang: {
      placeholder: 'Seleccionar fecha',
      rangePlaceholder: ['Fecha inicio', 'Fecha fin'],
      today: 'Hoy',
      now: 'Ahora',
      backToToday: 'Volver',
      ok: 'OK',
      clear: 'Limpiar',
      month: 'Mes',
      year: 'Año',
      timeSelect: 'Seleccionar hora',
      dateSelect: 'Seleccionar día',
      monthSelect: 'Seleccionar mes',
      yearSelect: 'Seleccionar año',
      decadeSelect: 'Seleccionar decada',
      yearFormat: 'YYYY',
      dateFormat: 'D/M/YYYY',
      dayFormat: 'D',
      dateTimeFormat: 'D/M/YYYY HH:mm:ss',
      monthFormat: 'MMMM',
      monthBeforeYear: false,
      previousMonth: 'Mes anterior',
      nextMonth: 'Mes siguiente',
      previousYear: 'Último año',
      nextYear: 'Següent any',
      previousDecade: 'Última decada',
      nextDecade: 'Siguiente decada',
      previousCentury: 'Último siglo',
      nextCentury: 'Siguiente siglo'
    },
    timePickerLocale: {
      placeholder: 'Seleccionar hora'
    }
  };

  ngOnInit(): void {
    if (!this.tipo) {
      this.tipo = 'date';
      this.format = this.dateFormat;
    } else if (this.tipo === 'month') {
      this.format = this.monthFormat;
    } else if (this.tipo === 'year') {
      this.format = this.yearFormat;
    } else if (this.tipo === 'date') {
      this.format = this.dateFormat;
    }
    if (this.control) {
      this.control.setValue(this.valor);
    } else {
      this.control = this.funciones.crearNuevoControl(this.validaciones, this.valor);
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
      this.cambioValor.emit();
    } else {
      this.cambioValor.emit();
    }
  }

  disabledEndDate = (current: Date): boolean => {
    return this.minDate(current) || this.maxDate(current);
  };

  private minDate(endValue: Date) {
    if (!endValue || !this.fechaMinima) {
      return false;
    }
    return endValue.getTime() < this.fechaMinima.getTime();
  }

  private maxDate(endValue: Date) {
    if (!endValue || !this.fechaMaxima) {
      return false;
    }
    return endValue.getTime() > this.fechaMaxima.getTime();
  }
}
