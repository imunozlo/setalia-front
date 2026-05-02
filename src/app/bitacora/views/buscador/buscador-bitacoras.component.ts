import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ConsultasStoreService } from 'src/app/maestros/consultas/service/consultas.store.service';
import { BuscadorBaseAbstract } from 'src/app/_infra/shared/abstract/buscador-base.abstract';
import { I18NService } from 'src/app/_infra/core';
import { ExcelService } from 'src/app/_infra/shared/services/excelService';

import { BitacoraFiltroModel } from '../../models/bitacora-filtro.model';
import { BitacorasStoreService } from '../../services/bitacoras.store.service';
import { BitacoraModel } from '../../models/bitacora.model';
import { BitacoraService } from '../../services/bitacoras.service';
import {
  BitacorasConfig
} from '../../../_infra/shared/components/tablas/tabla/configuracions/maestros/bitacoras.config';
import { RoutingService } from '../../../_infra/shared/services/routings.service';
import { UbicacionesResponse } from '../../../_infra/shared/models/ubicacion.model';
import { UbicacionService } from '../../../_infra/shared/services/ubicacion.service';
import {NzModalService} from "ng-zorro-antd/modal";
import {
  DialogConfirmacionComponent
} from "../../../_infra/shared/components/dialogs/confirmacion/dialog-confirmacion.component";
import { UserModel } from '../../../maestros/usuarios/models/user.model';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Component({
  selector: 'app-buscador-bitacoras',
  templateUrl: './buscador-bitacoras.component.html'
})
export class BuscadorBitacorasComponent
  extends BuscadorBaseAbstract<BitacoraModel, BitacoraFiltroModel, BitacorasStoreService>
  implements OnInit, OnDestroy
{
  //propiedades de la clase abstracta
  override columnas = Object.assign([], BitacorasConfig);
  override filtros: BitacoraFiltroModel;
  override elementos: BitacoraModel[];
  override loading: boolean;
  override subbscripcions: Subject<void> = new Subject();
  //Otras propiedades
  listasValores: any;
  maximizado: boolean = false;
  ubicaciones: UbicacionesResponse | null = null;
  /*  @ViewChild('drawerSeta') drawerSetaComponent: DialogEdicionSetaComponent;*/

  constructor(
    override i18n: I18NService,
    override excelService: ExcelService,
    public service: BitacoraService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    override storeService: BitacorasStoreService,
    private consultasStoreService: ConsultasStoreService,
    private ubicacionService: UbicacionService,
    private router: RoutingService,
    private modal: NzModalService
  ) {
    super(storeService, i18n, excelService);
  }

  ngOnInit() {
    this.filtros = this.storeService.obtenerFiltros(this.columnas);
    const usuario = new UserModel().deserialize(this.tokenService.get());
    this.filtros.usuarioId = usuario.id;
    this.ubicacionService.getUbicaciones().subscribe(data => {
      this.ubicaciones = data;
      this.cargarDatos();
    });
  }

  nuevoElemento() {
    this.router.navegar('bitacora/detalle', 'new');
  }

  editarElemento(id: number) {
    this.router.navegar('bitacora/detalle', id);
  }

  ngOnDestroy() {
    this.subbscripcions.next();
  }

  override deserializarElementos(response: any) {
    this.elementos = response.resultados.map((e: BitacoraModel) => {
      const item = new BitacoraModel().deserialize(e);

      if (this.ubicaciones) {
        const provincia = this.ubicaciones.provincias.find(p => p.id === item.provincia);
        const municipio = this.ubicaciones.municipios.find(m => m.id === item.municipio && m.provinciaId === item.provincia);

        item.provinciaDescripcion = provincia?.descripcion ?? '';
        item.municipioDescripcion = municipio?.descripcion ?? '';
      }

      return item;
    });
  }

  override filtrar() {
    this.loading = true;
    this.elementos = new Array<BitacoraModel>();
    this.filtros.iniciarFiltro(this.columnas);
    this.storeService.setFiltrados(this.filtros);
  }

  override cargarDatosRelacionados() {
    this.listasValores = {
      setas: this.consultasStoreService.obtenerListaValores('SETAS')
    };
    this.cargarUbicaciones();
  }

  private cargarUbicaciones() {
    this.ubicacionService.getUbicaciones().subscribe({
      next: data => {
        this.listasValores['municipios'] = data.municipios;
      },
      error: err => {
        console.error('Error cargando JSON:', err);
      }
    });
    this.ubicacionService.getUbicaciones().subscribe({
      next: data => {
        this.listasValores["provincias"] = data.provincias;
      },
      error: err => {
        console.error('Error cargando JSON:', err);
      }
    });
  }

  eliminar(id: number) {
    const modal = this.modal.create({
      nzTitle: this.i18n.traducir('bitacora.eliminar.titulo'),
      nzContent: DialogConfirmacionComponent,
      nzData: { aceptar: 'app.siEliminar', cancelar: 'app.noCerrar', pregunta: 'bitacora.eliminar.pregunta' },
      nzClosable: false,
      nzFooter: null
    });

    modal.afterClose.subscribe((response: any) => {
      if (response) {
        this.service
          .eliminar(id)
          .pipe(takeUntil(this.subbscripcions))
          .subscribe(() => {
            this.filtrar();
          });
      }
    });
  }
}
