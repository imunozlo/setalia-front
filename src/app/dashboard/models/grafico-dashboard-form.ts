import { BaseModel } from "src/app/_infra/shared/models/base.model";

export class GraficoDashboardFormModel extends BaseModel {
    indicadorId: number;
    fechaId: number;
    tipoGraficoId: number;

    initialize() {
        return this;
    }

    override deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    override prepare(): this {
        return this;
    }
}