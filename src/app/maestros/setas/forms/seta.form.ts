import { Validators } from '@angular/forms';

export const SetaForm = {
  nombreCientifico: ['', [Validators.required]],
  descripcion: [''],
  nombreComun: ['', [Validators.required]]
};
