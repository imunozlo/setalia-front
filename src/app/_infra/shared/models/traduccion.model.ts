import { BaseModel } from './base.model';

export class TraduccionModel extends BaseModel {
  traduccion: string;
  lang: string;
  parent: number;

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
