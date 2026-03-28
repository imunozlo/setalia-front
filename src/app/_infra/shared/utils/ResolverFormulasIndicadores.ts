import { UtilsFormulas } from './UtilsFormulas';

export class ResolverFormulasIndicadores {

  static obtenerResultadoFormulaIndicador(formula: string, indicadores: Array<any>, numeroDecimales: number, referenciaMedida: string) {
    const numeroIndicadores = UtilsFormulas.obtenerNumeroIndicadoresEnFormula(formula);
    for (let i = 0; i < numeroIndicadores; i++) {
      formula = this.reemplazarIndicadores(formula, indicadores, referenciaMedida);
    }
    return UtilsFormulas.evaluarFormula(formula, numeroDecimales);
  }

  static reemplazarMedidas(formula: string, medidas: Array<any>) {
    const corcheteInicial = formula.indexOf('[');
    const corcheteFinal = formula.indexOf(']');
    if (corcheteInicial > -1 && corcheteFinal > -1) {
      const diferenciaIndices = corcheteFinal - corcheteInicial;
      const medidaABuscarReemplazo = formula.substr(corcheteInicial + 1, diferenciaIndices - 1);
      const medidaConcreta = formula.substr(corcheteInicial, diferenciaIndices + 1);
      const filtradas = medidas.filter((medida: any) => {
        if (medida.referencia === medidaABuscarReemplazo) {
          formula = formula.replace(medidaConcreta, medida.valor);
          return medida;
        }
      });
      if (filtradas && filtradas.length === 0) {
        return '';
      }
    }
    return formula;
  }

  static reemplazarIndicadores(formula: string, indicadores: Array<any>, referenciaMedida: string) {
    const corcheteInicial = formula.indexOf('[');
    const corcheteFinal = formula.indexOf(']');
    if (corcheteInicial > -1 && corcheteFinal > -1) {
      const diferenciaIndices = corcheteFinal - corcheteInicial;
      // INDICADOR DE LA FORMULA QUE VAMOS A BUSCAR SU VALOR
      let indicadorABuscarReemplazo = formula.substr(corcheteInicial + 1, diferenciaIndices - 1);
      // VEMOS SI EL INDICADOR ES DE UNA MEDIA EN CONCRETO EJEM [151:M]
      const medidaConcretaIndicador = UtilsFormulas.obtenerIndicadorSiEsMedidaConcreta(indicadorABuscarReemplazo);
      // OBTENEMOS EL CODIGO DEL INDICADOR
      indicadorABuscarReemplazo = UtilsFormulas.verSiIndicadorTieneMedida(indicadorABuscarReemplazo);
      const indicadoConcreto = formula.substr(corcheteInicial, diferenciaIndices + 1);
      // REEMPLAZAMOS EL VALOR DEL INDICADOR
      if (medidaConcretaIndicador) {
        indicadores.find((indicador: any) => {
          if (indicador.indicadorId.toString() === indicadorABuscarReemplazo && this.buscarReferenciaMedia(indicador, medidaConcretaIndicador)) {
            formula = formula.replace(indicadoConcreto, this.buscarValorMedida(indicador, medidaConcretaIndicador));
          }
        });
      } else {
        indicadores.find((indicador: any) => {
          if (indicador.indicadorId.toString() === indicadorABuscarReemplazo && this.buscarReferenciaMedia(indicador, referenciaMedida)) {
            formula = formula.replace(indicadoConcreto, this.buscarValorMedida(indicador, referenciaMedida));
          }
        });
      }
    }
    return formula;
  }

  static buscarValorMedida(indicador: any, referenciaMedida: string) {
    let valor = '0';
    indicador.medidas.map((medida: any) => {
      if (medida.referencia === referenciaMedida) {
        valor = medida.valor;
      }
    });
    return valor;
  }

  static buscarReferenciaMedia(indicador: any, referenciaMedida: string) {
    let opcion = false;
    indicador.medidas.map((medida: any) => {
      if (medida.referencia === referenciaMedida) {
        opcion = true;
      }
    });
    return opcion;
  }

  static evaluarFormulaConMedidasEnDistintosIndicadores(formulaConTipo: string, medidas: Array<any>, numeroDecimales: number) {
    let formula = formulaConTipo.split(';')[1];
    while (UtilsFormulas.quedanMedidasPorReemplazar(formula)) {
      formula = this.reemplazarMedidas(formula, medidas);
    }
    return UtilsFormulas.evaluarFormula(formula, numeroDecimales);
  }

  static obtenerFormulasQueVamosCalcular(indicadores: Array<any>) {
    const formulas = new Array<any>();
    indicadores.map((indicador: any) => {
      if (indicador.formula) {
        formulas.push(indicador);
      }
    });
    return formulas;
  }

}
