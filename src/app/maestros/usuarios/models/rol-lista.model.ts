import { BaseModel } from '../../../_infra/shared/models/base.model';
import { RolDetalleModel } from './rol-detalle.model';

export class RolLlistaModel extends BaseModel {
  descripcion: string;
  nombre: string;
  detalles: RolDetalleModel[];
  expand: boolean;
  initialize() {
    return this;
  }

  override deserialize(input: any) {
    Object.assign(this, input);
    this.expand = false;
    this.deserializePermisos();
    return this.prepare();
  }

  deserializePermisos() {
    if (this.detalles) {
      this.detalles = this.detalles.map(per => new RolDetalleModel().deserialize(per));
    }
  }

  override prepare() {
    return this;
  }

  override parse() {
    return this;
  }
}
