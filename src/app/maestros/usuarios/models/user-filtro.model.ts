import { ColumnaInterface } from '../../../_infra/shared/components/tablas/models/columna.interface';
import { BaseModel } from '../../../_infra/shared/models/base.model';
import { UtilsFiltros } from '../../../_infra/shared/utils/UtilsFiltros';

export class UserFiltroModel extends BaseModel {
  nombre: string;
  apellidos: string;
  usuario: string;
  email: string;
  telefono: string;
  mostrarAvatar: boolean;
  roles: number[];
  activo: number[];
  orden: string;
  campoOrden: string;

  iniciarFiltro(columnas: ColumnaInterface[]) {
    this.nombre = UtilsFiltros.obtenerValorFiltro(columnas, 'nombre');
    this.telefono = UtilsFiltros.obtenerValorFiltro(columnas, 'telefono');
    this.apellidos = UtilsFiltros.obtenerValorFiltro(columnas, 'apellidos');
    this.usuario = UtilsFiltros.obtenerValorFiltro(columnas, 'usuario');
    this.email = UtilsFiltros.obtenerValorFiltro(columnas, 'email');
    this.roles = UtilsFiltros.obtenerValorFiltro(columnas, 'rolesDescripcion');
    this.activo = UtilsFiltros.obtenerValorFiltro(columnas, 'activo');
    this.orden = UtilsFiltros.obtenerValorOrden(columnas);
    this.campoOrden = UtilsFiltros.obtenerCampoOrden(columnas);
    return this;
  }

  deserializeFiltros(input: any, columnas: ColumnaInterface[]) {
    Object.assign(this, input);
    UtilsFiltros.asignarValorFiltro(columnas, this.nombre, 'nombre');
    UtilsFiltros.asignarValorFiltro(columnas, this.telefono, 'telefono');
    UtilsFiltros.asignarValorFiltro(columnas, this.apellidos, 'apellidos');
    UtilsFiltros.asignarValorFiltro(columnas, this.usuario, 'usuario');
    UtilsFiltros.asignarValorFiltro(columnas, this.email, 'email');
    UtilsFiltros.asignarValorFiltro(columnas, this.roles, 'rolesDescripcion');
    UtilsFiltros.asignarValorFiltro(columnas, this.activo, 'activo');
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
