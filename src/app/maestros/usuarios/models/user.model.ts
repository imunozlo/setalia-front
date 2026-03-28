import { BaseModel } from '../../../_infra/shared/models/base.model';

export class UserModel extends BaseModel {
  token: string;
  email: string;
  apellidos: string;
  usuario: string;
  nombre: string;
  telefono: string;
  abreviatura: string;
  descripcion: string;
  activo: boolean;
  activoMostrar: string;
  mensaje: string;
  avatar: string;
  roles: number[];
  rolesDescripcion: string;
  authorities: string[];
  caducado: boolean;
  organizacionId: number;

  initialize() {
    this.edicion = true;
    this.activo = true;
    this.roles = new Array<number>();
    return this;
  }

  override deserialize(input: any) {
    Object.assign(this, input);
    return this.prepare();
  }

  override prepare() {
    if (this.nombre && this.apellidos) {
      this.descripcion = `${this.nombre} ${this.apellidos}`;
    }
    if (this.activo) {
      this.activoMostrar = 'Si';
    } else {
      this.activoMostrar = 'No';
    }
    return this;
  }

  override parse() {
    return this;
  }
}
