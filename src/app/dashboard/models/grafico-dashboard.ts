import { BaseModel } from "src/app/_infra/shared/models/base.model";
import { GraficoValoresModel } from "./grafico-valores";
import { GraficoTablaModel } from "./grafico-tabla";

export class GraficoDashboardModel extends BaseModel {
    graficoId: number;
    titulo: string;
    periodo: Date[];
    tipo: string;
    maximizado: boolean;
    datosLineas: GraficoValoresModel[];
    datosBarras: GraficoValoresModel[];
    tabla: GraficoTablaModel[];
    
    initialize() {
        return this;
    }

    override deserialize(input: any) {
        Object.assign(this, input);
        this.deserializeValores();
        this.deserializeTabla();
        return this.prepare();
    }

    deserializeValores() {
        if (this.datosLineas) {
            this.datosLineas = this.datosLineas.map(et => new GraficoValoresModel().deserialize(et));
        }
        if (this.datosBarras) {
            this.datosBarras = this.datosBarras.map(et => new GraficoValoresModel().deserialize(et));
        }
    }

    deserializeTabla() {
        if (this.tabla) {
            this.tabla = this.tabla.map(et => new GraficoTablaModel().deserialize(et));
        }
    }

    override prepare(): this {
        this.maximizado = false;
        return this;
    }
}