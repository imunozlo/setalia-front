import { BaseModel } from '../../../_infra/shared/models/base.model';

export class RolDetalleModel extends BaseModel {
  rolPermisoId: number;
  consulta: boolean;
  rolId: number;
  rolNombre: string;
  rolDescripcion: string;
  permisId: string;
  permisoDescripcion: string;
  moduloId: number;
  moduloDescripcion: string;
  esPrincipal: boolean;
  orden: number;
  expand: boolean;

  initialize() {
    return this;
  }

  override deserialize(input: any) {
    Object.assign(this, input);
    this.expand = false;
    return this.prepare();
  }

  override prepare() {
    return this;
  }

  override parse() {
    return this;
  }
}
