import { BaseModel } from 'src/app/_infra/shared/models/base.model';

export class IdentificacionSugerenciaModel extends BaseModel {
  identificacionId: number;

  setaId: number;
  setaNombreCientifico: string;
  setaNombreComun: string;

  usuarioId: number;
  usuarioDescripcion: string;

  comentario: string;
  fechaSugerencia: Date;

  supervisor: boolean;

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
