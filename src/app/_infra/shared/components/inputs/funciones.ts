import { FormControl, Validators } from '@angular/forms';

import { ValidacionesInterface } from './validaciones.interface';

export class FuncionesInputs {
  obtenerError(control: FormControl) {
    let error = '';
    if (control.errors && control.errors['required']) {
      error = `${error}El campo es obligatorio`;
    }
    if (control.errors && control.errors['email']) {
      error = `${error}El format deu ser de tipo correu eléctronic email@domini`;
    }
    if (control.errors && control.errors['maxlength']) {
      error = `${error}El nombre maxim de caràcters és ` + ` ${control.errors['maxlength']['requiredLength']}`;
    }
    if (control.errors && control.errors['minlength']) {
      error = `${error}El nombre mínim de caràcters és` + ` ${control.errors['minlength']['requiredLength']}`;
    }
    if (control.errors && control.errors['max']) {
      error = `${error}El nombre maxim és ` + ` ${control.errors['max']['max']}`;
    }
    if (control.errors && control.errors['min']) {
      error = `${error}El nombre mínim és` + ` ${control.errors['min']['min']}`;
    }
    if (control.errors && control.errors['invalidDni']) {
      error = `El DNI / NIE no compleix amb els requisits`;
    }
    if (control.errors && control.errors['pattern']) {
      error = `El formato del campo no cumple con los requisitos`;
    }
    return error;
  }

  crearNuevoControl(validaciones: ValidacionesInterface, valor: any) {
    const validadores = [];
    if (!validaciones) validaciones = { obligatorio: false };
    if (validaciones.obligatorio) {
      validadores.push(Validators.required);
    }
    if (validaciones.maximo) {
      validadores.push(Validators.maxLength(validaciones.maximo));
    }
    if (validaciones.minimo) {
      validadores.push(Validators.minLength(validaciones.minimo));
    }
    return new FormControl(valor, validadores);
  }
}
