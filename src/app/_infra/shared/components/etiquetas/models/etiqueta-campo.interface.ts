export interface EtiquetaCampoInterface {
  nombre?: string; //Nombre de la etiqueta
  tipo: string; //date, text, number, estado
  tamanyo: number; //Tamaño del campo
  tamanyoValor: number;
  valor: string; //Nombre del valor en el modelo de datos
  formatoFecha?: string; //Valor para el formato de fechas
  formatoNumero?: string;
  permitirCambioEstado?: boolean;
  rows?: any; //l'utilitzem per a definir el tamanyo d'un campo de tipo textarea
}
