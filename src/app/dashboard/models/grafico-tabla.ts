import { BaseModel } from "src/app/_infra/shared/models/base.model";


export class GraficoTablaModel extends BaseModel {
    tipoControl: string;
    tipoControlId: number;
    fechaHora: Date;
    controlId: number;
    controlDescripcion: string;
    indicador: string;
    valor: string;
    grupo: string;
    unidad: string;
    alerta: string;

    nivelAlertaId: number;
    tieneAlertas: boolean;

    initialize() {
        return this;
    }

    override deserialize(input: any) {
        Object.assign(this, input);
        this.deserializeNivelesAlerta();
        this.comprobarSiTieneAlertas();
        return this.prepare();
    }

    deserializeNivelesAlerta() {

    }

    comprobarSiTieneAlertas() {
        if (this.nivelAlertaId) {
            this.tieneAlertas = true;
        }
    }

    override prepare(): this {
        return this;
    }
}
