import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BitacoraMapaComponent } from '../mapa/bitacora-mapa.component';
import { BitacoraFotoModel } from '../../models/bitacora-foto.model';

@Component({
  selector: 'app-bitacora-media',
  templateUrl: './bitacora-media.component.html',
  styleUrls: ['./bitacora-media.component.scss']
})
export class BitacoraMediaComponent {
  @Input() bitacoraId: number;

  @Input() latitud: number | null = null;
  @Output() latitudChange = new EventEmitter<number | null>();

  @Input() longitud: number | null = null;
  @Output() longitudChange = new EventEmitter<number | null>();

  @Input() fotos: BitacoraFotoModel[] = [];
  @Output() fotosChange = new EventEmitter<BitacoraFotoModel[]>();

  @Output() coordenadasChange = new EventEmitter<{ latitud: number | null; longitud: number | null }>();
  @Output() refrescarFotos = new EventEmitter<void>();
  @Input() esNuevo!: boolean;
  seleccionado = 0;

  @ViewChild(BitacoraMapaComponent) mapaComponent?: BitacoraMapaComponent;

  onTabChange(index: number): void {
    this.seleccionado = index;

    if (index === 0) {
      setTimeout(() => {
        this.mapaComponent?.recalcularMapa();
      }, 0);
    }
  }

  onLatitudChange(value: number | null): void {
    this.latitud = value;
    this.latitudChange.emit(value);
  }

  onLongitudChange(value: number | null): void {
    this.longitud = value;
    this.longitudChange.emit(value);
  }

  onCoordenadasChange(value: { latitud: number | null; longitud: number | null }): void {
    this.coordenadasChange.emit(value);
  }

  onFotosChange(value: BitacoraFotoModel[]): void {
    this.fotos = value;
    this.fotosChange.emit(value);
  }

  onRefrescarFotos(): void {
    this.refrescarFotos.emit();
  }
}
