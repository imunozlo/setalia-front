import { ColumnaInterface } from '../../../models/columna.interface';

export const UserConfig: ColumnaInterface[] = [
  {
    nombre: '',
    campo: '',
    tamanyo: '10%',
    campoOrden: '',
    mostrarOrdenacion: false,
    ordenOrdenacion: null,
    filtroActivo: false,
    filtroNoActivo: true,
    tipoFiltro: 'text',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.nombre',
    campo: 'nombre',
    campoOrden: 'nombre',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'text',
    tamanyo: '15%',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.apellidos',
    campo: 'apellidos',
    campoOrden: 'apellidos',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'text',
    tamanyo: '15%',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.usuario',
    campo: 'usuario',
    campoOrden: 'usuario',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'text',
    tamanyo: '10%',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.email',
    campo: 'email',
    campoOrden: 'email',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'text',
    tamanyo: '15%',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.telefono',
    campo: 'telefono',
    campoOrden: 'telefono',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'text',
    tamanyo: '5%',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'configuracion.permisos',
    campo: 'rolesDescripcion',
    campoOrden: 'rolesDescripcion',
    campoLista: 'roles',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'multiple',
    tamanyo: '15%',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.estado',
    campo: 'activo',
    tamanyo: '5%',
    campoOrden: 'activo',
    campoLista: 'activos',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'multiple',
    ordenDireccion: ['ascend', 'descend', null]
  }
];
