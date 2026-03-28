import { ColumnaInterface } from "../../../models/columna.interface";

export const MedidaConfig: ColumnaInterface[] = [
    {
        nombre: 'app.descripcion',
        campo: 'texto',
        tamanyo: '30%',
        campoOrden: 'texto',
        mostrarOrdenacion: true,
        ordenOrdenacion: null,
        filtroActivo: false,
        valorFiltro: '',
        tipoFiltro: 'text',
        ordenDireccion: ['ascend', 'descend', null]
    },
    {
        nombre: 'app.unidadDescripcion',
        campo: 'unidadDescripcion',
        tamanyo: '30%',
        campoOrden: 'unidad.descripcion',
        mostrarOrdenacion: true,
        ordenOrdenacion: null,
        filtroActivo: false,
        campoLista: 'unidadDescripcion',
        tipoFiltro: 'multiple',
        ordenDireccion: ['ascend', 'descend', null]
    },
    {
        nombre: 'app.formato',
        campo: 'formato',
        tamanyo: '30%',
        campoOrden: 'unidad.formato',
        mostrarOrdenacion: true,
        ordenOrdenacion: null,
        filtroActivo: false,
        valorFiltro: '',
        tipoFiltro: 'text',
        ordenDireccion: ['ascend', 'descend', null]
    },
    {
        nombre: '',
        campo: '',
        tamanyo: '10%',
        campoOrden: '',
        mostrarOrdenacion: false,
        ocultarBuscador: true,
        ordenOrdenacion: null,
        filtroActivo: false,
        tipoFiltro: '',
        ordenDireccion: ['ascend', 'descend', null]
    },

]