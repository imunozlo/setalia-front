import { GraficoDashboardForm } from "src/app/dashboard/forms/grafico-dashboard.form";
import { FormularioInterface } from "../../models/formulario.interface";

export const  GraficoDashboardFormularioConfig: FormularioInterface = {
    formulario: GraficoDashboardForm,
    alertasSpan: 16,
    alertasOffset: 8,
    campos: [
        {
            obligatorio: true,
            blank: false,
            etiqueta: {
                nombre: 'app.indicador',
                tamanyo: 8
            },
            input: {
                tipo: 'select',
                nombre: 'indicadorId',
                valor: 'indicadorId',
                tamanyo: 16,
                lista: 'indicadores',
                listaDescripcion: 'texto'
            }
        },
        {
            obligatorio: true,
            blank: false,
            etiqueta: {
                nombre: 'app.fechas',
                tamanyo: 8
            },
            input: {
                tipo: 'select',
                nombre: 'fechaId',
                valor: 'fechaId',
                tamanyo: 16,
                lista: 'fechas'
            }
        },
        {
            obligatorio: true,
            blank: false,
            etiqueta: {
                nombre: 'app.tipusGrafico',
                tamanyo: 8
            },
            input: {
                tipo: 'select',
                nombre: 'tipoGraficoId',
                valor: 'tipoGraficoId',
                tamanyo: 16,
                lista: 'tipusGraficos'
            }
        }
    ]
}