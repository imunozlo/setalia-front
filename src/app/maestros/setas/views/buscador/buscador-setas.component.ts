import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { SetaFiltroModel } from '../../models/seta-filtro.model';
import { SetaModel } from '../../models/seta.model';

import { ConsultasStoreService } from 'src/app/maestros/consultas/service/consultas.store.service';
import { BuscadorBaseAbstract } from 'src/app/_infra/shared/abstract/buscador-base.abstract';
import { I18NService } from 'src/app/_infra/core';
import { ExcelService } from 'src/app/_infra/shared/services/excelService';
import { SetasConfig } from '../../../../_infra/shared/components/tablas/tabla/configuracions/maestros/setas.config';
import { SetasService } from '../../services/setas.service';
import { SetasStoreService } from '../../services/setas.store.service';
import { DialogEdicionSetaComponent } from '../../dialogs/dialog-edicion-seta.component';

@Component({
  selector: 'app-buscador-setas',
  templateUrl: './buscador-setas.component.html'
})
export class BuscadorSetasComponent
  extends BuscadorBaseAbstract<SetaModel, SetaFiltroModel, SetasStoreService>
  implements OnInit, OnDestroy
{
  //propiedades de la clase abstracta
  override columnas = Object.assign([], SetasConfig);
  override filtros: SetaFiltroModel;
  override elementos: SetaModel[];
  override loading: boolean;
  override subbscripcions: Subject<void> = new Subject();
  //Otras propiedades
  listasValores: any;
  maximizado: boolean = false;
  @ViewChild('drawerSeta') drawerSetaComponent: DialogEdicionSetaComponent;

  constructor(
    override i18n: I18NService,
    override excelService: ExcelService,
    public service: SetasService,
    override storeService: SetasStoreService,
    private consultasStoreService: ConsultasStoreService
  ) {
    super(storeService, i18n, excelService);
  }

  ngOnInit() {
    this.filtros = this.storeService.obtenerFiltros(this.columnas);
    this.cargarDatos();
  }

  nuevoElemento() {
    this.drawerSetaComponent.abrir(new SetaModel().initialize());
  }

  editarElemento(nomenclatura: SetaModel) {
    this.drawerSetaComponent.abrir(nomenclatura);
  }

  ngOnDestroy() {
    this.subbscripcions.next();
  }

  override deserializarElementos(response: any) {
    this.elementos = response.resultados.map((e: SetaModel) => new SetaModel().deserialize(e));

  }

  override filtrar() {
    this.loading = true;
    this.elementos = new Array<SetaModel>();
    this.filtros.iniciarFiltro(this.columnas);
    this.storeService.setFiltrados(this.filtros);
  }
}
