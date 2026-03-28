import { FormularioInterface } from "../../models/formulario.interface";
import { MedidasForm } from "src/app/controles-configuracion/indicadores-unificados/forms/indicadores/medida.form";

export const MedidaFormularioConfig: FormularioInterface = {
    formulario: MedidasForm,
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
      },
      {
        obligatorio: true,
          blank: false,
          etiqueta: {
            nombre: 'app.unidad',
            tamanyo: 8
          },
          input: {
            tipo: 'select',
            nombre: 'unidades',
            valor: 'unidadId',
            lista: 'unidades',
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