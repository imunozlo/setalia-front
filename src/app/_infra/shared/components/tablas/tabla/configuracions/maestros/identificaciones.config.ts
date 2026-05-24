import { ColumnaInterface } from '../../../models/columna.interface';

export const IdentificacionesConfig: ColumnaInterface[] = [
  {
    nombre: 'app.fecha',
    campo: 'fecha',
    tamanyo: '10%',
    campoOrden: 'fecha',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'date',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'bitacora.titulo',
    campo: 'titulo',
    tamanyo: '28%',
    campoOrden: 'titulo',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'text',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'bitacora.provincia',
    campo: 'provincia',
    tamanyo: '14%',
    campoOrden: 'provincia',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'multiple',
    campoLista: 'provincias',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'bitacora.municipio',
    campo: 'municipio',
    tamanyo: '14%',
    campoOrden: 'municipio',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'multiple',
    campoLista: 'municipios',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.estado',
    campo: 'estado',
    tamanyo: '12%',
    campoOrden: 'estado',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'lista',
    campoLista: 'estadosIdentificacion',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.nombreUsuario',
    campo: 'usuarioDescripcion',
    tamanyo: '17%',
    campoOrden: 'usuario.nombre',
    mostrarOrdenacion: false,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: '',
    ocultarBuscador: true,
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: '',
    campo: '',
    tamanyo: '5%',
    campoOrden: '',
    mostrarOrdenacion: false,
    ocultarBuscador: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: '',
    ordenDireccion: ['ascend', 'descend', null]
  }
];

