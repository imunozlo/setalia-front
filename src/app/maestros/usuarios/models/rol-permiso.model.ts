import { BaseModel } from '../../../_infra/shared/models/base.model';

export class RolPermisoModel extends BaseModel {
  rolId: number;
  rolNombre: string;
  rolDescripcion: string;
  permisoId: string;
  permisoDescripcion: string;
  seleccionado: boolean;

  initialize() {
    return this;
  }

  override deserialize(input: any) {
    Object.assign(this, input);
    return this.prepare();
  }

  override prepare() {
    return this;
  }

  override parse() {
    return this;
  }
}
