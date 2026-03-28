import { BaseModel } from '../../../_infra/shared/models/base.model';

export class NomenclaturaModel extends BaseModel {
  descripcion: string;
  text: string;
  activo: boolean;
  otraInformacion: string;
  nomenclaturaTipoId: number;
  nomenclaturaTipoDescripcion: string;

  initialize() {
    this.edicion = true;
    this.activo = true;
    return this;
  }

  override deserialize(input: any) {
    Object.assign(this, input);
    this.descripcion = this.text;
    return this.prepare();
  }

  override prepare(): this {
    this.text = this.descripcion;
    return this;
  }
}
