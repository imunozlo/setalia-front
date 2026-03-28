import { NgModule } from '@angular/core';

import { DialogCambioContrasenyaComponent } from './dialogs/dialog-cambio-contrasenya/dialog-cambio-contrasenya.component';
import { DialogEdicionUsuarioComponent } from './dialogs/dialog-edicio-usuario/dialog-edicion-usuario.component';
import { UserRoutingModule } from './user-routing.module';
import { BuscadorUsuariosComponent } from './views/buscador/buscador-usuarios.component';
import { PerfilComponent } from './views/perfil/perfil.component';
import { BuscadorPermisosComponent } from './views/permisos/buscador-permisos.component';
import { SharedModule } from '../../_infra/shared';
import { NomenclaturasModule } from '../nomenclaturas/nomenclaturas.module';
import { DialogPerfilUsuarioComponent } from './dialogs/dialog-perfil-usuario/dialog-perfil-usuario.component';
import { DialogEdicionRolComponent } from './dialogs/dialog-edicion-rol/dialog-edicion-rol.component';
import { RequisitosContrasenyaComponent } from './components/requisitos-contrasenya.component';
import { UsuariosPermisosComponent } from './views/usuarios-permisos/usuarios-permisos.component';

const COMPONENTS = [
  PerfilComponent,
  BuscadorUsuariosComponent,
  DialogCambioContrasenyaComponent,
  DialogEdicionUsuarioComponent,
  BuscadorPermisosComponent,
  DialogPerfilUsuarioComponent,
  DialogEdicionRolComponent,
  RequisitosContrasenyaComponent,
  UsuariosPermisosComponent
];

@NgModule({
  imports: [SharedModule, UserRoutingModule, NomenclaturasModule],
  declarations: [...COMPONENTS],
  exports: [
    BuscadorUsuariosComponent,
    BuscadorPermisosComponent,
    DialogPerfilUsuarioComponent,
    DialogEdicionUsuarioComponent,
    RequisitosContrasenyaComponent
  ],
  bootstrap: [DialogEdicionUsuarioComponent, DialogCambioContrasenyaComponent],
  providers: []
})
export class UserModule {}
