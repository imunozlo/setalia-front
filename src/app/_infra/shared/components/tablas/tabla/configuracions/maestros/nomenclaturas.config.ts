import { ColumnaInterface } from '../../../models/columna.interface';

export const NomenclaturasConfig: ColumnaInterface[] = [
  {
    nombre: 'app.tipo',
    campo: 'nomenclaturaTipoDescripcion',
    tamanyo: '45%',
    campoOrden: 'nomenclaturaTipo',
    campoLista: 'tipo',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    tipoFiltro: 'multiple',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.descripcion',
    campo: 'descripcion',
    tamanyo: '45%',
    campoOrden: 'descripcion',
    mostrarOrdenacion: true,
    ordenOrdenacion: null,
    filtroActivo: false,
    valorFiltro: '',
    tipoFiltro: 'text',
    ordenDireccion: ['ascend', 'descend', null]
  },
  {
    nombre: 'app.estado',
    campo: 'activo',
    tamanyo: '10%',
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
