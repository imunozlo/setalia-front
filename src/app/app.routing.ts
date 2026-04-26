import { Routes } from '@angular/router';
import { authSimpleCanActivate, authSimpleCanActivateChild } from '@delon/auth';

import { securityGuard } from './_infra/core';
import { LayoutBasicoComponent } from './_infra/layout';

export const appRouting: Routes = [
  {
    path: '',
    component: LayoutBasicoComponent,
    canActivate: [securityGuard, authSimpleCanActivate],
    canActivateChild: [authSimpleCanActivateChild],
    data: {},
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'auditoria',
        loadChildren: () => import('./maestros/auditoria/auditoria.module').then(m => m.AuditoriaModule)
      },
      {
        path: 'listas-valores',
        loadChildren: () => import('./maestros/nomenclaturas/nomenclaturas.module').then(m => m.NomenclaturasModule)
      },
      {
        path: 'setas',
        loadChildren: () => import('./maestros/setas/setas.module').then(m => m.SetasModule)
      },
      {
        path: 'bitacora',
        loadChildren: () => import('./bitacora/bitacora.module').then(m => m.BitacoraModule)
      },
      { path: 'accesos', loadChildren: () => import('./maestros/usuarios/user.module').then(m => m.UserModule) },
      {
        path: 'configuracion',
        loadChildren: () => import('./maestros/configuracion/configuracion.module').then(m => m.ConfiguracionModule)
      }
    ]
  },
  // sesion y excepciones
  { path: '', loadChildren: () => import('./sesion/routes').then(m => m.routes) },
  { path: 'excepciones', loadChildren: () => import('./_infra/core/excepciones/routes').then(m => m.routes) },
  { path: '**', redirectTo: 'sesion/login' }
];
