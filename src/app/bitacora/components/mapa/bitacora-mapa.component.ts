import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import maplibregl, { Map, Marker, StyleSpecification } from 'maplibre-gl';

type TipoMapa = 'satellite' | 'streets' | 'topo';

@Component({
  selector: 'app-bitacora-mapa',
  templateUrl: './bitacora-mapa.component.html',
  styleUrls: ['./bitacora-mapa.component.scss']
})
export class BitacoraMapaComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() latitud: number | null = null;
  @Input() longitud: number | null = null;

  @Output() latitudChange = new EventEmitter<number | null>();
  @Output() longitudChange = new EventEmitter<number | null>();
  @Output() coordenadasChange = new EventEmitter<{ latitud: number | null; longitud: number | null }>();

  @ViewChild('mapa') mapaRef!: ElementRef<HTMLDivElement>;
  @ViewChild('contenedorMapaFullscreen') contenedorMapaFullscreen!: ElementRef<HTMLDivElement>;

  tiposMapa = [
    { id: 'satellite', valor: 'satellite', descripcion: 'Satélite' },
    { id: 'streets', valor: 'streets', descripcion: 'Calles' },
    { id: 'topo', valor: 'topo', descripcion: 'Relieve / Topográfico' }
  ];

  mapaSeleccionado: TipoMapa = 'satellite';
  mapaFullscreen = false;

  private map!: Map;
  private marker: Marker | null = null;
  private readonly centroEspana: [number, number] = [-3.7038, 40.4168];
  private readonly zoomInicial = 5.5;

  ngAfterViewInit(): void {
    this.inicializarMapa();
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) {
      return;
    }

    const cambioLat = changes['latitud'];
    const cambioLng = changes['longitud'];

    if (cambioLat || cambioLng) {
      if (this.latitud != null && this.longitud != null) {
        this.colocarMarcador(this.longitud, this.latitud);
      }
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);

    if (this.map) {
      this.map.remove();
    }
  }

  private inicializarMapa(): void {
    if (!this.mapaRef?.nativeElement) {
      return;
    }

    this.map = new maplibregl.Map({
      container: this.mapaRef.nativeElement,
      style: this.getStyle(this.mapaSeleccionado),
      center: this.longitud != null && this.latitud != null ? [Number(this.longitud), Number(this.latitud)] : this.centroEspana,
      zoom: this.longitud != null && this.latitud != null ? 12 : this.zoomInicial
    });

    this.map.addControl(new maplibregl.NavigationControl(), 'top-right');

    this.map.on('load', () => {
      if (this.latitud != null && this.longitud != null) {
        this.colocarMarcador(Number(this.longitud), Number(this.latitud));
      }
    });

    this.map.on('click', e => {
      const lng = Number(e.lngLat.lng.toFixed(8));
      const lat = Number(e.lngLat.lat.toFixed(8));

      this.actualizarCoordenadas(lat, lng);
      this.colocarMarcador(lng, lat);
    });
  }

  cambiarMapa(tipo: any): void {
    const valor = (typeof tipo === 'string' ? tipo : tipo?.valor) as TipoMapa;

    if (!valor || !this.map) {
      return;
    }

    this.mapaSeleccionado = valor;
    const center = this.map.getCenter();
    const zoom = this.map.getZoom();
    const bearing = this.map.getBearing();
    const pitch = this.map.getPitch();

    this.map.setStyle(this.getStyle(valor));

    this.map.once('styledata', () => {
      this.map.jumpTo({ center, zoom, bearing, pitch });

      if (this.latitud != null && this.longitud != null) {
        this.colocarMarcador(Number(this.longitud), Number(this.latitud));
      }
    });
  }

  onCoordenadasEditadas(): void {
    // reservado por si luego quieres validaciones inline
  }

  aplicarCoordenadas(): void {
    if (!this.map) {
      return;
    }

    const lat = Number(this.latitud);
    const lng = Number(this.longitud);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return;
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return;
    }

    this.actualizarCoordenadas(lat, lng);
    this.colocarMarcador(lng, lat);

    this.map.flyTo({
      center: [lng, lat],
      zoom: 13
    });
  }

  async toggleFullscreenMapa(): Promise<void> {
    const elemento = this.contenedorMapaFullscreen?.nativeElement;

    if (!elemento) {
      return;
    }

    try {
      if (!document.fullscreenElement) {
        await elemento.requestFullscreen();
        this.mapaFullscreen = true;
      } else {
        await document.exitFullscreen();
        this.mapaFullscreen = false;
      }

      setTimeout(() => {
        if (this.map) {
          this.map.resize();
        }
      }, 200);
    } catch (error) {
      console.error('No se pudo cambiar a pantalla completa', error);
    }
  }

  private onFullscreenChange = (): void => {
    this.mapaFullscreen = !!document.fullscreenElement;

    setTimeout(() => {
      if (this.map) {
        this.map.resize();
      }
    }, 200);
  };

  private colocarMarcador(lng: number, lat: number): void {
    if (!this.map) {
      return;
    }

    if (this.marker) {
      this.marker.remove();
    }

    this.marker = new maplibregl.Marker({ draggable: true }).setLngLat([lng, lat]).addTo(this.map);

    this.marker.on('dragend', () => {
      const pos = this.marker!.getLngLat();
      const nuevaLng = Number(pos.lng.toFixed(8));
      const nuevaLat = Number(pos.lat.toFixed(8));

      this.actualizarCoordenadas(nuevaLat, nuevaLng);
    });
  }

  private actualizarCoordenadas(lat: number | null, lng: number | null): void {
    this.latitud = lat;
    this.longitud = lng;

    this.latitudChange.emit(lat);
    this.longitudChange.emit(lng);
    this.coordenadasChange.emit({
      latitud: lat,
      longitud: lng
    });
  }

  private getStyle(tipo: TipoMapa): StyleSpecification {
    if (tipo === 'satellite') {
      return {
        version: 8,
        sources: {
          satellite: {
            type: 'raster',
            tiles: ['https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg'],
            tileSize: 256,
            attribution: 'Satellite imagery'
          }
        },
        layers: [
          {
            id: 'satellite-layer',
            type: 'raster',
            source: 'satellite'
          }
        ]
      };
    }

    if (tipo === 'topo') {
      return {
        version: 8,
        sources: {
          topo: {
            type: 'raster',
            tiles: [
              'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
              'https://b.tile.opentopomap.org/{z}/{x}/{y}.png',
              'https://c.tile.opentopomap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '© OpenTopoMap contributors'
          }
        },
        layers: [
          {
            id: 'topo-layer',
            type: 'raster',
            source: 'topo'
          }
        ]
      };
    }

    return {
      version: 8,
      sources: {
        osm: {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          minzoom: 0,
          maxzoom: 19,
          attribution: '© OpenStreetMap contributors'
        }
      },
      layers: [
        {
          id: 'osm-layer',
          type: 'raster',
          source: 'osm'
        }
      ]
    };
  }

  public recalcularMapa(): void {
    setTimeout(() => {
      this.map?.resize();
    });
  }
}
