import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { IdentificacionFotoModel } from '../../models/identificacion-foto.model';
import { IdentificacionService } from '../../services/identificaciones.service';

interface FotoPreview {
  id?: number;
  nombreArchivo?: string;
  mimeType?: string;
  src: string;
}

@Component({
  selector: 'app-identificacion-fotos',
  templateUrl: './identificacion-fotos.component.html',
  styleUrls: ['./identificacion-fotos.component.scss']
})
export class IdentificacionFotosComponent implements OnChanges, OnDestroy {
  @Input() identificacionId: number | null = null;
  @Input() soloLectura = false;

  private _fotos: IdentificacionFotoModel[] = [];

  @Input()
  set fotos(value: IdentificacionFotoModel[] | null | undefined) {
    this._fotos = value ?? [];
  }

  get fotos(): IdentificacionFotoModel[] {
    return this._fotos;
  }

  @Output() fotosChange = new EventEmitter<IdentificacionFotoModel[]>();
  @Output() refrescarFotos = new EventEmitter<void>();

  @ViewChild('inputFotos') inputFotos?: ElementRef<HTMLInputElement>;
  @ViewChild('contenedorFotosFullscreen') contenedorFotosFullscreen?: ElementRef<HTMLElement>;

  readonly maxFotos = 3;
  readonly tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];

  previews: FotoPreview[] = [];
  indiceActual = 0;
  fotosFullscreen = false;
  cargandoPreviews = false;
  subiendo = false;
  eliminando = false;

  constructor(private identificacionService: IdentificacionService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fotos']) {
      this.cargarPreviews();
    }
  }

  ngOnDestroy(): void {
    this.limpiarPreviewUrls();
  }

  get puedeSubir(): boolean {
    return !this.soloLectura && !!this.identificacionId && this.fotos.length < this.maxFotos && !this.subiendo;
  }

  get fotoActual(): FotoPreview | null {
    if (!this.previews.length) {
      return null;
    }

    return this.previews[this.indiceActual] ?? this.previews[0];
  }

  abrirSelector(): void {
    if (!this.puedeSubir) {
      return;
    }

    this.inputFotos?.nativeElement.click();
  }

  async onFotosSeleccionadas(event: Event): Promise<void> {
    if (this.soloLectura) {
      return;
    }

    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);

    if (!files.length || !this.identificacionId) {
      input.value = '';
      return;
    }

    const huecosDisponibles = this.maxFotos - this.fotos.length;
    const filesValidos = files.filter(file => this.tiposPermitidos.includes(file.type)).slice(0, huecosDisponibles);

    if (!filesValidos.length) {
      input.value = '';
      return;
    }

    this.subiendo = true;

    try {
      for (const file of filesValidos) {
        await firstValueFrom(this.identificacionService.subirFoto(file, this.identificacionId));
      }

      this.refrescarFotos.emit();
    } finally {
      this.subiendo = false;
      input.value = '';
    }
  }

  anterior(): void {
    if (this.previews.length < 2) {
      return;
    }

    this.indiceActual = this.indiceActual === 0 ? this.previews.length - 1 : this.indiceActual - 1;
  }

  siguiente(): void {
    if (this.previews.length < 2) {
      return;
    }

    this.indiceActual = this.indiceActual === this.previews.length - 1 ? 0 : this.indiceActual + 1;
  }

  irA(index: number): void {
    if (index < 0 || index >= this.previews.length) {
      return;
    }

    this.indiceActual = index;
  }

  async eliminarActual(): Promise<void> {
    if (this.soloLectura) {
      return;
    }

    const actual = this.previews[this.indiceActual];

    if (!actual?.id || this.eliminando) {
      return;
    }

    this.eliminando = true;

    try {
      await firstValueFrom(this.identificacionService.eliminarFoto(actual.id));

      this.refrescarFotos.emit();
    } finally {
      this.eliminando = false;
    }
  }

  async toggleFullscreenFotos(): Promise<void> {
    const contenedor = this.contenedorFotosFullscreen?.nativeElement;

    if (!contenedor) {
      return;
    }

    if (document.fullscreenElement === contenedor) {
      await document.exitFullscreen();
      return;
    }

    if (!document.fullscreenElement) {
      await contenedor.requestFullscreen();
    }
  }

  private async cargarPreviews(): Promise<void> {
    this.cargandoPreviews = true;
    this.limpiarPreviewUrls();

    const nuevasPreviews: FotoPreview[] = [];

    try {
      for (const foto of (this.fotos || []).slice(0, this.maxFotos)) {
        if (!foto.id) {
          continue;
        }

        try {
          const blob = await firstValueFrom(this.identificacionService.obtenerFotoBlob(foto.id));

          const src = URL.createObjectURL(blob);

          nuevasPreviews.push({
            id: foto.id,
            nombreArchivo: foto.nombreArchivo,
            mimeType: foto.mimeType,
            src
          });
        } catch (e) {
          console.error('Error cargando la foto', foto.id, e);
        }
      }

      this.previews = nuevasPreviews;

      if (this.indiceActual >= this.previews.length) {
        this.indiceActual = Math.max(this.previews.length - 1, 0);
      }

      if (this.previews.length > 0) {
        this.indiceActual = 0;
      }

      this.fotosChange.emit(this.fotos);
    } finally {
      this.cargandoPreviews = false;
    }
  }

  private limpiarPreviewUrls(): void {
    for (const preview of this.previews) {
      if (preview.src) {
        URL.revokeObjectURL(preview.src);
      }
    }

    this.previews = [];
  }

  @HostListener('document:fullscreenchange')
  onFullscreenChange(): void {
    const contenedor = this.contenedorFotosFullscreen?.nativeElement;
    this.fotosFullscreen = document.fullscreenElement === contenedor;
  }
}
