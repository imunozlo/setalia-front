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
      /*{
        path: 'etiquetas',
        loadChildren: () => import('./maestros/etiquetas/etiquetas.module').then(m => m.EtiquetasModule)
      },
      {
        path: 'plantillas',
        loadChildren: () => import('./plantillas/plantilla.module').then(m => m.PlantillasModule)
      },
      {
        path: 'grupos',
        loadChildren: () => import('./controles-configuracion/grupo/grupo.module').then(m => m.GrupoModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('./maestros/clientes/clientes.module').then(m => m.ClientesModule)
      },*/
      { path: 'accesos', loadChildren: () => import('./maestros/usuarios/user.module').then(m => m.UserModule) },
      {
        path: 'configuracion',
        loadChildren: () => import('./maestros/configuracion/configuracion.module').then(m => m.ConfiguracionModule)
      },
/*      {
        path: 'productos',
        loadChildren: () => import('./maestros/productos/productos.module').then(m => m.ProductosModule)
      },
      {
        path: 'unidades',
        loadChildren: () => import('./maestros/unidades/unidades.module').then(m => m.UnidadesModule)
      },
      {
        path: 'fases',
        loadChildren: () => import('./maestros/fases/fases.module').then(m => m.FasesModule)
      },
      {
        path: 'lotes',
        loadChildren: () => import('./maestros/lotes/lotes.module').then(m => m.LotesModule)
      }*/
    ]
  },
  // sesion y excepciones
  { path: '', loadChildren: () => import('./sesion/routes').then(m => m.routes) },
  { path: 'excepciones', loadChildren: () => import('./_infra/core/excepciones/routes').then(m => m.routes) },
  { path: '**', redirectTo: 'sesion/login' }
];
