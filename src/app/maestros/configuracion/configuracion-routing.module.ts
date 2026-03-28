import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorNomenclaturasComponent } from '../nomenclaturas/views/buscador/buscador-nomenclaturas.component';
import { BuscadorUsuariosComponent } from '../usuarios/views/buscador/buscador-usuarios.component';
import { BuscadorPermisosComponent } from '../usuarios/views/permisos/buscador-permisos.component';
import { securityGuard } from 'src/app/_infra/core';
const routes: Routes = [
  {
    path: 'usuarios',
    component: BuscadorUsuariosComponent,
    canActivate: [securityGuard],
    data: {
      title: 'Usuarios',
      breadcrumb: [{ descripcion: 'Configuracion' }, { descripcion: 'Usuarios' }],
      guard: { role: ['MODULO_CONFIGURACION_USUARIOS_CONSULTA'] }
    }
  },
  {
    path: 'permisos',
    component: BuscadorPermisosComponent,
    canActivate: [securityGuard],
    data: {
      title: 'Permisos',
      breadcrumb: [{ descripcion: 'Configuracion' }, { descripcion: 'Permisos' }],
      guard: { role: ['MODULO_CONFIGURACION_PERMISOS_CONSULTA'] }
    }
  },
  {
    path: 'listas-valores',
    component: BuscadorNomenclaturasComponent,
    canActivate: [securityGuard],
    data: {
      title: 'Listas de valores',
      breadcrumb: [{ descripcion: 'Configuracion' }, { descripcion: 'Listas de valores' }],
      guard: { role: ['MODULO_CONFIGURACION_LISTAS_CONSULTA'] }
    }
  }
  /*{
    path: 'empleados',
    component: ConfiguracionComponent,
    data: { title: 'Empleados' }
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule {}
