import { BaseModel } from '../../../models/base.model';

export class SerieModel extends BaseModel {
  name: string;
  value: any;

  initialize(): any {
    return this;
  }

  override deserialize(input: any) {
    Object.assign(this, input);
    return this.prepare();
  }

  override prepare() {
    return this;
  }
}
