import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorIdentificacionesComponent } from './views/buscador/buscador-identificaciones.component';
import { DetalleIdentificacionComponent } from './views/detalle/detalle-identificacion.component';


const routes: Routes = [
  {
    path: '',
    component: BuscadorIdentificacionesComponent,
    data: { title: 'Identificación', breadcrumb: [{ descripcion: 'Identificación' }] }
  },
  {
    path: 'detalle/:id',
    component: DetalleIdentificacionComponent,
    data: {
      title: 'Identificación',
      breadcrumb: [{ descripcion: 'Identificación' }, { descripcion: 'Identificación' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentificacionRoutingModule {}
