import { NomenclaturaForm } from '../../../../../../maestros/nomenclaturas/forms/nomenclatura.form';
import { FormularioInterface } from '../../models/formulario.interface';
import { SetaForm } from '../../../../../../maestros/setas/forms/seta.form';

export const SetaFormularioConfig: FormularioInterface = {
  formulario: SetaForm,
  alertasSpan: 16,
  alertasOffset: 8,
  campos: [
    {
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'setas.nombre.cientifico',
        tamanyo: 8
      },
      input: {
        tipo: 'text',
        nombre: 'nombreCientifico',
        valor: 'nombreCientifico',
        tamanyo: 16
      }
    },
    {
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'setas.nombre.comun',
        tamanyo: 8
      },
      input: {
        tipo: 'text',
        nombre: 'nombreComun',
        valor: 'nombreComun',
        tamanyo: 16
      }
    },
    {
      obligatorio: false,
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
    }
  ]
};
