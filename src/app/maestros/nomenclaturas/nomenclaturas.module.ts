import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogEdicionNomenclaturaComponent } from './dialogs/dialog-edicion-nomenclatura.component';
import { BuscadorNomenclaturasComponent } from './views/buscador/buscador-nomenclaturas.component';
import {SharedModule} from "../../_infra/shared";


const COMPONENTS = [BuscadorNomenclaturasComponent, DialogEdicionNomenclaturaComponent];

@NgModule({
  imports: [SharedModule],
  declarations: [...COMPONENTS],
  bootstrap: [DialogEdicionNomenclaturaComponent],
  exports: [BuscadorNomenclaturasComponent],
  providers: [DatePipe]
})
export class NomenclaturasModule {}
