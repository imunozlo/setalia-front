import { BaseModel } from '../../../_infra/shared/models/base.model';

export class CambioContrasenyaModel extends BaseModel {
  actualContrasenya: string;
  nuevaContrasenya: string;
  repetirContrasenya: string;
  usuario: string;

  initialize() {
    return this;
  }

  override deserialize(input: any) {
    Object.assign(this, input);
    return this.prepare();
  }
}
