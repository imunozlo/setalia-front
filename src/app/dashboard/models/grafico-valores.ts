import { BaseModel } from "src/app/_infra/shared/models/base.model";

export class GraficoValoresModel extends BaseModel {
    name: string;
    value: number;

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