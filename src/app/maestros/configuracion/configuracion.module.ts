import { NgModule } from '@angular/core';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { SharedModule } from '../../_infra/shared';
import { NomenclaturasModule } from '../nomenclaturas/nomenclaturas.module';
import { UserModule } from '../usuarios/user.module';
import { SetasModule } from '../setas/setas.module';

//const COMPONENTS = [];

@NgModule({
  imports: [SharedModule, ConfiguracionRoutingModule, UserModule, NomenclaturasModule, SetasModule],
  //declarations: [...COMPONENTS],
  bootstrap: [],
  providers: []
})
export class ConfiguracionModule {}
