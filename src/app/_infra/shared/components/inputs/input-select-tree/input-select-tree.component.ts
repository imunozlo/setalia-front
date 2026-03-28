import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FuncionesInputs } from '../funciones';
import { ValidacionesInterface } from '../validaciones.interface';
import { forEach } from 'lodash';
import { InputSelectTreeModel } from './input-select-tree.model';

@Component({
  selector: 'lib-input-select-tree',
  templateUrl: './input-select-tree.component.html'
})
export class InputSelectTreeComponent implements OnInit {
  @Input() elementos: any[] = [];
  @Input() valor: any;
  @Input() control: FormControl;
  @Input() idItem: number;
  @Output() readonly valorChange = new EventEmitter<any>();
  @Input() validaciones: ValidacionesInterface;
  @Input() disabled: boolean;
  @Input() campoMostrar: string = 'descripcion';

  @Output() readonly cambioValor = new EventEmitter();

  value: string = ''; // Solo un valor seleccionado
  indicePadre: number;
  nodes: InputSelectTreeModel[] = [];
  funcions = new FuncionesInputs();
  errorLabel = 'El campo es obligatorio';
  elementoSeleccionado: any;
  elementoDeseleccionado: any;

  ngOnInit(): void {
    this.procesarElementos();

    if (this.control) {
      this.control.setValue(this.valor);
    } else {
      this.control = this.funcions.crearNuevoControl(this.validaciones, this.valor);
    }

    if (this.valor) {
      this.value = this.valor.toString();
    }
  }

  procesarElementos() {
    const nodos: InputSelectTreeModel[] = this.elementos.map((elemento) => ({
      title: elemento.descripcion + '',
      fullTitle: elemento.descripcionCompleta,
      key: elemento.id + '',
      children: [],
      etiquetaId: elemento.etiquetaId,
      disabled: false,  // Inicialmente, todos los nodos pueden tener hijos
      parents: [] // Inicializamos la propiedad 'parents' como un array vacío
    }));

    // Primero, creamos el árbol y asignamos la relación padre-hijo
    nodos.map((nodo) => {
      if (nodo.etiquetaId !== null) {
        const padre = nodos.find((n) => n.key === nodo.etiquetaId + '');
        if (padre) {
          padre.children.push(nodo);
          nodo.parents = [padre.key, ...padre.parents];
        }
      }
      return nodo;
    });

    // Ahora, recorremos los nodos y deshabilitamos los nodos que tienen más de un padre
    nodos.map((nodo) => {
      if (nodo.parents.length > 1 || nodo.key === this.idItem.toString()) {
        nodo.disabled = true;
      }
      return nodo;
    });

    // Asignamos los nodos finales (raíces)
    this.nodes = nodos.filter(nodo => nodo.etiquetaId === null);
    console.log(this.nodes);
  }

  onChange($event: any): void {
    console.log($event);
  
    if ($event?.length === 1 || $event?.length > 1) {
      const selectedId = $event[$event.length - 1];
      this.actualizarSeleccion(selectedId);
      this.deshabilitarNodo(selectedId);
  
      if ($event.length > 1) {
        const unSelectedId = $event[0];
        this.habilitarNodo(unSelectedId);
      }
    } else {
      this.limpiarSeleccion();
    }
  }
  
  private actualizarSeleccion(id: any): void {
    this.elementoSeleccionado = this.elementos.find(nodo => nodo.id == id) || null;
    this.valorChange.emit(id);
    this.value = id?.toString() || '';
  }
  
  private limpiarSeleccion(): void {
    this.elementoSeleccionado = null;
    this.valorChange.emit(null);
    this.value = '';
  }

  private deshabilitarNodo(selectedId: any){
    this.nodes.map(nodoPadre => {
      if (nodoPadre.children?.length && nodoPadre.key !== selectedId) {
        nodoPadre.children.forEach(hijo => {
          if (hijo.key === selectedId) {
            hijo.disabled = true;
          }
        });
      } else {
        nodoPadre.disabled = true;
      }
      return nodoPadre;
    });
    
  }

  private habilitarNodo(unSelectedId: any){
    this.nodes.map(nodoPadre => {
      if (nodoPadre.children?.length && nodoPadre.key !== unSelectedId) {
        nodoPadre.children.forEach(hijo => {
          if (hijo.key === unSelectedId) {
            hijo.disabled = false;
          }
        });
      } else {
        nodoPadre.disabled = false;
      }
      return nodoPadre;
    });
  }

  verNombreCompleto() {
    if (this.value) {
      const selectedElement = this.elementos.find(ele => ele.id.toString() === this.value);
      if (selectedElement) {
        return selectedElement.etiquetaId ? selectedElement.descripcionCompleta : selectedElement.descripcion;
      }
    }
    return ''; // Si no hay valor, retorna un string vacío
  }
}