import { UsuarioForm } from 'src/app/maestros/usuarios/forms/usuario.form';

import { FormularioInterface } from '../../models/formulario.interface';

export const UsuarioFormularioConfig: FormularioInterface = {
  formulario: UsuarioForm,
  alertasSpan: 16,
  alertasOffset: 8,
  campos: [
    {
      obligatorio: true,
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
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'app.email',
        tamanyo: 8
      },
      input: {
        tipo: 'text',
        nombre: 'email',
        valor: 'email',
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
        tamanyo: 16
      }
    },
    {
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'configuracion.permisos',
        tamanyo: 8
      },
      input: {
        tipo: 'selectMulti',
        nombre: 'rol',
        valor: 'roles',
        lista: 'roles',
        tamanyo: 16
      }
    },
    {
      obligatorio: false,
      blank: false,
      etiqueta: {
        nombre: 'app.activo',
        tamanyo: 8
      },
      input: {
        tipo: 'switch',
        nombre: 'activo',
        valor: 'activo',
        tamanyo: 16
      }
    }
  ]
};
