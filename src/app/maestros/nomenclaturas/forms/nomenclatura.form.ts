import { Validators } from '@angular/forms';

export const NomenclaturaForm = {
  tipo: ['', [Validators.required]],
  descripcion: ['', [Validators.required]],
  otraInformacion: ['']
};
