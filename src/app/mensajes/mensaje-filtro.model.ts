import { ColumnaInterface } from 'src/app/_infra/shared/components/tablas/models/columna.interface';
import { BaseModel } from 'src/app/_infra/shared/models/base.model';
import { UtilsFiltros } from 'src/app/_infra/shared/utils/UtilsFiltros';

export class MensajeFiltroModel extends BaseModel {
  usuarioId: number;
  finalizadaId: number;
  finalizada: string[];
  fechas: Date[];
  orden: string;
  campoOrden: string;

  initialize() {
    this.fechas = [];
    this.pageIndex = 1;
    this.pageSize = 15;
    return this;
  }

  iniciarFiltro(columnas: ColumnaInterface[]) {
    this.fechas = UtilsFiltros.obtenerValorFiltro(columnas, 'fecha');
    this.finalizada = UtilsFiltros.obtenerValorFiltro(columnas, 'finalizada');
    this.orden = UtilsFiltros.obtenerValorOrden(columnas);
    this.campoOrden = UtilsFiltros.obtenerValorOrden(columnas);
    if (!this.pageIndex) this.pageIndex = 1;
    if (!this.pageSize) this.pageSize = 15;
    return this;
  }

  deserializeFiltros(input: any, columnas: ColumnaInterface[]) {
    Object.assign(this, input);
    UtilsFiltros.asignarValorFiltro(columnas, this.fechas, 'fecha');
    UtilsFiltros.asignarValorFiltro(columnas, this.finalizada, 'finalizada');
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
