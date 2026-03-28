import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[inputMask]'
})
export class MaskDirective {
  @Input('inputMask') mask: string = ''; // Máscara desde el HTML

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(): void {
    const input = this.el.nativeElement;
    const rawValue = input.value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
    const formattedValue = this.formatTo24HourTime(rawValue);
    input.value = formattedValue;
  }

  private formatTo24HourTime(value: string): string {
    if (!value) {
      return '';
    }

    let hours = value.slice(0, 2); // Obtener los primeros 2 dígitos (horas)
    let minutes = value.slice(2, 4); // Obtener los siguientes 2 dígitos (minutos)

    // Validar horas (00–23)
    if (parseInt(hours, 10) > 23) {
      hours = '23';
    }

    // Validar minutos (00–59)
    if (minutes && parseInt(minutes, 10) > 59) {
      minutes = '59';
    }

    // Construir el valor formateado
    if (value.length <= 2) {
      return hours; // Solo las horas si el usuario no ha terminado de escribir
    } else {
      return `${hours}:${minutes}`;
    }
  }
}
