import { PatronesDrawerForm } from "src/app/controles-configuracion/patrones/forms/patron.form";
import { FormularioInterface } from "../../models/formulario.interface";

export const PatronFormularioDrawerConfig: FormularioInterface = {
	formulario: PatronesDrawerForm,
	alertasSpan: 16,
	alertasOffset: 8,
	campos: [
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
				relacionado: true,
				tamanyo: 16
			}
		},
		{
			obligatorio: true,
			blank: false,
			etiqueta: {
				nombre: 'producto.titulo',
				tamanyo: 8
			},
			input: {
				tipo: 'select',
				nombre: 'producto',
				valor: 'productoId',
				lista: 'productos',
				tamanyo: 16
			}
		},
		{
			obligatorio: true,
			blank: false,
			etiqueta: {
				nombre: 'app.indicador',
				tamanyo: 8
			},
			input: {
				tipo: 'select',
				nombre: 'indicador',
				valor: 'indicadorId',
				lista: 'indicadores',
        listaDescripcion: 'texto',
				tamanyo: 16
			}
		},
		{
			obligatorio: false,
			blank: false,
			etiqueta: {
				nombre: 'app.fase',
				tamanyo: 8
			},
			input: {
				tipo: 'select',
				nombre: 'fase',
				valor: 'faseId',
				lista: 'fases',
				tamanyo: 16
			}
		},
		{
			obligatorio: true,
			blank: false,
			etiqueta: {
				nombre: 'app.valor',
				tamanyo: 8
			},
			input: {
				tipo: 'text',
				nombre: 'valor',
				valor: 'valor',
				tamanyo: 16
			}
		},
		{
			obligatorio: false,
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
		  }
	]
}
