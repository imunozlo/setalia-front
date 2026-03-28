import { UserModule } from 'src/app/maestros/usuarios/user.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SharedModule } from '../_infra/shared';



const COMPONENTS = [DashboardComponent];

@NgModule({
  imports: [SharedModule, UserModule, DashboardRoutingModule],
  declarations: [...COMPONENTS],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DashboardModule {}
