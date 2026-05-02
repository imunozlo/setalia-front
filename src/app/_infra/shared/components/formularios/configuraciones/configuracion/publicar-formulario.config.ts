import { FormularioInterface } from '../../models/formulario.interface';
import { PublicarForm } from '../../../../../../bitacora/forms/publicar.form';

export const PublicarFormularioConfig: FormularioInterface = {
  formulario: PublicarForm,
  alertasSpan: 16,
  alertasOffset: 8,
  campos: [
    {
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'bitacora.titulo',
        tamanyo: 8
      },
      input: {
        tipo: 'text',
        nombre: 'tituloPublico',
        valor: 'tituloPublico',
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
        tipo: 'textarea',
        nombre: 'observacionesPublico',
        valor: 'observacionesPublico',
        tamanyo: 16
      }
    }
  ]
};
