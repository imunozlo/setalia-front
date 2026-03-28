import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../_infra/shared';
import { AuditoriaRoutingModule } from './auditoria-routing.module';
import { AuditoriaComponent } from './views/auditoria/auditoria.component';
import { BuscadorErroresComponent } from './components/errors/buscador-errores.component';
import { BuscadorAuditoriaComponent } from './components/auditoria/buscador-auditoria.component';

const COMPONENTS = [AuditoriaComponent, BuscadorAuditoriaComponent, BuscadorErroresComponent];

@NgModule({
  imports: [SharedModule, AuditoriaRoutingModule],
  declarations: [...COMPONENTS],
  bootstrap: [],
  exports: [],
  providers: [DatePipe]
})
export class AuditoriaModule {}
