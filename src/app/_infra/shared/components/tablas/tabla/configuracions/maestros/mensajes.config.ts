import { ColumnaInterface } from '../../../models/columna.interface';

export const MensajesConfig: ColumnaInterface[] = [
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
    nombre: 'app.fecha',
    campo: 'fecha',
    tamanyo: '15%',
    campoOrden: 'fecha',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'date',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.asunto',
    campo: 'asunto',
    tamanyo: '60%',
    campoOrden: 'asunto',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'text',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.finalizado',
    campo: 'finalizado',
    tamanyo: '20%',
    campoOrden: 'finalizado',
    campoLista: 'finalizados',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'multiple',
    ordenDireccion: ['ascend', 'descend', null]
  }
];
