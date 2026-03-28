import { BaseModel } from 'src/app/_infra/shared/models/base.model';

export class ArchivoModel extends BaseModel {
  descripcion: string;
  nombre: string;
  tareaDetalleId: number;

  override deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
