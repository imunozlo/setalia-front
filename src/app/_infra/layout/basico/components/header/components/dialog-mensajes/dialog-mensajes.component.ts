import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { I18NService } from 'src/app/_infra/core';
import { BuscadorBaseAbstract } from 'src/app/_infra/shared/abstract/buscador-base.abstract';
import { MensajeModel } from 'src/app/mensajes/mensaje.model';
import { MensajeFiltroModel } from 'src/app/mensajes/mensaje-filtro.model';
import { ExcelService } from 'src/app/_infra/shared/services/excelService';
import { ConsultasStoreService } from 'src/app/maestros/consultas/service/consultas.store.service';
import { MensajesService } from 'src/app/mensajes/mensajes.service';
import { MensajesStoreService } from 'src/app/mensajes/mensajes.store.service';
import { MensajesConfig } from 'src/app/_infra/shared/components/tablas/tabla/configuracions/maestros/mensajes.config';

@Component({
  selector: 'app-drawer-mensajes',
  templateUrl: 'dialog-mensajes.component.html'
})
export class DialogMensajesComponent
  extends BuscadorBaseAbstract<MensajeModel, MensajeFiltroModel, MensajesStoreService>
  implements OnInit, OnDestroy
{
  //propiedades de la clase abstracta
  override columnas = Object.assign([], MensajesConfig);
  override filtros: MensajeFiltroModel;
  override elementos: MensajeModel[] = [];
  override loading: boolean;
  override subbscripcions: Subject<void> = new Subject();
  //Otras propiedades
  listasValores: any;
  abierto: boolean = false;
  @Output() refrescar = new EventEmitter();

  constructor(
    public service: MensajesService,
    override storeService: MensajesStoreService,
    private consultasStoreService: ConsultasStoreService,
    override i18n: I18NService,
    override excelService: ExcelService
  ) {
    super(storeService, i18n, excelService);
  }

  ngOnInit(): void {
    this.filtros = new MensajeFiltroModel().iniciarFiltro(this.columnas);
    this.filtros.total = 0;
    this.cargarDatos();
  }

  override deserializarElementos(response: any) {
    this.elementos = response.resultados.map((e: MensajeModel) => new MensajeModel().deserialize(e));
  }

  override cargarDatosRelacionados() {
    this.listasValores = {
      finalizados: this.consultasStoreService.obtenerListaValores('ACTIVOS')
    };
  }

  guardar(dato: MensajeModel) {
    this.service.guardar(dato).subscribe();
  }

  abrir(): void {
    this.abierto = true;
  }

  cerrar() {
    this.refrescar.emit();
    this.abierto = false;
  }

  ngOnDestroy() {
    this.subbscripcions.next();
  }
}
