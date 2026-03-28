import { EtiquetaCampoInterface } from '../../models/etiqueta-campo.interface';

export const ProyectosEtiquetasConfig: EtiquetaCampoInterface[] = [
  {
    nombre: 'app.nombre',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 9,
    valor: 'nombre'
  },
  {
    nombre: 'app.descripcion',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 9,
    valor: 'descripcion'
  },
  {
    nombre: 'app.horasEstimadas',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 3,
    valor: 'horasEstimadas'
  },
  {
    nombre: 'app.horasRealizadas',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 3,
    valor: 'horasRealizadas'
  },
  {
    nombre: 'app.companyia',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 9,
    valor: 'companyiaDescripcion'
  }
];
