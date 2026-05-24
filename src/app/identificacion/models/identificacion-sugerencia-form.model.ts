import { BaseModel } from '../../_infra/shared/models/base.model';

export class IdentificacionSugerenciaFormModel extends BaseModel {
  identificacionId: number;
  setaId: number;
  usuarioId: number;
  comentario: string;

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
