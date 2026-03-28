import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EtiquetaCampoInterface } from './models/etiqueta-campo.interface';
import { ConsultasStoreService } from 'src/app/maestros/consultas/service/consultas.store.service';
import { ACLService } from '@delon/acl';

@Component({
  selector: 'lib-etiquetas',
  templateUrl: './etiquetas.component.html'
})
export class EtiquetasComponent {
  @Input() etiquetas: EtiquetaCampoInterface[];
  @Input() modelo: any;
  @Input() permisos: any;
  @Output() refrescar = new EventEmitter();

  constructor(
    private consultasStoreService: ConsultasStoreService,
    private acl: ACLService
  ) {}


  esText(campo: EtiquetaCampoInterface) {
    if (campo.tipo === 'text') {
      return true;
    } else {
      return false;
    }
  }

  esNumero(campo: EtiquetaCampoInterface) {
    if (campo.tipo === 'number') {
      return true;
    } else {
      return false;
    }
  }

  esMoneda(campo: EtiquetaCampoInterface) {
    if (campo.tipo === 'moneda') {
      return true;
    } else {
      return false;
    }
  }

  esFecha(campo: EtiquetaCampoInterface) {
    if (campo.tipo === 'date') {
      return true;
    } else {
      return false;
    }
  }

  esHora(campo: EtiquetaCampoInterface) {
    if (campo.tipo === 'hour') {
      return true;
    } else {
      return false;
    }
  }

  esTextArea(campo: EtiquetaCampoInterface) {
    if (campo.tipo === 'textarea') {
      return true;
    } else {
      return false;
    }
  }

  obtenerTamanyoTextArea(campo: EtiquetaCampoInterface) {
    if (campo.rows) {
      return this.transformarSegunResolucion(campo.rows);
    } else {
      return { minRows: 4, maxRows: 4 };
    }
  }

  transformarSegunResolucion(rows: any) {
    const altura = screen.height;
    if (altura > 1024) {
      return { minRows: rows['rowsXlg'], maxRows: rows['rowsXlg'] };
    } else if (altura <= 1024 && altura > 864) {
      return { minRows: rows['rowsMd'], maxRows: rows['rowsMd'] };
    } else {
      return { minRows: rows['rowsXs'], maxRows: rows['rowsXs'] };
    }
  }

  validarCambioEstado() {
    if (this.modelo) {
      let indice = 0;
      this.etiquetas.map((e, i) => {
        if (e.tipo === 'estado') {
          indice = i;
        }
      });

      if (!this.modelo.estadoCierre && !this.modelo.estadoEsCerrado && this.acl.can(this.permisos)) {
        //@ts-ignore
        this.etiquetas[indice].permitirCambioEstado = true;
      } else if ((this.modelo.estadoCierre || this.modelo.estadoEsCerrado) && this.acl.can(['ROLE_Responsable'])) {
        //@ts-ignore
        this.etiquetas[indice].permitirCambioEstado = true;
      } else {
        //@ts-ignore
        this.etiquetas[indice].permitirCambioEstado = false;
      }
    }
  }
}
