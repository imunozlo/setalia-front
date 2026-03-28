import { ColumnaInterface } from '../components/tablas/models/columna.interface';

export class UtilsFiltros {
  static obtenerValorFiltro(columnas: ColumnaInterface[], nombre: string): any {
    let valorFiltro = null;
    columnas.map(columna => {
      if (columna.campo === nombre && columna.valorFiltro) {
        valorFiltro = columna.valorFiltro;
      }
    });
    return valorFiltro;
  }

  static asignarValorFiltro(columnas: ColumnaInterface[], valor: any, nombre: string): any {
    columnas.map(columna => {
      if (columna.campo === nombre && valor) {
        columna.valorFiltro = valor;
      }
    });
  }

  static obtenerValorOrden(columnas: ColumnaInterface[]): any {
    let valor = null;
    columnas.map(columna => {
      if (columna.ordenOrdenacion) {
        valor = columna.ordenOrdenacion;
      }
    });
    return valor;
  }

  static obtenerCampoOrden(columnas: ColumnaInterface[]): any {
    let valor = null;
    columnas.map(columna => {
      if (columna.ordenOrdenacion) {
        valor = columna.campoOrden;
      }
    });
    return valor;
  }
}
