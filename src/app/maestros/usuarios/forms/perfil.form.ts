import { Validators } from '@angular/forms';

export const PerfilForm = {
  usuario: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
  nombre: [null, [Validators.required, Validators.maxLength(50)]],
  apellidos: [null, [Validators.required, Validators.maxLength(50)]],
  telefono: [null, [Validators.maxLength(15)]],
  email: [null, [Validators.required, Validators.email]],
  rol: [null, [Validators.required]]
};
