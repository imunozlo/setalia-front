import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Municipio, Provincia, UbicacionesResponse } from '../models/ubicacion.model';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private readonly url = 'assets/ubicaciones.json';

  private readonly ubicaciones$ = this.http.get<UbicacionesResponse>(this.url).pipe(shareReplay(1));

  constructor(private http: HttpClient) {}

  getUbicaciones(): Observable<UbicacionesResponse> {
    return this.ubicaciones$;
  }

  getProvincias(): Observable<Provincia[]> {
    return this.ubicaciones$.pipe(map(data => data.provincias));
  }

  getMunicipiosByProvincia(provinciaId: string): Observable<Municipio[]> {
    return this.ubicaciones$.pipe(map(data => data.municipios.filter(m => m.provinciaId === provinciaId)));
  }

  getProvinciaById(provinciaId: string): Observable<Provincia | undefined> {
    return this.ubicaciones$.pipe(map(data => data.provincias.find(p => p.id === provinciaId)));
  }

  getMunicipioById(provinciaId: string, municipioId: string): Observable<Municipio | undefined> {
    return this.ubicaciones$.pipe(map(data => data.municipios.find(m => m.provinciaId === provinciaId && m.id === municipioId)));
  }

  getProvinciaDescripcion(provinciaId: string): Observable<string> {
    return this.getProvinciaById(provinciaId).pipe(map(provincia => provincia?.descripcion ?? ''));
  }

  getMunicipioDescripcion(provinciaId: string, municipioId: string): Observable<string> {
    return this.getMunicipioById(provinciaId, municipioId).pipe(map(municipio => municipio?.descripcion ?? ''));
  }
}
