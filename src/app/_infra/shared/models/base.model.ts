export class BaseModel {
  id: number;
  correcto: boolean;
  error: boolean;
  edicion: boolean;
  pageSize: number = 15;
  pageIndex: number;
  total: number;
  general: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this.prepare();
  }

  prepare() {
    return this;
  }

  parse() {
    return this;
  }
}
