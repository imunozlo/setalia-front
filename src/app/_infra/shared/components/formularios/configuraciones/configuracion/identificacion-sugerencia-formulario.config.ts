import { FormularioInterface } from '../../models/formulario.interface';
import { IdentificacionSugerenciaForm } from '../../../../../../identificacion/forms/identificacion-sugerencia.form';

export const IdentificacionSugerenciaFormularioConfig: FormularioInterface = {
  formulario: IdentificacionSugerenciaForm,
  alertasSpan: 16,
  alertasOffset: 8,
  campos: [
    {
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'bitacora.seta',
        tamanyo: 4,
        class: 'flex-start padding-left-md'
      },
      input: {
        tipo: 'select',
        nombre: 'setaId',
        valor: 'setaId',
        lista: 'setas',
        orden: 'nombreCientifico',
        listaDescripcion: 'nombreCientifico',
        tamanyo: 18
      }
    },
    {
      obligatorio: false,
      blank: false,
      etiqueta: {
        nombre: 'app.observaciones',
        tamanyo: 4,
        class: 'flex-start padding-left-md'
      },
      input: {
        tipo: 'textarea',
        nombre: 'comentario',
        valor: 'comentario',
        rows: { rowsXlg: 4, rowsMd: 3, rowsXs: 2 },
        tamanyo: 18
      }
    }
  ]
};
