import { BaseModel } from '../../../_infra/shared/models/base.model';

export class ModuloModel extends BaseModel {
  titulo: string;
  cabecera: boolean;
  subtitulo: string;
  descripcion: string;
  icono: string;
  iconoColor: string;
  color: string;
  ruta: string;
  rutaDetalle: string;
  permisos: string;
  principal: boolean;
  activo: boolean;
  seleccionado: boolean;
  orden: number;
  abierta: boolean;
  opciones: ModuloModel[];

  initialize() {
    return this;
  }

  override deserialize(input: any) {
    this.abierta = false;
    Object.assign(this, input);
    this.deserializeOpciones();
    return this.prepare();
  }

  deserializeOpciones() {
    if (this.opciones) {
      this.opciones = this.opciones.map(opcion => new ModuloModel().deserialize(opcion));
    }
  }

  override prepare(): this {
    return this;
  }
}
