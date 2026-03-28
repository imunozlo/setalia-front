import { BaseModel } from '../../../_infra/shared/models/base.model';

export class LogModel extends BaseModel {
  data: Date;
  url: string;
  metode: string;
  user: string;
  tempsExecucio: number;

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
