import { ColumnaInterface } from '../../../models/columna.interface';

export const LogConfig: ColumnaInterface[] = [
  {
    nombre: 'app.fecha',
    campo: 'fecha',
    campoOrden: 'fecha',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'data',
    tamanyo: '20%',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.metodo',
    campo: 'metodo',
    campoOrden: 'metodo',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    filtroNoActivo: true,
    tipoFiltro: 'text',
    tamanyo: '20%',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.nivelLog',
    campo: 'nivelLog',
    campoOrden: 'nivelLog',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'text',
    tamanyo: '20%',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.user',
    campo: 'user',
    campoOrden: 'user',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    filtroNoActivo: true,
    tipoFiltro: 'text',
    tamanyo: '20%',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.clase',
    campo: 'clase',
    campoOrden: 'clase',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    filtroNoActivo: true,
    tipoFiltro: 'text',
    tamanyo: '20%',
    ordenDireccion: ['ascend', 'descend', null]
  }
];
