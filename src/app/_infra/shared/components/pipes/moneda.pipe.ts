import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneda'
})
export class MonedaFilterPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private localeId: string) {}

  transform(value: number, fractionDigits?: number, muestraCeros?: boolean, simbolo?: string): any {
    if (!fractionDigits) {
      fractionDigits = 0;
    }
    if (!simbolo) {
      simbolo = '€';
    }
    if (value) {
      const number = new Intl.NumberFormat('de-DE', {
        style: 'decimal',
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
      }).format(value);
      return number + ' ' + simbolo;
    }
    if (muestraCeros) {
      return 0;
    } else {
      return '';
    }
  }
}
