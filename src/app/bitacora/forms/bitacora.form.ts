import { Validators } from "@angular/forms";

export const BitacoraForm = {
  titulo: ['', Validators.required],
  fecha: ['', Validators.required],
  provincia: ['', Validators.required],
  municipio: [''],
  setaId: [''],
  latitud: [''],
  longitud: [''],
  tituloPublico: [''],
  observacionesPublico: [''],
  observaciones: ['']
};
