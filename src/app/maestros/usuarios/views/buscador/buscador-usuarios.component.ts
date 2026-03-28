import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ConsultasStoreService } from '../../../consultas/service/consultas.store.service';
import { DialogEdicionUsuarioComponent } from '../../dialogs/dialog-edicio-usuario/dialog-edicion-usuario.component';
import { UserFiltroModel } from '../../models/user-filtro.model';
import { UserModel } from '../../models/user.model';
import { UsersStoreService } from '../../services/users.store.service';
import { UserConfig } from 'src/app/_infra/shared/components/tablas/tabla/configuracions/maestros/user.config';

@Component({
  selector: 'app-cercador-usuarios',
  templateUrl: './buscador-usuarios.component.html'
})
export class BuscadorUsuariosComponent implements OnInit, OnDestroy {
  loading: boolean;
  usuarios: UserModel[];
  usuariosFiltrados: UserModel[];
  listasValores: any;
  columnas = Object.assign([], UserConfig);
  filtros: UserFiltroModel;
  @ViewChild('drawerUsuario') drawerUsuarioComponent: DialogEdicionUsuarioComponent;
  subbscripcions: Subject<void> = new Subject();

  constructor(
    private storeService: UsersStoreService,
    private consultasStoreService: ConsultasStoreService
  ) {}

  ngOnInit() {
    this.filtros = this.storeService.obtenerFiltros(this.columnas);
    this.cargarDatos();
  }

  cargarDatos() {
    this.loading = true;
    this.filtros.mostrarAvatar = true;
    this.storeService
      .usuariosFiltrados$(this.filtros)
      .pipe(takeUntil(this.subbscripcions))
      .subscribe({
        complete: () => {
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
        next: response => {
          if (response) {
            this.usuarios = response.map((not: UserModel) => new UserModel().deserialize(not));
            this.usuariosFiltrados = this.usuarios;
            this.cargarDatosRelacionados();
            this.loading = false;
          }
        }
      });
  }

  cargarDatosRelacionados() {
    this.listasValores = {
      roles: this.consultasStoreService.obtenerListaValores('ROLES'),
      activos: this.consultasStoreService.obtenerListaValores('ACTIVOS')
    };
  }

  filtrar() {
    this.usuarios = new Array<UserModel>();
    this.filtros = new UserFiltroModel().iniciarFiltro(this.columnas);
    this.filtros.mostrarAvatar = true;
    this.loading = true;
    this.storeService.setUsuariosFiltrados(this.filtros);
  }

  nuevoElemento() {
    this.drawerUsuarioComponent.abrir(new UserModel().initialize(), 'app.nuevoUsuario');
  }

  editarElemento(nomenclatura: UserModel) {
    this.drawerUsuarioComponent.abrir(nomenclatura, 'app.editarUsuario');
  }

  ngOnDestroy() {
    this.subbscripcions.next();
  }
}
