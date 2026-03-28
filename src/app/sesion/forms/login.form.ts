import { Validators } from '@angular/forms';

export const LoginForm = {
  usuario: [null, [Validators.required]],
  password: [null, [Validators.required]]
};
