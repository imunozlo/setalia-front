import { Validators } from '@angular/forms';

export const CambioContrasenyaCaducadaForm = {
  usuari: [null, [Validators.required]],
  actual: [null, [Validators.required]],
  nueva: [null, [Validators.required]],
  repetir: [null, [Validators.required]]
};
