import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditoriaComponent } from './views/auditoria/auditoria.component';

const routes: Routes = [
  {
    path: '',
    component: AuditoriaComponent,
    data: { title: 'Auditoria' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditoriaRoutingModule {}
