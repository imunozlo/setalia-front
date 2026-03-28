import { ColumnaInterface } from '../../../_infra/shared/components/tablas/models/columna.interface';
import { BaseModel } from '../../../_infra/shared/models/base.model';
import { UtilsFiltros } from '../../../_infra/shared/utils/UtilsFiltros';

export class LogFiltroModel extends BaseModel {
  nivelLog: string;
  fecha: Date[];

  initialize() {
    return this;
  }

  iniciarFiltro(columnas: ColumnaInterface[]) {
    this.nivelLog = UtilsFiltros.obtenerValorFiltro(columnas, 'nivelLog');
    this.fecha = UtilsFiltros.obtenerValorFiltro(columnas, 'fecha');
    return this;
  }

  deserializeFiltros(input: any, columnas: ColumnaInterface[]) {
    Object.assign(this, input);
    UtilsFiltros.asignarValorFiltro(columnas, this.nivelLog, 'nivelLog');
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
