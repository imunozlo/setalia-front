import { ColumnaInterface } from '../../../_infra/shared/components/tablas/models/columna.interface';
import { BaseModel } from '../../../_infra/shared/models/base.model';
import { UtilsFiltros } from '../../../_infra/shared/utils/UtilsFiltros';

export class NomenclaturaFiltroModel extends BaseModel {
  descripcion: string;
  activo: string[];
  tipos: number[];

  initialize() {
    return this;
  }

  iniciarFiltro(columnas: ColumnaInterface[]) {
    this.descripcion = UtilsFiltros.obtenerValorFiltro(columnas, 'descripcion');
    this.tipos = UtilsFiltros.obtenerValorFiltro(columnas, 'nomenclaturaTipoDescripcion');
    this.activo = UtilsFiltros.obtenerValorFiltro(columnas, 'activo');
    return this;
  }

  deserializeFiltros(input: any, columnas: ColumnaInterface[]) {
    Object.assign(this, input);
    UtilsFiltros.asignarValorFiltro(columnas, this.descripcion, 'descripcion');
    UtilsFiltros.asignarValorFiltro(columnas, this.tipos, 'nomenclaturaTipoDescripcion');
    UtilsFiltros.asignarValorFiltro(columnas, this.activo, 'activo');
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
