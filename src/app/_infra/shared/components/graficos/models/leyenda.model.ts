import { BaseModel } from '../../../models/base.model';

export class LeyendaModel extends BaseModel {
  color: string;
  descripcion: string;

  initialize(): any {
    return this;
  }

  iniciar(descripcion: string, color: string): any {
    this.color = color;
    this.descripcion = descripcion;
    return this;
  }
}
