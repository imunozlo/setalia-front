import { NzTableSortOrder } from 'ng-zorro-antd/table';

export interface ColumnaInterface {
  nombre: string;
  campo: string;
  campoOrden: string;
  campoExportacion?: string;
  ordenOrdenacion: NzTableSortOrder | null;
  ordenDireccion: NzTableSortOrder[];
  filtroActivo: boolean;
  visibleExportacion?: boolean;
  ocultarBuscador?: boolean;
  valorFiltro?: any;
  tipoFiltro: string; //llista, text, multiple, data
  campoLista?: string; //Nom de la llista de valores
  campoDescripcionLista?: string; //Campo de los valores de la lista
  filtroNoActivo?: boolean; //Desactiva el filtr
  valor?: any;
  tamanyo?: string;
  mostrarOrdenacion?: boolean;
}
