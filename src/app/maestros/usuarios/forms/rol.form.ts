import { Validators } from '@angular/forms';

export const RolForm = {
  nombre: [null, [Validators.required, Validators.maxLength(50)]],
  descripcion: [null, [Validators.required, Validators.maxLength(50)]]
};
