import { Validators } from '@angular/forms';

export const IdentificacionForm = {
  titulo: ['', Validators.required],
  fecha: ['', Validators.required],
  provincia: ['', Validators.required],
  municipio: [''],
  observaciones: ['']
};
