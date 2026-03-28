import { ColumnaInterface } from '../../../models/columna.interface';

export const AuditoriaConfig: ColumnaInterface[] = [
  {
    nombre: 'app.fecha',
    campo: 'data',
    campoOrden: 'data',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'data',
    tamanyo: '20%',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.metode',
    campo: 'metode',
    campoOrden: 'metode',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'text',
    tamanyo: '20%',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.url',
    campo: 'url',
    campoOrden: 'url',
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
    tipoFiltro: 'text',
    tamanyo: '20%',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.tempsExecucio',
    campo: 'tempsExecucio',
    campoOrden: 'tempsExecucio',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'text',
    tamanyo: '20%',
    ordenDireccion: ['ascend', 'descend', null]
  }
];
