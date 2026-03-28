import { BaseModel } from "src/app/_infra/shared/models/base.model";

export class GraficoDashboardFiltroModel extends BaseModel{
    fechas: Date[]
    graficoId: number

    initialize(){
        this.fechas = []
        this.pageIndex = 0;
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