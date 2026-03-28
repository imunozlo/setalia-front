import { ClientesForm } from "src/app/maestros/clientes/forms/cliente.form";
import { FormularioInterface } from "../../models/formulario.interface";

export const ClienteFormularioConfig: FormularioInterface = {
    formulario: ClientesForm,
    alertasSpan: 16,
    alertasOffset: 8,
    campos: [
        {
            obligatorio: true,
            blank: false,
            etiqueta: {
                nombre: 'app.nif',
                tamanyo: 8
            },
            input: {
                tipo: 'text',
                nombre: 'nif',
                valor: 'nif',
                tamanyo: 16
            }
        },
        {
            obligatorio: true,
            blank: false,
            etiqueta: {
                nombre: 'app.nombre',
                tamanyo: 8
            },
            input: {
                tipo: 'text',
                nombre: 'nombre',
                valor: 'nombre',
                tamanyo: 16
            }
        },
        {
            obligatorio: true,
            blank: false,
            etiqueta: {
                nombre: 'app.email',
                tamanyo: 8
            },
            input: {
                tipo: 'text',
                nombre: 'email',
                valor: 'email',
                tamanyo: 16
            }
        },
        {
            obligatorio: true,
            blank: false,
            etiqueta: {
                nombre: 'app.telefono',
                tamanyo: 8
            },
            input: {
                tipo: 'text',
                nombre: 'telefono',
                valor: 'telefono',
                tamanyo: 16
            }
        },
        {
            obligatorio: false,
            blank: false,
            etiqueta: {
                nombre: 'app.abreviatura',
                tamanyo: 8
            },
            input: {
                tipo: 'text',
                nombre: 'abreviatura',
                valor: 'abreviatura',
                tamanyo: 16
            }
        },
        {
            obligatorio: true,
            blank: false,
            etiqueta: {
                nombre: 'app.direccion',
                tamanyo: 8
            },
            input: {
                tipo: 'text',
                nombre: 'direccion',
                valor: 'direccion',
                tamanyo: 16
            }
        },
        {
            obligatorio: false,
            blank: false,
            etiqueta: {
                nombre: 'app.poblacion',
                tamanyo: 8
            },
            input: {
                tipo: 'text',
                nombre: 'poblacion',
                valor: 'poblacion',
                tamanyo: 16
            }
        },
        {
            obligatorio: false,
            blank: false,
            etiqueta: {
                nombre: 'app.codigopostal',
                tamanyo: 8
            },
            input: {
                tipo: 'text',
                nombre: 'codigoPostal',
                valor: 'codigoPostal',
                tamanyo: 16
            }
        }
    ]
}
