import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, NavigationError, RouteConfigLoadStart, RouterOutlet } from '@angular/router';
import { TitleService, VERSION as VERSION_ALAIN, stepPreloader } from '@delon/theme';
import { environment } from '@env/environment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VERSION as VERSION_ZORRO } from 'ng-zorro-antd/version';

import { SharedModule } from './_infra/shared';
import { LoaderService } from './_infra/shared/components/carga/loader/loader.service';
import { RoutingService } from './_infra/shared/services/routings.service';
import { DeviceService } from './_infra/shared/services/device.service';

@Component({
  selector: 'app-root',
  template: ` <router-outlet /> <app-loader-full [loading]="loading$ | async" />`,
  standalone: true,
  imports: [RouterOutlet, CommonModule, SharedModule]
})
export class AppComponent implements OnInit {
  loading$ = this.loader.loading$;
  private donePreloader = stepPreloader();

  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private router: RoutingService,
    private titleSrv: TitleService,
    private modalSrv: NzModalService,
    public loader: LoaderService,
    private deviceService: DeviceService
  ) {
    renderer.setAttribute(el.nativeElement, 'ng-alain-version', VERSION_ALAIN.full);
    renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full);
  }

  ngOnInit(): void {
    if (this.deviceService.isMovil()) {
      this.router.navegarUrl('/movil');
    }
    let configLoad = false;
    this.router.events.subscribe(ev => {
      if (ev instanceof RouteConfigLoadStart) {
        configLoad = true;
      }
      if (configLoad && ev instanceof NavigationError) {
        this.modalSrv.confirm({
          nzTitle: `Error`,
          nzContent: environment.production ? `Error navegacion` : `Error navegación：${ev.url}`,
          nzCancelDisabled: false,
          nzOkText: 'Ok',
          nzCancelText: 'Cancelar',
          //@ts-ignore
          nzOnOk: () => location.reload()
        });
      }
      if (ev instanceof NavigationEnd) {
        this.donePreloader();
        this.loader.hide();
        this.titleSrv.setTitle();
        this.modalSrv.closeAll();
      }
    });
  }
}
