import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horasMinutos'
})
export class HorasMinutosFilerPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private localeId: string) {}

  transform(value: number, mostrarCero?: boolean): any {
    if (value) {
      const horas = Math.trunc(value / 60);
      const minutos = value % 60;
      if (minutos > 0 || minutos < 0) {
        return horas + ' h ' + minutos + ' m';
      } else {
        return horas + ' h';
      }
    } else {
      if (mostrarCero) {
        return '0 h';
      } else {
        return '';
      }
    }
  }
}
