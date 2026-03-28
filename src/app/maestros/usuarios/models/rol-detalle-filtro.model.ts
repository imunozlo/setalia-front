import { ColumnaInterface } from '../../../_infra/shared/components/tablas/models/columna.interface';
import { BaseModel } from '../../../_infra/shared/models/base.model';
import { UtilsFiltros } from '../../../_infra/shared/utils/UtilsFiltros';

export class RolDetalleFiltroModel extends BaseModel {
  modulos: number[];
  permisos: string[];

  iniciarFiltro(columnas: ColumnaInterface[]) {
    this.modulos = UtilsFiltros.obtenerValorFiltro(columnas, 'moduloDescripcion');
    this.permisos = UtilsFiltros.obtenerValorFiltro(columnas, 'permisoDescripcion');
    return this;
  }

  deserializeFiltros(input: any, columnas: ColumnaInterface[]) {
    Object.assign(this, input);
    UtilsFiltros.asignarValorFiltro(columnas, this.modulos, 'moduloDescripcion');
    UtilsFiltros.asignarValorFiltro(columnas, this.permisos, 'permisoDescripcion');
    return this.prepare();
  }

  initialize() {
    return this;
  }

  override deserialize(input: any) {
    Object.assign(this, input);
    return this.prepare();
  }

  override prepare(): this {
    return this;
  }
}
