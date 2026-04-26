import { BaseModel } from 'src/app/_infra/shared/models/base.model';

export class BitacoraFotoModel extends BaseModel {
  nombreArchivo: string;
  grupoId: number;
  bitacoraId: number;
  url: string;
  mimeType: string;
  ruta: string;
  extension: string;

  initialize() {
    return this;
  }

  override deserialize(input: any) {
    Object.assign(this, input);
    return this.prepare();
  }

  override prepare(): this {
    if (this.nombreArchivo) {
      this.extension = this.nombreArchivo.split('.')[1];
    }
    return this;
  }
}
