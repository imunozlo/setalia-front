import { EtiquetaCampoInterface } from '../../models/etiqueta-campo.interface';

export const PartesTrabajoEtiquetasConfig: EtiquetaCampoInterface[] = [
  {
    nombre: 'app.fecha',
    tipo: 'date',
    tamanyo: 3,
    tamanyoValor: 3,
    valor: 'fecha',
    formatoFecha: 'dd/MM/yyyy'
  },
  {
    nombre: 'app.empleado',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 6,
    valor: 'empleadoDescripcion'
  },
  {
    nombre: 'app.estado',
    tipo: 'estado',
    tamanyo: 3,
    tamanyoValor: 6,
    valor: 'estadoId',
    permitirCambioEstado: true
  },
  {
    nombre: 'app.duracion',
    tipo: 'hour',
    tamanyo: 3,
    tamanyoValor: 3,
    valor: 'totalDuracion'
  },
  {
    nombre: 'app.horasJornada',
    tipo: 'hourDiference',
    tamanyo: 3,
    tamanyoValor: 2,
    valor: 'horasJornada'
  },
  {
    nombre: 'app.diferencia',
    tipo: 'hourDiference',
    tamanyo: 3,
    tamanyoValor: 2,
    valor: 'horasDiferencia'
  }
];
