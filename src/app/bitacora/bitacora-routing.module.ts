import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorBitacorasComponent } from './views/buscador/buscador-bitacoras.component';
import { DetalleBitacoraComponent } from './views/detalle/detalle-bitacora.component';

const routes: Routes = [
  {
    path: '',
    component: BuscadorBitacorasComponent,
    data: { title: 'Bitácora', breadcrumb: [{ descripcion: 'Bitácoras' }] }
  },
  {
    path: 'detalle/:id',
    component: DetalleBitacoraComponent,
    data: {
      title: 'Bitácora',
      breadcrumb: [{ descripcion: 'Bitácoras' }, { descripcion: 'Bitácora' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BitacoraRoutingModule {}
