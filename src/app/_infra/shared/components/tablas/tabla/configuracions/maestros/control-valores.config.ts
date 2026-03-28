import { ColumnaInterface } from '../../../models/columna.interface';

// CONTROLES QUE ALGUNO DE SUS VALORES TIENE PATRON
export const ControlValoresConfig: ColumnaInterface[] = [
  {
    nombre: 'control.grupo',
    campo: 'grupos',
    tamanyo: '20%',
    campoOrden: 'grupos',
    mostrarOrdenacion: false,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'multiple',
    campoLista: 'grupos',
    campoDescripcionLista: 'texto',
    ordenDireccion: ['ascend', 'descend', null]
  },
  // {
  //   nombre: 'control.grupoFase',
  //   campo: 'grupoFaseTexto',
  //   tamanyo: '20%',
  //   campoOrden: 'grupoFaseTexto',
  //   mostrarOrdenacion: true,
  //   ordenOrdenacion: null,
  //   filtroActivo: false,
  //   valorFiltro: '',
  //   tipoFiltro: 'multiple',
  //   campoLista: 'grupoFaseTexto',
  //   campoDescripcionLista: 'texto',
  //   ordenDireccion: ['ascend', 'descend', null]
  // },
  {
    nombre: 'control.indicador',
    campo: 'medidas',
    tamanyo: '20%',
    campoOrden: 'medidas',
    mostrarOrdenacion: false,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: '',
    ocultarBuscador: true,
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'control.valor',
    campo: 'indicador.valor',
    tamanyo: '10%',
    campoOrden: 'indicador.valor',
    mostrarOrdenacion: false,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: '',
    ocultarBuscador: true,
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'control.unidad',
    campo: 'indicador.unidadId',
    tamanyo: '10%',
    campoOrden: 'indicador.unidadId',
    mostrarOrdenacion: false,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: '',
    ocultarBuscador: true,
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'control.patron',
    campo: 'indicador.patron',
    tamanyo: '10%',
    campoOrden: 'indicador.patron',
    mostrarOrdenacion: false,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: '',
    ocultarBuscador: true,
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'control.delta',
    campo: 'indicador.valor',
    tamanyo: '10%',
    campoOrden: 'indicador.valor',
    mostrarOrdenacion: false,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: '',
    ocultarBuscador: true,
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'control.nivelAlerta',
    campo: 'indicador.delta',
    tamanyo: '20%',
    campoOrden: '',
    mostrarOrdenacion: false,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: '',
    ocultarBuscador: true,
    ordenDireccion: ['ascend', 'descend', null]
  }
];

// CONTROLES QUE ALGUNO DE SUS VALORES NO TIENE PATRON
export const ControlSinPatronValoresConfig: ColumnaInterface[] = [
  {
    nombre: 'control.grupo',
    campo: 'grupos',
    tamanyo: '20%',
    campoOrden: 'grupos',
    mostrarOrdenacion: false,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'multiple',
    campoLista: 'grupos',
    campoDescripcionLista: 'texto',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'control.indicador',
    campo: 'medidas',
    tamanyo: '40%',
    campoOrden: 'medidas',
    mostrarOrdenacion: false,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'multiple',
    campoLista: 'medidas',
    campoDescripcionLista: 'texto',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'control.valor',
    campo: 'indicador.valor',
    tamanyo: '10%',
    campoOrden: 'indicador.valor',
    mostrarOrdenacion: false,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: '',
    ocultarBuscador: true,
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'control.unidad',
    campo: 'indicador.unidadId',
    tamanyo: '10%',
    campoOrden: 'indicador.unidadId',
    mostrarOrdenacion: false,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: '',
    ocultarBuscador: true,
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.alertas',
    campo: 'indicador.delta',
    tamanyo: '20%',
    campoOrden: '',
    mostrarOrdenacion: false,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: '',
    ocultarBuscador: true,
    ordenDireccion: ['ascend', 'descend', null]
  }
];
