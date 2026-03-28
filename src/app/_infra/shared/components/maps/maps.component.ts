import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'lib-maps',
  templateUrl: 'maps.component.html'
})
export class MapsComponent implements AfterViewInit {
  @Input() latidudInicio: number;
  @Input() longitudInicio: number;
  @Input() latidudFin: number;
  @Input() longitudFin: number;
  @ViewChild(GoogleMap) map!: GoogleMap;

  center: google.maps.LatLngLiteral = { lat: 40.4168, lng: -3.7038 }; // Madrid
  zoom = 7;

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => this.loadMap(), 500);
  }

  loadMap() {
    if (!this.map || !this.map.googleMap) {
      console.error('El mapa no está inicializado aún.');
      return;
    }

    this.directionsRenderer.setMap(this.map.googleMap);

    const origin = { lat: this.latidudInicio, lng: this.longitudInicio };
    const destination = { lat: this.latidudFin, lng: this.longitudFin };

    const request: google.maps.DirectionsRequest = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(result);
      } else {
        console.error('Error al obtener la ruta:', status);
      }
    });
  }
}
