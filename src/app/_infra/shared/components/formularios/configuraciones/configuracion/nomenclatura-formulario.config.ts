import { NomenclaturaForm } from '../../../../../../maestros/nomenclaturas/forms/nomenclatura.form';
import { FormularioInterface } from '../../models/formulario.interface';

export const NomenclaturaFormularioConfig: FormularioInterface = {
  formulario: NomenclaturaForm,
  alertasSpan: 16,
  alertasOffset: 8,
  campos: [
    {
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'app.tipo',
        tamanyo: 8
      },
      input: {
        tipo: 'select',
        nombre: 'tipo',
        valor: 'nomenclaturaTipoId',
        lista: 'tipo',
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
        tamanyo: 16
      }
    },
    {
      obligatorio: false,
      blank: false,
      etiqueta: {
        nombre: 'app.otraInformacion',
        tamanyo: 8
      },
      input: {
        tipo: 'text',
        nombre: 'otraInformacion',
        valor: 'otraInformacion',
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
