import { UserModule } from 'src/app/maestros/usuarios/user.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { BitacoraRoutingModule } from './bitacora-routing.module';

import { SharedModule } from '../_infra/shared';
import { BuscadorBitacorasComponent } from './views/buscador/buscador-bitacoras.component';
import { DialogEdicionBitacoraComponent } from './dialogs/dialog-edicion-bitacora.component';
import {DetalleBitacoraComponent} from "./views/detalle/detalle-bitacora.component";
import { BitacoraMapaComponent } from './components/mapa/bitacora-mapa.component';
import {BitacoraMediaComponent} from "./components/media/bitacora-media.component";
import {BitacoraFotosComponent} from "./components/fotos/bitacora-fotos.component";
import {NzCarouselComponent} from "ng-zorro-antd/carousel";
import { DrawerPublicarComponent } from './dialogs/publicar/drawer-publicar.component';



const COMPONENTS = [
  BuscadorBitacorasComponent,
  DialogEdicionBitacoraComponent,
  BitacoraMapaComponent,
  BitacoraMediaComponent,
  BitacoraFotosComponent,
  DrawerPublicarComponent,
  DetalleBitacoraComponent
];

@NgModule({
  imports: [SharedModule, UserModule, BitacoraRoutingModule, NzCarouselComponent],
  declarations: [...COMPONENTS],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class BitacoraModule {}
