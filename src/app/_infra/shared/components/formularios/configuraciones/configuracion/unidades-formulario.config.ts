import { UnidadesForm } from "src/app/maestros/unidades/forms/unidad.form";
import { FormularioInterface } from "../../models/formulario.interface";

export const UnidadFormularioConfig: FormularioInterface = {
  formulario: UnidadesForm,
  alertasSpan: 16,
  alertasOffset: 8,
  campos: [
    {
      obligatorio: true,
      blank: false,
      etiqueta: {
        nombre: 'app.texto',
        tamanyo: 8
      },
      input: {
        tipo: 'text',
        nombre: 'texto',
        valor: 'texto',
        tamanyo: 16
      }
    },
/*    {
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
    },*/
    {
      obligatorio: false,
      blank: false,
      etiqueta: {
        nombre: 'app.formato',
        tamanyo: 8
      },
      input: {
        tipo: 'text',
        nombre: 'formato',
        valor: 'formato',
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
}
