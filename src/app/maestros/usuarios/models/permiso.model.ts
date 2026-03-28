import { BaseModel } from '../../../_infra/shared/models/base.model';

export class PermisModel extends BaseModel {
  override id: any;
  descripcion: string;
  seleccionado: boolean;
  activo: boolean;

  initialize() {
    return this;
  }

  override deserialize(input: any) {
    Object.assign(this, input);
    if (this.activo == null) this.activo = true;
    return this.prepare();
  }

  override prepare() {
    return this;
  }

  override parse() {
    return this;
  }
}
