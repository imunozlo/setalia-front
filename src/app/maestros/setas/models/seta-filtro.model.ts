import { ColumnaInterface } from '../../../_infra/shared/components/tablas/models/columna.interface';
import { BaseModel } from '../../../_infra/shared/models/base.model';
import { UtilsFiltros } from '../../../_infra/shared/utils/UtilsFiltros';

export class SetaFiltroModel extends BaseModel {
  descripcion: string;
  nombreCientifico: string;
  nombreComun: string;

  initialize() {
    if (!this.pageIndex) this.pageIndex = 1;
    if (!this.pageSize) this.pageSize = 15;
    return this;
  }

  iniciarFiltro(columnas: ColumnaInterface[]) {
    this.descripcion = UtilsFiltros.obtenerValorFiltro(columnas, 'descripcion');
    this.nombreCientifico = UtilsFiltros.obtenerValorFiltro(columnas, 'nombreCientifico');
    this.nombreComun = UtilsFiltros.obtenerValorFiltro(columnas, 'nombreComun');
    if (!this.pageIndex) this.pageIndex = 1;
    if (!this.pageSize) this.pageSize = 15;
    return this;
  }

  deserializeFiltros(input: any, columnas: ColumnaInterface[]) {
    Object.assign(this, input);
    UtilsFiltros.asignarValorFiltro(columnas, this.descripcion, 'descripcion');
    UtilsFiltros.asignarValorFiltro(columnas, this.nombreCientifico, 'nombreCientifico');
    UtilsFiltros.asignarValorFiltro(columnas, this.nombreComun, 'nombreComun');
    if (!this.pageIndex) this.pageIndex = 1;
    if (!this.pageSize) this.pageSize = 15;
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
