import { FormularioInterface } from '../../models/formulario.interface';
import { BitacoraForm } from '../../../../../../bitacora/forms/bitacora.form';

export const BitacoraFormularioConfig: FormularioInterface = {
  formulario: BitacoraForm,
  alertasSpan: 16,
  alertasOffset: 8,
  campos: [
    {
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'bitacora.titulo',
        tamanyo: 2,
        class: 'flex-start padding-left-xlg'
      },
      input: {
        tipo: 'text',
        nombre: 'titulo',
        valor: 'titulo',
        tamanyo: 14
      }
    },
    {
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'app.fecha',
        tamanyo: 2,
        class: 'flex-start padding-left-xlg'
      },
      input: {
        tipo: 'date',
        nombre: 'fecha',
        valor: 'fecha',
        tamanyo: 6
      }
    },
    {
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'bitacora.seta',
        tamanyo: 2,
        class: 'flex-start padding-left-xlg'
      },
      input: {
        tipo: 'select',
        nombre: 'setaId',
        valor: 'setaId',
        lista: 'setas',
        orden: 'nombreCientifico',
        listaDescripcion: 'nombreCientifico',
        tamanyo: 6
      }
    },
    {
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'bitacora.provincia',
        tamanyo: 2,
        class: 'flex-start padding-left-xlg'
      },

      input: {
        tipo: 'select',
        nombre: 'provincia',
        valor: 'provincia',
        lista: 'provincias',
        relacionado: true,
        tamanyo: 6
      }
    },
    {
      obligatorio: false,
      blank: false,
      etiqueta: {
        nombre: 'bitacora.municipio',
        tamanyo: 2,
        class: 'flex-start padding-left-xlg'
      },
      input: {
        tipo: 'select',
        nombre: 'municipio',
        valor: 'municipio',
        lista: 'municipios',
        listaDescripcion: 'descripcion',
        tamanyo: 6
      }
    },

    {
      obligatorio: false,
      blank: false,
      etiqueta: {
        nombre: 'app.observaciones',
        tamanyo: 2,
        class: 'flex-start padding-left-xlg'
      },
      input: {
        tipo: 'textarea',
        nombre: 'observaciones',
        valor: 'observaciones',
        rows: { rowsXlg: 4, rowsMd: 2, rowsXs: 1 },
        tamanyo: 22
      }
    }
  ]
};
