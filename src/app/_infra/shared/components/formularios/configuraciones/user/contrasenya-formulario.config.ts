import { CambioContrasenyaForm } from 'src/app/maestros/usuarios/forms/cambio-contrasenya.form';
import { FormularioInterface } from '../../models/formulario.interface';

export const ContrasenyaFormularioConfig: FormularioInterface = {
  formulario: CambioContrasenyaForm,
  alertasSpan: 16,
  alertasOffset: 8,
  campos: [
    {
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'app.contrasenyaActual',
        tamanyo: 8
      },
      input: {
        tipo: 'password',
        nombre: 'actual',
        valor: 'actualContrasenya',
        tamanyo: 16
      }
    },
    {
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'app.nuevaContrasenya',
        tamanyo: 8
      },
      input: {
        tipo: 'password',
        nombre: 'nueva',
        valor: 'nuevaContrasenya',
        tamanyo: 16
      }
    },
    {
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'app.repetirContrasenya',
        tamanyo: 8
      },
      input: {
        tipo: 'password',
        nombre: 'repetir',
        valor: 'repetirContrasenya',
        tamanyo: 16
      }
    }
  ]
};
