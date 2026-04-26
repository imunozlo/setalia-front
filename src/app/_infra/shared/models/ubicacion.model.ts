export interface Provincia {
  id: string;
  descripcion: string;
}

export interface Municipio {
  id: string;
  descripcion: string;
  provinciaId: string;
}

export interface UbicacionesResponse {
  provincias: Provincia[];
  municipios: Municipio[];
}
