import { Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { LayoutSesionComponent } from '../_infra/layout';
import { CaducadoComponent } from './views/caducado/caducado.component';

export const routes: Routes = [
  {
    path: 'sesion',
    component: LayoutSesionComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'cambio-contrasenya',
        component: CaducadoComponent
      }
    ]
  }
];
