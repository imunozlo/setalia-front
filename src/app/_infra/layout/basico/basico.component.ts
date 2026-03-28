import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutDefaultModule } from '@delon/theme/layout-default';
import { SettingDrawerModule } from '@delon/theme/setting-drawer';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ModuloModel } from 'src/app/maestros/modulos/models/modulo.model';
import { ModulosStoreService } from 'src/app/maestros/modulos/services/modulos.store.service';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DeviceService } from '../../shared/services/device.service';
import { ScrollService } from './components/services/scroll-service.service';

@Component({
  selector: 'layout-basico',
  styleUrls: ['basico.component.less'],
  template: `
    <nz-layout class="layout_general">
      <nz-sider
        [nzWidth]="300"
        [nzCollapsed]="!sidebarAbierto"
        [nzCollapsedWidth]="140"
        class="sidebar"
        *ngIf="!esMovil"
        style="margin: 16px; border-radius: 4px;"
      >
        <app-sidebar *ngIf="modulos" [modulos]="modulos" [sidebarAbierto]="sidebarAbierto" (cambiarEstado)="cambiarEstadoSidebar()" />
      </nz-sider>
      <nz-layout style="background: none;">
        <div #scrollContainer style="height: 100vh; overflow-y:auto">
          @if (!esMovil) {
            <nz-header style="margin-top: 16px; margin-right: 16px;">
              <app-header />
            </nz-header>
          }
          <nz-content class="layout_contenido">
            <router-outlet />
          </nz-content>
        </div>
      </nz-layout>
    </nz-layout>
  `,
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LayoutDefaultModule,
    NzIconModule,
    NzMenuModule,
    NzDropDownModule,
    NzAvatarModule,
    SettingDrawerModule,
    HeaderComponent,
    SidebarComponent,
    NzLayoutComponent,
    NzHeaderComponent,
    NzSiderComponent,
    NzContentComponent
  ]
})
export class LayoutBasicoComponent implements OnInit, AfterViewInit {
  sidebarAbierto: boolean = true;
  modulos: ModuloModel[];
  esMovil: boolean;
  @ViewChild('scrollContainer', { static: false, read: ElementRef }) scrollContainer: ElementRef;
  hasScroll: boolean = false;

  constructor(
    private storeService: ModulosStoreService,
    private deviceService: DeviceService,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    this.esMovil = this.deviceService.isMovil();
    this.cargarModulos();
  }

  ngAfterViewInit() {
    const el = this.scrollContainer.nativeElement;

    const checkScroll = () => {
      const hasScroll = el.scrollHeight > el.clientHeight;
      this.scrollService.setScroll(hasScroll);
    };

    // Detectar cuando aparece/desaparece scroll
    new ResizeObserver(checkScroll).observe(el);

    // Detectar scroll real (opc.)
    el.addEventListener('scroll', () => {
      const hasScroll = el.scrollHeight > el.clientHeight;
      this.scrollService.setScroll(hasScroll);
    });

    // Primera comprobación
    checkScroll();
  }

  cambiarEstadoSidebar() {
    this.sidebarAbierto = !this.sidebarAbierto;
  }

  cargarModulos() {
    this.storeService.modulosActivos$().subscribe(response => {
      if (response) {
        this.modulos = response.map(mod => new ModuloModel().deserialize(mod));
      }
    });
  }
}
