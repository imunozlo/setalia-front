import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-tags-relacionadas',
  templateUrl: './tags-relacionadas.component.html'
})
export class TagsRelacionadasComponent implements OnInit {
  @Input() etiquetas: any[]
  @Input() campoMostrar: string = "descripcion"
  @Input() tipo: string;
  @Input() mostrarTodas: boolean = true;
  @Input() maximoEtiquetasMostrar: number = 2

  classTag: string = '';

  constructor() { }

  ngOnInit(): void {
    if (this.tipo === 'control') {
      this.classTag = 'tag-control';
    } else if (this.tipo === 'producto') {
      this.classTag = 'tag-producto';
    } else if (this.tipo === 'plantilla') {
      this.classTag = 'tag-plantilla';
    }
  }

  comprobarEtiqueta(etiqueta:any): string {
    if(this.campoMostrar in etiqueta){
      return etiqueta[this.campoMostrar]
    }
    else{
      return "No se ha encontrado el campo"
    }
  }
}
