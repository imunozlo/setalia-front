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

  /**
   * En modo público:
   * - no se puede editar la ubicación;
   * - no se muestra el marcador exacto;
   * - se dibuja una zona aproximada.
   */
  @Input() modoPublico = false;

  /**
   * Radio del área aproximada en km.
   */
  @Input() radioZonaAproximadaKm = 20;

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
  private resizeObserver: ResizeObserver | null = null;

  private readonly centroEspana: [number, number] = [-3.7038, 40.4168];
  private readonly zoomInicial = 5.5;

  private readonly sourceZonaAproximada = 'zona-aproximada-source';
  private readonly layerZonaAproximadaRelleno = 'zona-aproximada-fill';
  private readonly layerZonaAproximadaBorde = 'zona-aproximada-line';

  ngAfterViewInit(): void {
    this.inicializarMapa();
    this.inicializarResizeObserver();
    document.addEventListener('fullscreenchange', this.onFullscreenChange);

    this.recalcularMapa();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map || !this.map.isStyleLoaded()) {
      return;
    }

    const cambioLat = changes['latitud'];
    const cambioLng = changes['longitud'];
    const cambioModoPublico = changes['modoPublico'];
    const cambioRadio = changes['radioZonaAproximadaKm'];

    if (cambioLat || cambioLng || cambioModoPublico || cambioRadio) {
      this.actualizarRepresentacionUbicacion();
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    if (this.marker) {
      this.marker.remove();
      this.marker = null;
    }

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
      center: this.longitud != null && this.latitud != null
        ? [Number(this.longitud), Number(this.latitud)]
        : this.centroEspana,
      zoom: this.longitud != null && this.latitud != null
        ? this.modoPublico ? 8 : 12
        : this.zoomInicial
    });

    this.map.addControl(new maplibregl.NavigationControl(), 'top-right');

    this.map.on('load', () => {
      this.actualizarRepresentacionUbicacion();
      this.recalcularMapa();
    });

    this.map.on('click', e => {
      if (this.modoPublico) {
        return;
      }

      const lng = Number(e.lngLat.lng.toFixed(8));
      const lat = Number(e.lngLat.lat.toFixed(8));

      this.actualizarCoordenadas(lat, lng);
      this.colocarMarcador(lng, lat);
    });
  }

  private inicializarResizeObserver(): void {
    if (!this.mapaRef?.nativeElement) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.recalcularMapa();
    });

    this.resizeObserver.observe(this.mapaRef.nativeElement);

    if (this.contenedorMapaFullscreen?.nativeElement) {
      this.resizeObserver.observe(this.contenedorMapaFullscreen.nativeElement);
    }
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
      this.actualizarRepresentacionUbicacion();
      this.recalcularMapa();
    });
  }

  onCoordenadasEditadas(): void {
    // reservado por si luego quieres validaciones inline
  }

  aplicarCoordenadas(): void {
    if (!this.map || this.modoPublico) {
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

    this.recalcularMapa();
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

      this.recalcularMapa();
    } catch (error) {
      console.error('No se pudo cambiar a pantalla completa', error);
    }
  }

  private onFullscreenChange = (): void => {
    this.mapaFullscreen = !!document.fullscreenElement;
    this.recalcularMapa();
  };

  private actualizarRepresentacionUbicacion(): void {
    if (!this.map || !this.map.isStyleLoaded()) {
      return;
    }

    if (this.latitud == null || this.longitud == null) {
      this.eliminarMarcador();
      this.eliminarZonaAproximada();
      return;
    }

    const lat = Number(this.latitud);
    const lng = Number(this.longitud);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      this.eliminarMarcador();
      this.eliminarZonaAproximada();
      return;
    }

    if (this.modoPublico) {
      this.eliminarMarcador();
      this.dibujarZonaAproximada(lng, lat);
      return;
    }

    this.eliminarZonaAproximada();
    this.colocarMarcador(lng, lat);
  }

  private colocarMarcador(lng: number, lat: number): void {
    if (!this.map || this.modoPublico) {
      return;
    }

    this.eliminarMarcador();

    this.marker = new maplibregl.Marker({ draggable: true })
      .setLngLat([lng, lat])
      .addTo(this.map);

    this.marker.on('dragend', () => {
      const pos = this.marker!.getLngLat();
      const nuevaLng = Number(pos.lng.toFixed(8));
      const nuevaLat = Number(pos.lat.toFixed(8));

      this.actualizarCoordenadas(nuevaLat, nuevaLng);
    });
  }

  private eliminarMarcador(): void {
    if (this.marker) {
      this.marker.remove();
      this.marker = null;
    }
  }

  private dibujarZonaAproximada(lng: number, lat: number): void {
    if (!this.map) {
      return;
    }

    const geoJson = this.generarCirculoGeoJson(
      lng,
      lat,
      this.radioZonaAproximadaKm
    );

    const sourceExistente = this.map.getSource(this.sourceZonaAproximada) as any;

    if (sourceExistente) {
      sourceExistente.setData(geoJson);
    } else {
      this.map.addSource(this.sourceZonaAproximada, {
        type: 'geojson',
        data: geoJson
      });

      this.map.addLayer({
        id: this.layerZonaAproximadaRelleno,
        type: 'fill',
        source: this.sourceZonaAproximada,
        paint: {
          'fill-color': '#64bdbe',
          'fill-opacity': 0.24
        }
      });

      this.map.addLayer({
        id: this.layerZonaAproximadaBorde,
        type: 'line',
        source: this.sourceZonaAproximada,
        paint: {
          'line-color': '#3f9194',
          'line-width': 2.5,
          'line-opacity': 0.95
        }
      });
    }

    this.encuadrarZonaAproximada(geoJson);
  }

  private eliminarZonaAproximada(): void {
    if (!this.map) {
      return;
    }

    if (this.map.getLayer(this.layerZonaAproximadaBorde)) {
      this.map.removeLayer(this.layerZonaAproximadaBorde);
    }

    if (this.map.getLayer(this.layerZonaAproximadaRelleno)) {
      this.map.removeLayer(this.layerZonaAproximadaRelleno);
    }

    if (this.map.getSource(this.sourceZonaAproximada)) {
      this.map.removeSource(this.sourceZonaAproximada);
    }
  }

  private generarCirculoGeoJson(lng: number, lat: number, radioKm: number): any {
    const puntos = 96;
    const radioTierraKm = 6371.0088;

    const latRad = this.gradosARadianes(lat);
    const lngRad = this.gradosARadianes(lng);
    const distanciaAngular = radioKm / radioTierraKm;

    const coordenadas: [number, number][] = [];

    for (let i = 0; i <= puntos; i++) {
      const angulo = (2 * Math.PI * i) / puntos;

      const latPunto = Math.asin(
        Math.sin(latRad) * Math.cos(distanciaAngular) +
        Math.cos(latRad) * Math.sin(distanciaAngular) * Math.cos(angulo)
      );

      const lngPunto =
        lngRad +
        Math.atan2(
          Math.sin(angulo) * Math.sin(distanciaAngular) * Math.cos(latRad),
          Math.cos(distanciaAngular) - Math.sin(latRad) * Math.sin(latPunto)
        );

      coordenadas.push([
        this.radianesAGrados(lngPunto),
        this.radianesAGrados(latPunto)
      ]);
    }

    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [coordenadas]
      },
      properties: {}
    };
  }

  private encuadrarZonaAproximada(geoJson: any): void {
    if (!this.map) {
      return;
    }

    const coordenadas = geoJson.geometry.coordinates[0] as [number, number][];

    if (!coordenadas.length) {
      return;
    }

    const bounds = new maplibregl.LngLatBounds(
      coordenadas[0],
      coordenadas[0]
    );

    coordenadas.forEach(coordenada => {
      bounds.extend(coordenada);
    });

    this.map.fitBounds(bounds, {
      padding: 48,
      duration: 0,
      maxZoom: 9.5
    });
  }

  private gradosARadianes(valor: number): number {
    return valor * Math.PI / 180;
  }

  private radianesAGrados(valor: number): number {
    return valor * 180 / Math.PI;
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
    requestAnimationFrame(() => {
      this.map?.resize();
    });

    setTimeout(() => {
      this.map?.resize();
    }, 100);

    setTimeout(() => {
      this.map?.resize();
    }, 300);

    setTimeout(() => {
      this.map?.resize();
    }, 600);
  }
}
