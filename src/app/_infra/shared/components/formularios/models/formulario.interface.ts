import { FormularioCampoInterface } from './formulario-campo.interface';

export interface FormularioInterface {
  campos: FormularioCampoInterface[];
  alertasSpan: number;
  alertasOffset: number;
  formulario: any;
}
