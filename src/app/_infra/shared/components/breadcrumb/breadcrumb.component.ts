import { Component } from '@angular/core';
import { RoutingService } from '../../services/routings.service';
import { BreadcrumbService } from './breadcrumbs.service';

@Component({
  selector: 'lib-breadcrumb',
  templateUrl: 'breadcrumb.component.html'
})
export class BreadcrumbComponent {
  breadcrumbs$ = this.breadcrumbService.breadcrumbs$;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private routerService: RoutingService
  ) {}

  navegarHome() {
    this.routerService.navegarUrl('/dashboard');
  }

  navegar(url: string) {
    this.routerService.navegarUrl(url);
  }
}
