import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types/size';

import { I18NService } from '../../../../../core';
import { Utils } from 'src/app/_infra/shared/utils/Utils';

@Component({
  selector: 'lib-tabla-filtro-multiselector',
  templateUrl: './tabla-filtro-multiselector.component.html'
})
export class TablaFiltroMultiselectorComponent implements OnInit {
  @Input() elementos: any[];
  elementosFiltrados: any[];
  @Input() valores: number[];
  @Input() campoDescripcion: string = 'descripcion';
  @Input() control: FormControl;
  @Input() ocultarNoActivos: boolean;
  @Input() size: NzSizeLDSType = 'default';
  @Input() errorLabel = '';
  @Output() readonly valoresChange = new EventEmitter<number[]>();
  @Output() readonly cambioValor = new EventEmitter();
  @Input() disabled: boolean;
  @Input() placeholder = '';
  seleccion: string;
  filtro: string;

  constructor(private i18n: I18NService) {
    this.valoresChange = new EventEmitter<number[]>();
  }

  ngOnInit(): void {
    if (this.control) {
      this.control.setValue(this.valores);
    }
    this.cargarValoresIniciales();
  }

  cargarValoresIniciales() {
    this.elementosFiltrados = this.elementos;
    this.seleccion = this.i18n.fanyi('app.noHaySeleccion');
    if (this.valores) {
      this.seleccion = '';
      this.valores.map(valor => {
        const elemento = this.elementosFiltrados.find(ele => ele.id == valor);
        if (elemento) {
          elemento.checked = true;
          this.seleccion = `${this.seleccion + elemento.descripcion}, `;
        }
      });
      if (this.seleccion.length > 0) {
        this.seleccion = this.seleccion.substring(0, this.seleccion.length - 2);
      }
    }
  }

  seleccionarValores() {
    this.seleccion = this.i18n.fanyi('app.noHaySeleccion');
    this.valores = new Array<number>();
    this.elementosFiltrados.map(ele => {
      if (ele.checked) {
        this.valores.push(ele.id);
        this.seleccion = `${this.seleccion + ele.descripcion}, `;
      }
    });
    if (this.seleccion.length > 0) {
      this.seleccion = this.seleccion.substring(0, this.seleccion.length - 2);
    }
    this.valoresChange.emit(this.valores);
    this.cambioValor.emit();
  }

  filtrar() {
    this.elementosFiltrados = [];
    this.elementos.filter(ele => {
      if (Utils.normalizarCadena(this.i18n.traducir(ele[this.campoDescripcion])).includes(Utils.normalizarCadena(this.filtro))) {
        this.elementosFiltrados.push(ele);
      }
    });
  }

  comprobarActius(elemento: any) {
    if (this.ocultarNoActivos && elemento.activo) {
      return true;
    } else if (this.ocultarNoActivos && !elemento.activo) {
      return false;
    } else if (!this.ocultarNoActivos) {
      return true;
    }
  }
}
