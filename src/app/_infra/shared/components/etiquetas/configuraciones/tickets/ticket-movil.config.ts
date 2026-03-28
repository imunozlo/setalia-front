import { EtiquetaCampoInterface } from '../../models/etiqueta-campo.interface';

export const TicketMovilEtiquetasConfig: EtiquetaCampoInterface[] = [
  {
    nombre: 'app.idRef',
    tipo: 'text',
    tamanyo: 6,
    tamanyoValor: 6,
    valor: 'idRef'
  },
  {
    nombre: 'app.referencia',
    tipo: 'text',
    tamanyo: 6,
    tamanyoValor: 6,
    valor: 'referencia'
  },
  {
    nombre: 'app.asunto',
    tipo: 'text',
    tamanyo: 6,
    tamanyoValor: 18,
    valor: 'asunto'
  },
  {
    nombre: 'app.fecha',
    tipo: 'date',
    tamanyo: 6,
    tamanyoValor: 6,
    valor: 'fechaAlta',
    formatoFecha: 'dd/MM/yyyy'
  },
  {
    nombre: 'app.referenciaExterna',
    tipo: 'text',
    tamanyo: 6,
    tamanyoValor: 6,
    valor: 'referenciaExterna'
  },
  {
    nombre: 'app.companyia',
    tipo: 'text',
    tamanyo: 6,
    tamanyoValor: 18,
    valor: 'companyiaDescripcion'
  },
  {
    nombre: 'app.seccion',
    tipo: 'text',
    tamanyo: 6,
    tamanyoValor: 18,
    valor: 'seccionDescripcion'
  },
  {
    nombre: 'app.centroTrabajo',
    tipo: 'text',
    tamanyo: 6,
    tamanyoValor: 18,
    valor: 'centroTrabajoUnidadDescripcion'
  },
  {
    nombre: 'app.ubicacion',
    tipo: 'text',
    tamanyo: 6,
    tamanyoValor: 18,
    valor: 'ubicacionDescripcion'
  },
  {
    nombre: 'app.empleado',
    tipo: 'text',
    tamanyo: 6,
    tamanyoValor: 18,
    valor: 'empleadoDescripcion'
  },
  {
    nombre: 'app.fechaPrevista',
    tipo: 'date',
    tamanyo: 6,
    tamanyoValor: 6,
    valor: 'fechaPrevista',
    formatoFecha: 'dd/MM/yyyy'
  },
  {
    nombre: 'app.fechaLimite',
    tipo: 'date',
    tamanyo: 6,
    tamanyoValor: 6,
    valor: 'fechaLimite',
    formatoFecha: 'dd/MM/yyyy'
  },
  {
    nombre: 'app.prioridad',
    tipo: 'text',
    tamanyo: 6,
    tamanyoValor: 18,
    valor: 'prioridadDescripcion'
  },
  {
    nombre: 'app.clasificacion',
    tipo: 'text',
    tamanyo: 6,
    tamanyoValor: 18,
    valor: 'clasificacionDescripcion'
  },
  {
    nombre: 'app.proyectoModulo',
    tipo: 'text',
    tamanyo: 6,
    tamanyoValor: 18,
    valor: 'proyecto'
  },
  {
    nombre: 'app.descripcion',
    tipo: 'textarea',
    tamanyo: 6,
    tamanyoValor: 18,
    valor: 'descripcion'
  }
];
