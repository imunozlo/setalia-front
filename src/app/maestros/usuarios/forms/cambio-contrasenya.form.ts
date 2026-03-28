import { Validators } from '@angular/forms';

export const CambioContrasenyaForm = {
  actual: [null, [Validators.required]],
  nueva: [null, [Validators.required]],
  repetir: [null, [Validators.required]]
};
