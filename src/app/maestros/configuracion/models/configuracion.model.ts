import { BaseModel } from 'src/app/_infra/shared/models/base.model';

export class ConfiguracionModel extends BaseModel {
  contrasenyaDiasCaducidad: number;
  contrasenyaNumeroRotacion: number;
  contrasenyaMinimoCaracteres: number;
  contrasenyaValidarMayuscula: boolean;
  contrasenyaValidarNumero: boolean;
  contrasenyaValidarSimbolo: boolean;

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

  hiHaRotacio() {
    if (this.contrasenyaNumeroRotacion != null && this.contrasenyaNumeroRotacion > 1) {
      return true;
    } else {
      return false;
    }
  }
}
