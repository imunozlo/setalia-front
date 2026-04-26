import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogEdicionSetaComponent } from './dialogs/dialog-edicion-seta.component';
import { BuscadorSetasComponent } from './views/buscador/buscador-setas.component';
import {SharedModule} from "../../_infra/shared";


const COMPONENTS = [BuscadorSetasComponent, DialogEdicionSetaComponent];

@NgModule({
  imports: [SharedModule],
  declarations: [...COMPONENTS],
  bootstrap: [DialogEdicionSetaComponent],
  exports: [BuscadorSetasComponent],
  providers: [DatePipe]
})
export class SetasModule {}
