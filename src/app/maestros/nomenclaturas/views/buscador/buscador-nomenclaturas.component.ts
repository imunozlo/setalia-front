import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogEdicionNomenclaturaComponent } from '../../dialogs/dialog-edicion-nomenclatura.component';
import { NomenclaturaFiltroModel } from '../../models/nomenclatura-filtro.model';
import { NomenclaturaModel } from '../../models/nomenclatura.model';
import { NomenclaturasService } from '../../services/nomenclaturas.service';
import { NomenclaturesStoreService } from '../../services/nomenclaturas.store.service';
import { NomenclaturasConfig } from 'src/app/_infra/shared/components/tablas/tabla/configuracions/maestros/nomenclaturas.config';
import { ConsultasStoreService } from 'src/app/maestros/consultas/service/consultas.store.service';
import { BuscadorBaseAbstract } from 'src/app/_infra/shared/abstract/buscador-base.abstract';
import { I18NService } from 'src/app/_infra/core';
import { ExcelService } from 'src/app/_infra/shared/services/excelService';

@Component({
  selector: 'app-buscador-nomenclaturas',
  templateUrl: './buscador-nomenclaturas.component.html'
})
export class BuscadorNomenclaturasComponent
  extends BuscadorBaseAbstract<NomenclaturaModel, NomenclaturaFiltroModel, NomenclaturesStoreService>
  implements OnInit, OnDestroy
{
  //propiedades de la clase abstracta
  override columnas = Object.assign([], NomenclaturasConfig);
  override filtros: NomenclaturaFiltroModel;
  override elementos: NomenclaturaModel[];
  override loading: boolean;
  override subbscripcions: Subject<void> = new Subject();
  //Otras propiedades
  listasValores: any;
  @ViewChild('drawerNomenclatura') drawerNomenclaturaComponent: DialogEdicionNomenclaturaComponent;

  constructor(
    override i18n: I18NService,
    override excelService: ExcelService,
    public service: NomenclaturasService,
    override storeService: NomenclaturesStoreService,
    private consultasStoreService: ConsultasStoreService
  ) {
    super(storeService, i18n, excelService);
  }

  ngOnInit() {
    this.filtros = this.storeService.obtenerFiltros(this.columnas);
    this.cargarDatos();
  }

  override deserializarElementos(response: any) {
    this.elementos = response.map((e: NomenclaturaModel) => new NomenclaturaModel().deserialize(e));
    this.cargarDatosRelacionados();
  }

  override cargarDatosRelacionados() {
    this.listasValores = {
      tipo: this.consultasStoreService.obtenerListaValores('NOMENCLATURAS_TIPOS'),
      activos: this.consultasStoreService.obtenerListaValores('ACTIVOS')
    };
  }

  nuevoElemento() {
    this.drawerNomenclaturaComponent.abrir(new NomenclaturaModel().initialize());
  }

  editarElemento(nomenclatura: NomenclaturaModel) {
    this.drawerNomenclaturaComponent.abrir(nomenclatura);
  }

  ngOnDestroy() {
    this.subbscripcions.next();
  }
}
