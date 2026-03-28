import { ColumnaInterface } from '../../../_infra/shared/components/tablas/models/columna.interface';
import { BaseModel } from '../../../_infra/shared/models/base.model';
import { UtilsFiltros } from '../../../_infra/shared/utils/UtilsFiltros';

export class AuditoriaFiltroModel extends BaseModel {
  url: string;
  metodo: string;
  user: string;
  fecha: Date[];

  initialize() {
    return this;
  }

  iniciarFiltro(columnas: ColumnaInterface[]) {
    this.url = UtilsFiltros.obtenerValorFiltro(columnas, 'url');
    this.metodo = UtilsFiltros.obtenerValorFiltro(columnas, 'metodo');
    this.user = UtilsFiltros.obtenerValorFiltro(columnas, 'user');
    this.fecha = UtilsFiltros.obtenerValorFiltro(columnas, 'fecha');
    return this;
  }

  deserializeFiltros(input: any, columnas: ColumnaInterface[]) {
    Object.assign(this, input);
    UtilsFiltros.asignarValorFiltro(columnas, this.url, 'url');
    UtilsFiltros.asignarValorFiltro(columnas, this.metodo, 'metodo');
    UtilsFiltros.asignarValorFiltro(columnas, this.user, 'user');
    UtilsFiltros.asignarValorFiltro(columnas, this.fecha, 'fecha');
    return this.prepare();
  }

  override deserialize(input: any) {
    Object.assign(this, input);
    return this.prepare();
  }

  override prepare(): this {
    return this;
  }
}
