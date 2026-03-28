import { Validators } from "@angular/forms";

export const GraficoDashboardForm = {
    indicadorId: ['', Validators.required],
    fechaId: ['', Validators.required],
    tipoGraficoId: ['', Validators.required]
}