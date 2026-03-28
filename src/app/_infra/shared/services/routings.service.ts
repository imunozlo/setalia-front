import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LocalStoreService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService extends Router {
  rutas: Array<Ruta>;
  constructor(
    private originalRouter: Router,
    private localStoreService: LocalStoreService
  ) {
    super();
  }

  navegar(ruta: string, parametros?: any, extras?: NavigationExtras): void {
    if (!this.rutas) this.rutas = new Array<Ruta>();
    this.rutas.push({ ruta: ruta, parametres: parametros });
    this.originalRouter.navigate([ruta, parametros], extras);
  }

  navegarUrl(ruta: string): void {
    if (!this.rutas) this.rutas = new Array<Ruta>();
    this.rutas.push({ ruta: ruta });
    this.originalRouter.navigateByUrl(ruta);
  }

  salir(): void {
    this.rutas = new Array<Ruta>();
    this.localStoreService.removeItem('rutas');
    this.navigateByUrl('/sesion/login');
  }

  volver() {
    if (this.rutas && this.rutas.length > 1) {
      const ruta = this.rutas[this.rutas.length - 2];
      this.rutas.splice(this.rutas.length - 1, 1);
      if (ruta && ruta.parametres) {
        this.navigate([ruta.ruta, ruta.parametres]);
      } else if (ruta) {
        this.navigateByUrl(ruta.ruta);
      }
    } else {
      this.rutas = new Array<Ruta>();
      this.navigateByUrl('/dashboard');
    }
  }
  guardarRutas() {
    this.localStoreService.setItem('rutas', this.rutas);  
  }

  cargarRutas() {
    this.rutas = this.localStoreService.getItem('rutas');
  }

}


export interface Ruta {
  ruta: string;
  parametres?: any;
}
