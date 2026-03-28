import { LotesForm } from "src/app/maestros/lotes/forms/lotes.form";
import { FormularioInterface } from "../../models/formulario.interface";

export const LotesFormularioConfig: FormularioInterface = {
    formulario: LotesForm,
    alertasSpan: 16,
    alertasOffset: 8,
    campos: [
        {
            obligatorio: true,
            blank: false,
            etiqueta: {
                nombre: 'app.codigo',
                tamanyo: 8
            },
            input: {
                tipo: 'text',
                nombre: 'codigo',
                valor: 'codigo',
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
                nombre: 'app.fechaInicio',
                tamanyo: 8
            },
            input: {
                tipo: 'date',
                nombre: 'fechaIni',
                valor: 'fechaIni',
                tamanyo: 16
            }
        },

          {
            obligatorio: false,
            blank: false,
            etiqueta: {
                nombre: 'app.fechaFin',
                tamanyo: 8
            },
            input: {
                tipo: 'date',
                nombre: 'fechaFin',
                valor: 'fechaFin',
                tamanyo: 16
            }
        },
        {
            obligatorio: false,
            blank: false,
            etiqueta: {
                nombre: 'app.estado',
                tamanyo: 8
            },
            input: {
                tipo: 'switch',
                nombre: 'activo',
                valor: 'activo',
                tamanyo: 16
            }
        },
    ]
}