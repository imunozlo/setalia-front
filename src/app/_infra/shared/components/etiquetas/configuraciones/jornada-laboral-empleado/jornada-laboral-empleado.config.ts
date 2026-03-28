import { EtiquetaCampoInterface } from '../../models/etiqueta-campo.interface';

export const JornadaLaboralEtiquetasConfig: EtiquetaCampoInterface[] = [
  {
    nombre: 'app.fichajes',
    tipo: 'text',
    tamanyo: 6,
    tamanyoValor: 6,
    valor: 'fichajes'
  },
  {
    nombre: 'app.jornada',
    tipo: 'hour',
    tamanyo: 6,
    tamanyoValor: 6,
    valor: 'jornada'
  },
  {
    nombre: 'app.trabajado',
    tipo: 'hour',
    tamanyo: 6,
    tamanyoValor: 6,
    valor: 'trabajados'
  },
  {
    nombre: 'app.diferencia',
    tipo: 'hourDiference',
    tamanyo: 6,
    tamanyoValor: 6,
    valor: 'diferencia'
  },
  {
    nombre: 'app.extra',
    tipo: 'hour',
    tamanyo: 6,
    tamanyoValor: 6,
    valor: 'extra'
  },
  {
    nombre: 'app.vacaciones',
    tipo: 'hour',
    tamanyo: 6,
    tamanyoValor: 6,
    valor: 'vacaciones'
  },
  {
    nombre: 'app.incidencia',
    tipo: 'hour',
    tamanyo: 6,
    tamanyoValor: 6,
    valor: 'incidencia'
  }
];
