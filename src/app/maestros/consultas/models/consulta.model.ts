import { BaseModel } from '../../../_infra/shared/models/base.model';
import { NomenclaturaModel } from '../../nomenclaturas/models/nomenclatura.model';
import { NomenclaturaTipoModel } from '../../nomenclaturas/models/tipo-nomenclatura.model';
import { RolModel } from '../../usuarios/models/rol.model';
import { SetaModel } from '../../setas/models/seta.model';

export class ConsultaModel extends BaseModel {
  nomenclaturas: NomenclaturaModel[];
  nomneclaturasTipos: NomenclaturaTipoModel[];
  roles: RolModel[];
  setas: SetaModel[];

  initialize() {
    return this;
  }

  override deserialize(input: any) {
    Object.assign(this, input);
    this.deserializeListas();
    return this.prepare();
  }

  deserializeListas() {
    if (this.nomenclaturas) this.nomenclaturas = this.nomenclaturas.map(e => new NomenclaturaModel().deserialize(e));
    if (this.nomneclaturasTipos) this.nomneclaturasTipos = this.nomneclaturasTipos.map(e => new NomenclaturaTipoModel().deserialize(e));
    if (this.roles) this.roles = this.roles.map(e => new RolModel().deserialize(e));
    if (this.setas) this.setas = this.setas.map(e => new SetaModel().deserialize(e));
  }

  override prepare(): this {
    return this;
  }
}
