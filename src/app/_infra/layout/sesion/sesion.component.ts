import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalFooterModule } from '@delon/abc/global-footer';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'layout-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.less'],
  standalone: true,
  imports: [RouterOutlet, GlobalFooterModule, NzIconModule]
})
export class LayoutSesionComponent implements OnInit {
  private tokenService = inject(DA_SERVICE_TOKEN);

  ngOnInit(): void {
    this.tokenService.clear();
  }
}
