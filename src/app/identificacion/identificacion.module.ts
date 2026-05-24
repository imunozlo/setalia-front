import { UserModule } from 'src/app/maestros/usuarios/user.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';



import { SharedModule } from '../_infra/shared';

import {NzIconModule} from "ng-zorro-antd/icon";
import { BuscadorIdentificacionesComponent } from './views/buscador/buscador-identificaciones.component';

import { IdentificacionRoutingModule } from './identificacion-routing.module';
import {IdentificacionFotosComponent} from "./components/identificacion-fotos/identificacion-fotos.component";
import {DetalleIdentificacionComponent} from "./views/detalle/detalle-identificacion.component";
import {DrawerSugerenciaIdentificacionComponent} from "./dialogs/sugerencia/drawer-sugerencia-identificacion.component";



const COMPONENTS = [
  BuscadorIdentificacionesComponent,
  DetalleIdentificacionComponent,
  DrawerSugerenciaIdentificacionComponent,
  IdentificacionFotosComponent
];

@NgModule({
  imports: [SharedModule, UserModule, IdentificacionRoutingModule, NzIconModule],
  declarations: [...COMPONENTS],
  providers: [],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class IdentificacionModule {}
