import { PerfilForm } from '../../../../../../maestros/usuarios/forms/perfil.form';
import { FormularioInterface } from '../../models/formulario.interface';

export const PerfilFormularioConfig: FormularioInterface = {
  formulario: PerfilForm,
  alertasSpan: 16,
  alertasOffset: 8,
  campos: [
    {
      obligatorio: false,
      blank: false,
      etiqueta: {
        nombre: 'app.nombreUsuario',
        tamanyo: 8
      },
      input: {
        tipo: 'text',
        nombre: 'usuario',
        valor: 'usuario',
        disabled: true,
        tamanyo: 16
      }
    },
    {
      obligatorio: false,
      blank: false,
      etiqueta: {
        nombre: 'configuracion.permisos',
        tamanyo: 8
      },
      input: {
        tipo: 'text',
        nombre: 'rol',
        disabled: true,
        valor: 'rolesDescripcion',
        tamanyo: 16
      }
    },
    {
      obligatorio: false,
      blank: false,
      etiqueta: {
        nombre: 'app.email',
        tamanyo: 8
      },
      input: {
        tipo: 'text',
        nombre: 'email',
        disabled: true,
        valor: 'email',
        tamanyo: 16
      }
    },
    {
      obligatorio: false,
      blank: false,
      etiqueta: {
        nombre: 'app.nombre',
        tamanyo: 8
      },
      input: {
        tipo: 'text',
        nombre: 'nombre',
        valor: 'nombre',
        disabled: true,
        tamanyo: 16
      }
    },
    {
      obligatorio: false,
      blank: false,
      etiqueta: {
        nombre: 'app.apellidos',
        tamanyo: 8
      },
      input: {
        tipo: 'text',
        nombre: 'apellidos',
        valor: 'apellidos',
        disabled: true,
        tamanyo: 16
      }
    },
    {
      obligatorio: false,
      blank: false,
      etiqueta: {
        nombre: 'app.telefono',
        tamanyo: 8
      },
      input: {
        tipo: 'text',
        nombre: 'telefono',
        valor: 'telefono',
        disabled: true,
        tamanyo: 16
      }
    }
  ]
};
