import { BaseModel } from '../../_infra/shared/models/base.model';
import { ColumnaInterface } from '../../_infra/shared/components/tablas/models/columna.interface';
import { UtilsFiltros } from '../../_infra/shared/utils/UtilsFiltros';

export class IdentificacionFiltroModel extends BaseModel {
  titulo: string;
  provincia: string[];
  municipio: string[];
  fecha: Date[];
  usuarioId: number;
  estado: 'ABIERTA' | 'RESUELTA';

  initialize() {
    if (!this.pageIndex) this.pageIndex = 1;
    if (!this.pageSize) this.pageSize = 15;
    return this;
  }

  iniciarFiltro(columnas: ColumnaInterface[]) {
    this.titulo = UtilsFiltros.obtenerValorFiltro(columnas, 'titulo');
    this.provincia = UtilsFiltros.obtenerValorFiltro(columnas, 'provincia');
    this.municipio = UtilsFiltros.obtenerValorFiltro(columnas, 'municipio');
    this.fecha = UtilsFiltros.obtenerValorFiltro(columnas, 'fecha');
    this.estado = UtilsFiltros.obtenerValorFiltro(columnas, 'estado');

    if (!this.pageIndex) this.pageIndex = 1;
    if (!this.pageSize) this.pageSize = 15;

    return this;
  }

  deserializeFiltros(input: any, columnas: ColumnaInterface[]) {
    Object.assign(this, input);

    UtilsFiltros.asignarValorFiltro(columnas, this.titulo, 'titulo');
    UtilsFiltros.asignarValorFiltro(columnas, this.provincia, 'provincia');
    UtilsFiltros.asignarValorFiltro(columnas, this.municipio, 'municipio');
    UtilsFiltros.asignarValorFiltro(columnas, this.fecha, 'fecha');
    UtilsFiltros.asignarValorFiltro(columnas, this.estado, 'estado');

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
