import { BaseModel } from 'src/app/_infra/shared/models/base.model';
import { BitacoraFotoModel } from './bitacora-foto.model';

export class BitacoraModel extends BaseModel {
  titulo: string;
  provincia: string;
  provinciaDescripcion: string;
  municipio: string | null;
  municipioDescripcion: string;
  observaciones: string;
  setaNombreCientifico: string;
  setaNombreComun: string;
  fecha: Date;
  setaId: number;
  latitud: number | null;
  longitud: number | null;
  fotos: BitacoraFotoModel[] = [];

  initialize() {
    this.fotos = [];
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
