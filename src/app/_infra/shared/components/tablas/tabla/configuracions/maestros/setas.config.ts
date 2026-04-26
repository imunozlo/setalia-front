import { ColumnaInterface } from '../../../models/columna.interface';

export const SetasConfig: ColumnaInterface[] = [
  {
    nombre: 'setas.nombre.cientifico',
    campo: 'nombreCientifico',
    tamanyo: '20%',
    campoOrden: 'nombreCientifico',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'text',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'setas.nombre.comun',
    campo: 'nombreComun',
    tamanyo: '20%',
    campoOrden: 'nombreComun',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'text',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.descripcion',
    campo: 'descripcion',
    tamanyo: '60%',
    campoOrden: 'descripcion',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'text',
    ordenDireccion: ['ascend', 'descend', null]
  }
];
