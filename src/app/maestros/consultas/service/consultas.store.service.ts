import { Injectable } from '@angular/core';
import { Observable, map, zip } from 'rxjs';
import { LISTA_ACTIVOS, LISTA_CONDICIONAL, FORMATOS_UNIDAD } from '../../../_infra/shared/constants/otras-listas';
import { NomenclaturaModel } from '../../nomenclaturas/models/nomenclatura.model';
import { TIPOS_NOMENCLATURA } from 'src/app/_infra/shared/constants/tipos-nomenclaturas';
import { ConsultaModel } from '../models/consulta.model';
import { ConsultasService } from './consultas.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultasStoreService {
  datos: any;

  constructor(public consultasService: ConsultasService) {}

  cargarDatos(): Observable<any> {
    this.datos = {};
    return zip(this.consultasService.obtenerDatos()).pipe(
      map(([datos]: [ConsultaModel]) => {
        const consulta = new ConsultaModel().deserialize(datos);
        this.datos['NOMENCLATURAS_TIPOS'] = consulta.nomneclaturasTipos;
        this.datos['ROLES'] = consulta.roles;
        this.datos['SETAS'] = consulta.setas;
        this.anyadirListasNomenclaturas(consulta.nomenclaturas);
        this.anyadirOtrasListas();
      })
    );
  }

  obtenerListaValores(clave: string) {
    return this.datos[clave];
  }

  anyadirOtrasListas() {
    this.datos['ACTIVOS'] = LISTA_ACTIVOS;
    this.datos['CONDICIONAL'] = LISTA_CONDICIONAL;
    this.datos['FORMATOS_UNIDAD'] = FORMATOS_UNIDAD;
  }

  anyadirListasNomenclaturas(nomenclaturas: NomenclaturaModel[]) {
    if (nomenclaturas && nomenclaturas.length > 0) {
      this.datos['TIPO_DATO'] = nomenclaturas.filter(nom => nom.nomenclaturaTipoId === TIPOS_NOMENCLATURA['TIPO_DATO']);
      this.datos['TIPO_FASES'] = nomenclaturas.filter(nom => nom.nomenclaturaTipoId === TIPOS_NOMENCLATURA['TIPO_FASES']);
      this.datos['TIPO_GRAFICOS'] = nomenclaturas.filter(nom => nom.nomenclaturaTipoId === TIPOS_NOMENCLATURA['TIPO_GRAFICOS']);
      this.datos['TIPO_PERIOCIDAD_GRAFICOS'] = nomenclaturas.filter(nom => nom.nomenclaturaTipoId === TIPOS_NOMENCLATURA['TIPO_PERIOCIDAD_GRAFICOS']);
    }
  }
}
