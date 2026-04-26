import { ColumnaInterface } from '../../../models/columna.interface';

export const BitacorasConfig: ColumnaInterface[] = [
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
    tamanyo: '35%',
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
    tamanyo: '15%',
    campoOrden: 'provincia',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'text',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'bitacora.municipio',
    campo: 'municipio',
    tamanyo: '15%',
    campoOrden: 'municipio',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'text',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'bitacora.seta',
    campo: 'setaId',
    tamanyo: '20%',
    campoOrden: 'seta.nombreCientifico',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'multiple',
    campoLista: 'setas',
    visibleExportacion: true,
    campoDescripcionLista: 'nombreCientifico',
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
