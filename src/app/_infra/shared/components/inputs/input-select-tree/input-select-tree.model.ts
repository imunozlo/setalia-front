import { BaseModel } from "../../../models/base.model";

export interface InputSelectTreeModel {
    title: string;
    key: string;
    children: InputSelectTreeModel[];
    etiquetaId: number | null;
    fullTitle?: string;
    disabled: boolean;
    parents: string[];
}