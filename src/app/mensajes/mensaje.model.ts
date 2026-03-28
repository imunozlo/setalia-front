import { BaseModel } from 'src/app/_infra/shared/models/base.model';

export class MensajeModel extends BaseModel {
  asunto: string;
  mensaje: string;
  fecha: Date;
  finalizado: boolean;
  empleadoId: number;
  empleadoNombre: string;
  empleadoApellidos: string;
  expand: boolean;

  initialize() {
    this.expand = false;
    return this;
  }

  override deserialize(input: any) {
    Object.assign(this, input);
    this.expand = false;
    return this.prepare();
  }
}
