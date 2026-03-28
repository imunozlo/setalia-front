import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Breadcrumb {
  descripcion: string;
  url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.breadcrumbsSubject.next(this.generarBreadcrumbs(this.route));
    });
  }

  private obtenerDatos(route: ActivatedRoute): any {
    let data = route.snapshot.data;
    while (route.firstChild) {
      route = route.firstChild;
      data = { ...data, ...route.snapshot.data };
    }
    return data;
  }

  private generarBreadcrumbs(route: ActivatedRoute): Breadcrumb[] {
    const dataObtenida = this.obtenerDatos(route);
    const breadcrumbs: Breadcrumb[] = [];
    if (dataObtenida && dataObtenida.breadcrumb) {
      dataObtenida.breadcrumb.map((dato: any) => {
        const breadcrumb: Breadcrumb = { descripcion: dato.descripcion };
        if (dato.url) breadcrumb.url = dato.url;
        breadcrumbs.push(breadcrumb);
      });
    }
    return breadcrumbs;
  }
}
