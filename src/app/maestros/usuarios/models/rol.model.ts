import { RolPermisoModel } from './rol-permiso.model';
import { BaseModel } from '../../../_infra/shared/models/base.model';

export class RolModel extends BaseModel {
  descripcion: string;
  nombre: string;
  codigo: string;
  responsable: boolean;
  permisos: RolPermisoModel[];

  initialize() {
    return this;
  }

  override deserialize(input: any) {
    Object.assign(this, input);
    this.deserializePermisos();
    return this.prepare();
  }

  deserializePermisos() {
    if (this.permisos) {
      this.permisos = this.permisos.map(per => new RolPermisoModel().deserialize(per));
    }
  }

  override prepare() {
    return this;
  }

  override parse() {
    return this;
  }
}
