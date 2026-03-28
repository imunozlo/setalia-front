import { Component, Input, OnInit } from '@angular/core';
import { GraficoModel } from './models/grafico.model';
import { LeyendaModel } from './models/leyenda.model';

@Component({
  selector: 'lib-grafico',
  templateUrl: 'grafico.component.html',
  styleUrl: 'grafico.component.css'
})
export class GraficoComponent implements OnInit {
  @Input() grafico: Array<GraficoModel>;
  @Input() mostrarLeyenda: boolean = false;
  @Input() mostarLabel: boolean = true;
  @Input() tipoGrafico = 'barras';
  @Input() titulo: string;
  @Input() tamanyo?: any[] | undefined = [700, 400];
  @Input() opciones: any = {
    verXAxis: true,
    verYAxis: true
  };
  leyenda: Array<LeyendaModel>;
  colors = COLORES;

  constructor() {}

  ngOnInit() {
    this.generarLeyenda();
  }

  generarLeyenda() {
    this.leyenda = new Array<LeyendaModel>();
    let i = 0;
    this.grafico.map(grafico => {
      if (!grafico.series || grafico.series.length == 0) {
        const dato = new LeyendaModel().iniciar(grafico.name, this.colors.domain[i]);
        this.leyenda.push(dato);
      } else {
        this.leyenda = new Array<LeyendaModel>();
        i = 0;
        grafico.series.map(serie => {
          const dato = new LeyendaModel().iniciar(serie.name, this.colors.domain[i]);
          this.leyenda.push(dato);
          i = i + 1;
        });
      }
      i = i + 1;
    });
  }
}

export const COLORES = {
  domain: [
    'rgba(121, 219, 220, 0.8)', // azul
    'rgba(154, 85, 137, 0.8)',  // magenta
    'rgba(220, 200, 121, 0.8)', // amarillo
    'rgba(51, 51, 51, 0.8)',    // gris oscuro
    'rgba(245, 245, 245, 0.8)', // gris claro

    'rgba(111, 209, 210, 0.8)', // azul variante 1
    'rgba(164, 95, 147, 0.8)',  // magenta variante 1
    'rgba(230, 210, 131, 0.8)', // amarillo variante 1
    'rgba(61, 61, 61, 0.8)',    // gris oscuro variante 1
    'rgba(235, 235, 235, 0.8)', // gris claro variante 1

    'rgba(131, 229, 228, 0.8)', // azul variante 2
    'rgba(144, 75, 127, 0.8)',  // magenta variante 2
    'rgba(210, 190, 111, 0.8)', // amarillo variante 2
    'rgba(41, 41, 41, 0.8)',    // gris oscuro variante 2
    'rgba(225, 225, 225, 0.8)', // gris claro variante 2

    'rgba(101, 199, 200, 0.8)', // azul variante 3
    'rgba(158, 92, 150, 0.8)',  // magenta variante 3
    'rgba(225, 205, 135, 0.8)', // amarillo variante 3
    'rgba(56, 56, 56, 0.8)',    // gris oscuro variante 3
    'rgba(240, 240, 240, 0.8)', // gris claro variante 3
  ]
};
