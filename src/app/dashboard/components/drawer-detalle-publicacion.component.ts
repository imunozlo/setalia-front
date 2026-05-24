import { Component, ViewChild } from '@angular/core';
import {BitacoraModel} from "../../bitacora/models/bitacora.model";
import {BitacoraMapaComponent} from "../../bitacora/components/mapa/bitacora-mapa.component";



@Component({
  selector: 'app-drawer-detalle-publicacion',
  templateUrl: './drawer-detalle-publicacion.component.html',
  styleUrls: ['./drawer-detalle-publicacion.component.scss']
})
export class DrawerDetallePublicacionComponent {
  visible = false;
  publicacion: BitacoraModel | null = null;

  @ViewChild(BitacoraMapaComponent)
  mapaPublicoComponent?: BitacoraMapaComponent;

  abrir(publicacion: BitacoraModel): void {
    this.publicacion = publicacion;
    this.visible = true;

    /**
     * El mapa se encuentra dentro de un drawer.
     * Forzamos recalculado de tamaño una vez visible.
     */
    setTimeout(() => {
      this.mapaPublicoComponent?.recalcularMapa();
    }, 350);
  }

  cerrar(): void {
    this.visible = false;
    this.publicacion = null;
  }

  obtenerUbicacion(): string {
    if (!this.publicacion) {
      return '';
    }

    const municipio = this.publicacion.municipioDescripcion;
    const provincia = this.publicacion.provinciaDescripcion;

    if (municipio && provincia) {
      return `${municipio} (${provincia})`;
    }

    return municipio || provincia || '';
  }

  tieneUbicacionAproximada(): boolean {
    return this.publicacion?.latitud != null && this.publicacion?.longitud != null;
  }
}
