import { BaseModel } from '../../../_infra/shared/models/base.model';

export class NomenclaturaTipoModel extends BaseModel {
  descripcion: string;
  activo: boolean;

  initialize() {
    this.edicion = true;
    return this;
  }

  override deserialize(input: any) {
    Object.assign(this, input);
    this.activo = true;
    return this.prepare();
  }

  override prepare() {
    return this;
  }
}
