import { Validators } from '@angular/forms';

export const UsuarioForm = {
  usuario: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
  telefono: [null, [Validators.maxLength(15)]],
  email: [null, [Validators.required, Validators.email]],
  rol: [null, [Validators.required]]
};
