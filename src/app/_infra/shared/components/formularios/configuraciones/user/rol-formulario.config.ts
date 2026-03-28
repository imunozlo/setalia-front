import { FormularioInterface } from '../../models/formulario.interface';
import { RolForm } from 'src/app/maestros/usuarios/forms/rol.form';

export const RolFormularioConfig: FormularioInterface = {
  formulario: RolForm,
  alertasSpan: 16,
  alertasOffset: 8,
  campos: [
    {
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'app.rol',
        tamanyo: 8
      },
      input: {
        tipo: 'text',
        nombre: 'nombre',
        valor: 'nombre',
        disabled: false,
        tamanyo: 16
      }
    },
    {
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'app.descripcion',
        tamanyo: 8
      },
      input: {
        tipo: 'text',
        nombre: 'descripcion',
        valor: 'descripcion',
        disabled: false,
        tamanyo: 16
      }
    }
  ]
};
