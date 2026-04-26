import { BaseModel } from '../../../_infra/shared/models/base.model';

export class SetaModel extends BaseModel {
  descripcion: string;
  nombreComun: string;
  nombreCientifico: string;

  initialize() {
    this.edicion = true;
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
