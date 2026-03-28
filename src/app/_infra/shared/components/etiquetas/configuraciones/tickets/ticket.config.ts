import { EtiquetaCampoInterface } from '../../models/etiqueta-campo.interface';

export const TicketEtiquetasConfig: EtiquetaCampoInterface[] = [
  {
    nombre: 'app.idRef',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 5,
    valor: 'idRef'
  },
  {
    nombre: 'app.asunto',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 13,
    valor: 'asunto'
  },
  {
    nombre: 'app.fecha',
    tipo: 'date',
    tamanyo: 3,
    tamanyoValor: 5,
    valor: 'fechaAlta',
    formatoFecha: 'dd/MM/yyyy'
  },
  {
    nombre: 'app.referencia',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 5,
    valor: 'referencia'
  },
  {
    nombre: 'app.referenciaExterna',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 5,
    valor: 'referenciaExterna'
  },
  {
    nombre: 'app.empleado',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 5,
    valor: 'empleadoDescripcion'
  },
  {
    nombre: 'app.fechaPrevista',
    tipo: 'date',
    tamanyo: 3,
    tamanyoValor: 5,
    valor: 'fechaPrevista',
    formatoFecha: 'dd/MM/yyyy'
  },
  {
    nombre: 'app.fechaLimite',
    tipo: 'date',
    tamanyo: 3,
    tamanyoValor: 5,
    valor: 'fechaLimite',
    formatoFecha: 'dd/MM/yyyy'
  },
  {
    nombre: 'app.companyia',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 5,
    valor: 'companyiaDescripcion'
  },
  {
    nombre: 'app.seccion',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 5,
    valor: 'seccionDescripcion'
  },
  {
    nombre: 'app.centroTrabajo',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 5,
    valor: 'centroTrabajoUnidadDescripcion'
  },
  {
    nombre: 'app.prioridad',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 5,
    valor: 'prioridadDescripcion'
  },
  {
    nombre: 'app.tipo',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 5,
    valor: 'tipoDescripcion'
  },
  {
    nombre: 'app.clasificacion',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 5,
    valor: 'clasificacionDescripcion'
  },
  {
    nombre: 'app.ubicacion',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 5,
    valor: 'ubicacionDescripcion'
  },
  {
    nombre: 'app.proyectoModulo',
    tipo: 'text',
    tamanyo: 3,
    tamanyoValor: 13,
    valor: 'proyecto'
  },
  {
    nombre: 'app.descripcion',
    tipo: 'textarea',
    tamanyo: 3,
    tamanyoValor: 21,
    valor: 'descripcion'
  }
];
