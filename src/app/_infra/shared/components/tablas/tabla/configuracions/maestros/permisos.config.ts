import { ColumnaInterface } from '../../../models/columna.interface';

export const PermisosConfig: ColumnaInterface[] = [
  {
    nombre: '',
    campo: '',
    tamanyo: '5%',
    campoOrden: '',
    mostrarOrdenacion: false,
    ordenOrdenacion: null,
    filtroActivo: false,
    filtroNoActivo: true,
    tipoFiltro: 'text',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.rol',
    campo: 'descripcion',
    campoOrden: 'descripcion',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'text',
    tamanyo: '20%',
    filtroNoActivo: true,
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.modulo',
    campo: 'moduloDescripcion',
    campoOrden: 'moduloDescripcion',
    campoLista: 'modulos',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'multiple',
    tamanyo: '20%',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.permiso',
    campo: 'permisoDescripcion',
    campoOrden: 'permisoDescripcion',
    campoLista: 'permisos',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'multiple',
    tamanyo: '20%',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.consulta',
    campo: 'consulta',
    campoOrden: 'consulta',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'text',
    tamanyo: '15%',
    filtroNoActivo: true,
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.edicion',
    campo: 'edicion',
    campoOrden: 'edicion',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'text',
    tamanyo: '15%',
    filtroNoActivo: true,
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: '',
    campo: '',
    tamanyo: '5%',
    campoOrden: '',
    mostrarOrdenacion: false,
    ordenOrdenacion: null,
    filtroActivo: false,
    filtroNoActivo: true,
    tipoFiltro: 'text',
    ordenDireccion: ['ascend', 'descend', null]
  }
];
