import { EtiquetaCampoInterface } from '../../models/etiqueta-campo.interface';

export const NotaGastoEtiquetasConfig: EtiquetaCampoInterface[] = [
  {
    nombre: 'app.documento',
    tipo: 'text',
    valor: 'referencia',
    tamanyo: 3,
    tamanyoValor: 3
  },
  {
    nombre: 'app.fecha',
    tipo: 'date',
    formatoFecha: 'MM/yyyy',
    valor: 'fecha',
    tamanyo: 3,
    tamanyoValor: 3
  },
  {
    nombre: 'app.empleado',
    tipo: 'text',
    valor: 'empleadoDescripcion',
    tamanyo: 3,
    tamanyoValor: 3
  },
  {
    nombre: 'app.descripcion',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 3,
    valor: 'descripcion'
  },
  {
    nombre: 'app.totalKm',
    tipo: 'number',
    valor: 'totalKm',
    tamanyo: 3,
    tamanyoValor: 3
  },
  {
    nombre: 'app.totalImporteKm',
    tipo: 'moneda',
    valor: 'totalImporteKm',
    tamanyo: 3,
    tamanyoValor: 3
  },
  {
    nombre: 'app.total',
    tipo: 'moneda',
    valor: 'totalImporte',
    tamanyo: 3,
    tamanyoValor: 3
  },
  {
    nombre: 'app.estado',
    tipo: 'estado',
    tamanyo: 3,
    tamanyoValor: 3,
    valor: 'estadoId',
    permitirCambioEstado: true
  }
];
