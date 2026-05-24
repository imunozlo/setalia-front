import { BaseModel } from 'src/app/_infra/shared/models/base.model';
import { IdentificacionFotoModel } from './identificacion-foto.model';
import { IdentificacionSugerenciaModel } from './identificacion-sugerencia.model';

export class IdentificacionModel extends BaseModel {
  titulo: string;
  provincia: string;
  provinciaDescripcion: string;
  municipio: string | null;
  municipioDescripcion: string;
  fecha: Date;
  observaciones: string;

  estado: 'ABIERTA' | 'RESUELTA';

  usuarioId: number;
  usuarioDescripcion: string;

  setaResueltaId: number;
  setaResueltaNombreCientifico: string;
  setaResueltaNombreComun: string;
  fechaResolucion: Date;

  fotos: IdentificacionFotoModel[] = [];
  sugerencias: IdentificacionSugerenciaModel[] = [];

  initialize() {
    this.estado = 'ABIERTA';
    this.fotos = [];
    this.sugerencias = [];
    return this;
  }

  override deserialize(input: any) {
    Object.assign(this, input);

    this.fotos = (input?.fotos ?? []).map((foto: IdentificacionFotoModel) => new IdentificacionFotoModel().deserialize(foto));

    this.sugerencias = (input?.sugerencias ?? []).map((sugerencia: IdentificacionSugerenciaModel) =>
      new IdentificacionSugerenciaModel().deserialize(sugerencia)
    );

    return this.prepare();
  }

  override prepare(): this {
    return this;
  }
}
