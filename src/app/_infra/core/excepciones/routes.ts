import { Routes } from '@angular/router';

import { ExcepcionesComponent } from './excepciones.component';

export const routes: Routes = [
  { path: '403', component: ExcepcionesComponent, data: { type: 403 } },
  { path: '404', component: ExcepcionesComponent, data: { type: 404 } },
  { path: '500', component: ExcepcionesComponent, data: { type: 500 } }
];
