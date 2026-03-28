import { BaseModel } from '../../../models/base.model';
import { SerieModel } from './serie.model';

export class GraficoModel extends BaseModel {
  name: string;
  value: any;
  series: Array<SerieModel>;

  initialize(): any {
    return this;
  }

  override deserialize(input: any): this {
    Object.assign(this, input);
    if (this.series) {
      this.series = this.series.map(serie => new SerieModel().deserialize(serie));
    }
    return this.prepare();
  }
}
